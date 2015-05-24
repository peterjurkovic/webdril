'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter', '$log',  'AuthTokenFactory', 'RATING', 'DrilAPI', '$q', 'DrilStrategy',
      function (DrilStorage, $filter, $log, AuthTokenFactory, RATING, DrilAPI, $q, DrilStrategy) {


    var storageKey = 'activatedWords',
        statsKey = 'stats',
        countOfWords = 0;


    function getNextWord( list ){
      if(!list) {
        list = loadFromStorage();
      }
      if(list.length){
        var stats = getStatistics();
        if(stats.hits > 10){
          if(stats.hits % 7 === 0){
            return DrilStrategy.selectWorstRated(list);
          }
          if(stats.hits % 11 === 0){
            return DrilStrategy.selectMostProblematic(list);
          }

        }
        return DrilStrategy.selectLatest(list);
      }
      return false;
    }

    function getCountOfWords(){
      return countOfWords;
    }


    function rateWord(list, word, userRating){
      function isLearned(word){
        return word.lastRating === RATING.KNOW && userRating === RATING.KNOW;
      }

      var index = findIndex(list, word.id);
      if(index !== -1){
        list[index].isLearned = isLearned(list[index]);
        list[index].viewed++;
        list[index].lastViewed = new Date().getTime();
        list[index].lastRating = userRating;
        if(AuthTokenFactory.getToken() !== null){
          DrilAPI.rateWord(list[index]);
        }
        if(list[index].isLearned){
          incrementLearned();
          list.splice(index, 1);
        }
        saveList( list );
      }else{
        $log.error('Can not update rating. Word ['+word.id+'] was not found');
      }



    }

    function findIndex(list, id){
      for(var i = 0, l = list.length; i < l; i++){
        if(list[i].id === id){
          return i;
        }
      }
      return -1;
    }


    function rateAndGetNextWord(word, rating){
      var list = loadFromStorage();
      rateWord(list, word, rating);
      return getNextWord( list );
    }

    function clearWords(){
      DrilStorage.removeItem(storageKey);
    }


    function saveList(list){
      DrilStorage.setItem(storageKey, list );
    }

    function loadFromStorage(){
      var list = DrilStorage.getItem(storageKey);
      if(list === null){
        list = [];
      }
      countOfWords = list.length;
      return list;
    }

    function incrementLearned(){
      var stats = getStatistics();
      stats.learned++;
      stats.hits++;
      DrilStorage.setItem(statsKey, stats);
    }

    function getStatistics(){
      var stats = DrilStorage.getItem(statsKey);
      return stats || { learned : 0, hits : 0 };
    }


    function addWord( word ){
      var list = loadFromStorage();
      list.push(word);
      saveList(list);
      return countOfWords;
    }


    function removeWord( wordId ){
      function remove(list, id){
        var index = findIndex(id);
        if(index > -1){
          list.splice(index, 1);
        }else{
          $log.warn('Unexpected index for word: ' + id);
        }

      }

      var list = loadFromStorage();
      remove(list, wordId);
      saveList(list);
      return countOfWords;
    }

    function loadFromServer(){
      var deferred = $q.defer();
      DrilAPI.loadWords().then(function(res){
        saveList(res.data);
        deferred.resolve(res.data);
      }, function(){
        deferred.reject();
      });
      return deferred.promise;
    }

    return {
      saveList : saveList,
      clearWords: clearWords,
      getNextWord : getNextWord,
      rateAndGetNext : rateAndGetNextWord,
      getCountOfWords : getCountOfWords,
      getStatistics : getStatistics,
      addWord : addWord,
      removeWord : removeWord,
      loadFromServer : loadFromServer,
      loadFromStorage : loadFromStorage
    };
  }]);
