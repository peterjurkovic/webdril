'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter',
      function (drilStorage, $filter) {


    var activatedWords = [
      { id : 1, question: 'question', answer : ' answer', viewed : 0, lastView : 1424210734010, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 2, question: 'question2', answer : ' answer2', viewed : 1, lastView : 1424210734020, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 3, question: 'question3', answer : ' answer3', viewed : 0, lastView : 1424210734030, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 4, question: 'question4', answer : ' answer4', viewed : 5, lastView : 1424210734040, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 5, question: 'question5', answer : ' answer5', viewed : 0, lastView : 1424210734050, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 6, question: 'question6', answer : ' answer6', viewed : 1, lastView : 1424210734060, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 7, question: 'question7', answer : ' answer7', viewed : 0, lastView : 1424210734070, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 8, question: 'question8', answer : ' answer8', viewed : 5, lastView : 1424210734080, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 9, question: 'questio9', answer : ' answer9', viewed : 0, lastView : 1424210734930, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 10, question: 'question10', answer : ' answer10', viewed : 1, lastView : 1424210734940, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 11, question: 'question11', answer : ' answer11', viewed : 0, lastView : 1424210734950, lastRating : null, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 12, question: 'question12', answer : ' answer12', viewed : 5, lastView : 1424210734960, lastRating : null, learned : false }
    ];


    function getNext() {
      if(_.isEmpty(activatedWords)){
        return null;
      }
      return getNextWord();
    };

    function getNextWord(){
      return _.min( activatedWords, function(o) {return o.lastView; });
    };

    function getCountOfActivated(){
      return _.size(activatedWords);
    }


    function updateRating(word, rating){
      for(var i = 0; i < activatedWords.length; i++){
        if(activatedWords[i].id === word.id){
          activatedWords[i].learned = activatedWords[i].lastRating === 1 && rating === 1;
          activatedWords[i].viewed++;
          activatedWords[i].lastView = _.now();
          activatedWords[i].lastRating = rating;
          if(activatedWords[i].learned){
            updateStats();
            removeLearnedWords();
          }
          persistChanges();
          return false;
        }
      }
      return false;
    };

    function persistChanges(){
      drilStorage.setItem("activatedWords",activatedWords);
    };


    function removeLearnedWords(){
      _.remove(activatedWords, function(word) { return word.learned; });
    }

    function getStatistics(){
      var stats = drilStorage.getItemFromSession("stats");
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
      drilStorage.setItemInSession("stats", stats);
    }

    function rateAndGetNext(word, rating){
      updateRating(word, rating);
      persistChanges(word);
      return getNext();
    };




    return {
      getCountOfActivated : getCountOfActivated,
      getStatistics : getStatistics,
      getNext:  getNext,
      rateAndGetNext : rateAndGetNext
    };
  }]);
