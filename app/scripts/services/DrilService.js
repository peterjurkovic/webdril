'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter', '$log',  'AuthTokenFactory', 'RATING', 'DrilAPI',
      function (DrilStorage, $filter, $log, AuthTokenFactory, RATING, DrilAPI) {


    var storageKey = "activatedWords",
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
             $log.warn("Something is wrong..");
            return null;
          }

        };


    function getNextWord( list ){
      if(!list) {
        list = loadWords();
      }
      if(list.length){
        var nextWord =  strategy.selectLatest( list );
        $log.info('Next word is [id='+nextWord.id+']');
        return nextWord;
      }
      return null;
    }

    function getCountOfWords(){
      return countOfWords;
    }


    function rateWord(list, word, userRating){
      console.log(userRating);
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
      var list = loadWords();
      rateWord(list, word, rating);
      return getNextWord( list );
    }

    function clearWords(){
      DrilStorage.removeItem(storageKey);
    }


    function saveList(list){
      $log.info('Saving list: ' + list.length);
      DrilStorage.setItem(storageKey, list );
    }

    function loadWords(){
      $log.info('Loading activated words from storage.');
      var list = DrilStorage.getItem(storageKey);
      if(list === null){
        list = [

        ];
      }
      countOfWords = list.length;
      $log.info('Loaded activated words: ' + countOfWords);
      return list;
    }

    function getStatistics(){
      return {};
    }


    function addWord( word ){
      var list = loadWords();
      list.push(word);
      saveList(list);
      return countOfWords;
    }

    function removeWord( wordId ){
      var list = loadWords();
      _.remove(list, {'id' :wordId});
      console.log(list);
      saveList(list);
      return countOfWords;
    }

    return {
      saveList : saveList,
      clearWords: clearWords,
      getNextWord : getNextWord,
      rateAndGetNext : rateAndGetNextWord,
      getCountOfWords : getCountOfWords,
      getStatistics : getStatistics,
      addWord : addWord,
      removeWord : removeWord
    };
  }]);
