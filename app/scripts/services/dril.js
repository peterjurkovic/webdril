'use strict';


angular.module('webdrilApp')
  .factory('DrilFactory', function () {


    var activatedWords = [
      { id : 1, question: 'question', answer : ' answer', viewed : 0, lastView : '2015-02-15 15:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 2, question: 'question2', answer : ' answer2', viewed : 1, lastView : '2015-02-15 14:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 3, question: 'question3', answer : ' answer3', viewed : 0, lastView : '2015-02-15 12:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 4, question: 'question4', answer : ' answer4', viewed : 5, lastView : '2015-02-11 10:00:56', lastRating : 2, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 5, question: 'question5', answer : ' answer5', viewed : 0, lastView : '2015-02-15 15:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 6, question: 'question6', answer : ' answer6', viewed : 1, lastView : '2015-02-15 14:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 7, question: 'question7', answer : ' answer7', viewed : 0, lastView : '2015-02-15 09:31:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 8, question: 'question8', answer : ' answer8', viewed : 5, lastView : '2015-02-06 10:00:56', lastRating : 2, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 9, question: 'questio9', answer : ' answer9', viewed : 0, lastView : '2015-02-07 15:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 10, question: 'question10', answer : ' answer10', viewed : 1, lastView : '2015-02-08 14:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 11, question: 'question11', answer : ' answer11', viewed : 0, lastView : '2015-02-09 12:30:56', lastRating : 1, langQuestion: 'en', langAnswer: 'sk',  learned : false },
      { id : 12, question: 'question12', answer : ' answer12', viewed : 5, lastView : '2015-02-10 10:00:56', lastRating : 2, learned : false }
    ];


    var getNext = function () {
        console.log('getNext');
    };



    return {
      getNext:  getNext
    };
  });
