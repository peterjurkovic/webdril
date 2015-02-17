'use strict';


angular.module('webdrilApp')
  .factory('drilService', ['drilStorage', '$filter',
      function (drilStorage, $filter) {


    var activatedWords = [
      { id : 1, question: 'question', answer : ' answer', viewed : 0, lastView : 1424210734010, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 2, question: 'question2', answer : ' answer2', viewed : 1, lastView : 1424210734020, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 3, question: 'question3', answer : ' answer3', viewed : 0, lastView : 1424210734030, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 4, question: 'question4', answer : ' answer4', viewed : 5, lastView : 1424210734040, lastRating : 2, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 5, question: 'question5', answer : ' answer5', viewed : 0, lastView : 1424210734050, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 6, question: 'question6', answer : ' answer6', viewed : 1, lastView : 1424210734060, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 7, question: 'question7', answer : ' answer7', viewed : 0, lastView : 1424210734070, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 8, question: 'question8', answer : ' answer8', viewed : 5, lastView : 1424210734080, lastRating : 2, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 9, question: 'questio9', answer : ' answer9', viewed : 0, lastView : 1424210734930, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 10, question: 'question10', answer : ' answer10', viewed : 1, lastView : 1424210734940, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 11, question: 'question11', answer : ' answer11', viewed : 0, lastView : 1424210734950, lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 12, question: 'question12', answer : ' answer12', viewed : 5, lastView : 1424210734960, lastRating : 2, learned : false }
    ];


    function getNext() {
      if(_.isEmpty(activatedWords)){
        return null;
      }
      return getNextWord();
    };

    function getNextWord(){
      console.log('getting next of ' + activatedWords.length);
      return _.min( activatedWords, function(o) { return o.lastView });
    };

    function findIntStorageById(id){
      for(var i = 0; i < activatedWords.length; i++){
        if(parseInt(activatedWords[i].id, 10) === id){
          return activatedWords[i];
        }
      }
      return null;
    };

    function updateRating(word, rating){
      var word = findIntStorageById(word.id);
      word.learned = word.lastRating === 1 && rating === 1;
      word.viewed = word.viewed + 1;
      word.lastView = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
      word.lastRating = rating;
      word.changed = _.now();
      return word;
    };

    function persistChanges(word){
      _.remove(activatedWords, function(o) { return o.id === word.id });
      activatedWords.push(word);
      drilStorage.setItem("activatedWords",activatedWords);
    };

    function processRatingAndGetNext(word, rating){
      word = updateRating(word, rating);
      persistChanges(word);
      return getNext();
    };


    var publicMethods = {
      getNext:  getNext,
      processRatingAndGetNext : processRatingAndGetNext
    }

    return publicMethods;
  }]);
