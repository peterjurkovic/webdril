'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter', '$log',
      function (DrilStorage, $filter, $log) {


    var storageKey = "activatedWords",
        countOfActivatedWords = 0;


    function getNext() {
      console.log(arguments);
      if(arguments.length){
        var list = arguments[0];
      }else{
        list = getActivatedWords();
      }

      if(_.isEmpty(list)){
        return null;
      }
      return getNextWord( list );
    };

    function getNextWord( list ){
      var nextWord =  _.min( list, function(o) {return o.lastView; });
      if(typeof nextWord === 'number'){
        $log.info('Next word is the first form collection.');
        return list[0];
      }
      $log.info('Next word is [id='+nextWord.id+']');
      return nextWord;
    };

    function getCountOfActivated(){
      return countOfActivatedWords;
    }


    function updateRating(list, word, rating){
      for(var i = 0; i < list.length; i++){
        if(list[i].id === word.id){
          list[i].learned = list[i].lastRating === 1 && rating === 1;
          list[i].viewed++;
          list[i].lastViewed = _.now();
          list[i].lastRating = rating;
          if(list[i].learned){
            updateStats();
            removeLearnedWords( list );
          }
          $log.info('Updating word: ');
          $log.info(list[i]);
          persistChanges( list );
          return false;
        }
      }
      $log.error('Can not update rating. Word ['+word.id+'] was not found');
      return false;
    };

    function persistChanges( list ){
      DrilStorage.setItem(storageKey, list);
    };


    function removeLearnedWords(list ){
      _.remove(list, function(word) { return word.learned; });
    }

    function getStatistics(){
      var stats = DrilStorage.getItemFromSession("stats");
      if(stats === null){
        stats = {
          count : 0
        };
      }
      return stats;
    }

    function updateStats(){
      var stats = getStatistics();
      stats.count++;
      DrilStorage.setItemInSession("stats", stats);
    }

    function rateAndGetNext(word, rating){
      var list = getActivatedWords();
      updateRating(list, word, rating);
      persistChanges();
      return getNext( list );
    };

    function removeAllActivatedWords(){
      DrilStorage.removeItem(storageKey);
      persistChanges();
    }


    function setActivatedWords(list){
      DrilStorage.setItem(storageKey, list );
    }

    function getActivatedWords(){
      $log.info('Loading activated words from storage.');
      var list = DrilStorage.getItem(storageKey);
      if(list === null){
        list = [
          { id : 1, question: 'question', answer : ' answer', viewed : 0, lastView : 1424210734010, lastRating : null, langQuestion: 'en', langAnswer: 'sk', learned : false },
          { id : 12, question: 'question12', answer : ' answer12', viewed : 5, lastView : 1424210734960, lastRating : null, learned : false }
        ]
      }
      countOfActivatedWords = list.length;
      $log.info('Loaded activated words: ' + countOfActivatedWords);
      return list;
    }



    return {
      removeAllActivatedWords: removeAllActivatedWords,
      setActivatedWords: setActivatedWords,
      getCountOfActivated : getCountOfActivated,
      getStatistics : getStatistics,
      rateAndGetNext : rateAndGetNext,
      getNext : getNext,
      init : getActivatedWords
    };
  }]);
