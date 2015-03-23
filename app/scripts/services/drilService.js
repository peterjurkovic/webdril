'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter', '$log',
      function (DrilStorage, $filter, $log) {


    var storageKey = "activatedWords",
        countOfWords = 0;


    function getNextWord( list ){
      if(!list) {
        list = loadWords();
      }
      if(list.length){
        var nextWord =  _.min( list, function(o) {return o.lastView; });
        if(typeof nextWord === 'number'){
          return list[0];
        }
        $log.info('Next word is [id='+nextWord.id+']');
        return nextWord;
      }
      return null;
    };

    function getCountOfWords(){
      return countOfWords;
    }


    function rateWord(list, word, rating){
      var index = _.findIndex(list, {'id' :word.id});
      if(index !== -1){
        list[index].learned = list[index].lastRating === 1 && rating === 1;
        list[index].viewed++;
        list[index].lastViewed = _.now();
        list[index].lastRating = rating;
        if(list[index].learned){
          removeLearnedWords( list );
        }
        $log.info('Updating word: ');
        $log.info(list[index]);
        saveList( list );
      }else{
        $log.error('Can not update rating. Word ['+word.id+'] was not found');
      }
    };


    function removeLearnedWords(list ){
      _.remove(list, function(word) { return word.learned; });
    }


    function rateAndGetNextWord(word, rating){
      var list = loadWords();
      rateWord(list, word, rating);
      return getNextWord( list );
    };

    function clearWords(){
      DrilStorage.removeItem(storageKey);
    }


    function saveList(list){
      DrilStorage.setItem(storageKey, list );
    }

    function loadWords(){
      $log.info('Loading activated words from storage.');
      var list = DrilStorage.getItem(storageKey);
      if(list === null){
        if(list === null){
          list = [
            { id : 1, question: 'question', answer : ' answer', viewed : 0, lastView : 1424210734010, lastRating : null, langQuestion: 'en', langAnswer: 'sk', learned : false },
            { id : 2, question: 'question 2', answer : ' answer 3', viewed : 0, lastView : 1424210734012, lastRating : null, langQuestion: 'en', langAnswer: 'sk', learned : false },
            { id : 12, question: 'question12', answer : ' answer12', viewed : 5, lastView : 1424210734960, lastRating : null, learned : false }
          ]
        }
      }
      countOfWords = list.length;
      $log.info('Loaded activated words: ' + countOfWords);
      return list;
    }

    function getStatistics(){
      return {};
    }

    return {
      saveList : saveList,
      clearWords: clearWords,
      getNextWord : getNextWord,
      rateAndGetNext : rateAndGetNextWord,
      getCountOfWords : getCountOfWords,
      getStatistics : getStatistics
    };
  }]);
