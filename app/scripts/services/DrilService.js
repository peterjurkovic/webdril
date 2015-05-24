'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter', '$log',  'AuthTokenFactory', 'RATING', 'DrilAPI', '$q',
      function (DrilStorage, $filter, $log, AuthTokenFactory, RATING, DrilAPI, $q) {


    var storageKey = 'activatedWords',
        statsKey = 'stats',
        countOfWords = 0,
        strategy = {

          selectLatest : function (list){
              var now = new Date().getTime(),
                  index = -1;
              for(var i = 0, max = list.length; i < max; i++){
                if(list[i].lastViewed === null){
                  return list[i];
                }
                if(now > list[i].lastViewed ){
                  now = list[i].lastViewed;
                  index = i;
                }
              }
              if(index !== -1){
                return list[index];
              }
             $log.warn('Something is wrong..');
            return null;
          },

          selectProblematic : function ( list ){
            if(list.length < 8){
              return selectLatest( list );
            }

          }

        };


    function getNextWord( list ){
      if(!list) {
        list = loadFromStorage();
      }
      if(list.length){
        var nextWord =  strategy.selectLatest( list );
        return nextWord;
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
