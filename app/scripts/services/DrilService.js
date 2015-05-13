'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter', '$log',  'AuthTokenFactory', 'RATING', 'DrilAPI', '$q',
      function (DrilStorage, $filter, $log, AuthTokenFactory, RATING, DrilAPI, $q) {


    var storageKey = 'activatedWords',
        countOfWords = 0,
        strategy = {

          selectLatest : function (list){
              var now = _.now(),
                  index = -1;
              for(var i = 0; i < list.length; i++){
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
          }

        };


    function getNextWord( list ){
      if(!list) {
        list = loadFromStorage();
      }
      if(list.length){
        var nextWord =  strategy.selectLatest( list );
        $log.info('Next word is [id='+nextWord.id+']');
        return nextWord;
      }
      return false;
    }

    function getCountOfWords(){
      return countOfWords;
    }


    function rateWord(list, word, userRating){
      var index = _.findIndex(list, {'id' :word.id});
      if(index !== -1){
        list[index].isLearned = isLearned(list[index]);
        list[index].viewed++;
        list[index].lastViewed = _.now();
        list[index].lastRating = userRating;
        if(AuthTokenFactory.getToken() !== null){
          DrilAPI.rateWord(list[index]);
        }
        if(list[index].isLearned){
          removeLearnedWords( list );
        }
        $log.info(list[index]);
        saveList( list );
      }else{
        $log.error('Can not update rating. Word ['+word.id+'] was not found');
      }

      function isLearned(word){
        return word.lastRating === RATING.KNOW && userRating === RATING.KNOW;
      }
    }


    function removeLearnedWords(list , index ){
        list.splice(index, 1);
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

    function getStatistics(){
      return {};
    }


    function addWord( word ){
      var list = loadFromStorage();
      list.push(word);
      saveList(list);
      return countOfWords;
    }

    function removeWord( wordId ){
      var list = loadFromStorage();
      _.remove(list, {'id' :wordId});
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
      loadFromServer : loadFromServer
    };
  }]);
