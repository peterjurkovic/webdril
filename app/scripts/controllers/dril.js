'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'DrilService', 'RATING',
    function ($scope, DrilService, RATING) {

      $scope.currentWord = DrilService.getNextWord();
      $scope.isAnswerShown = false;
      $scope.showAnswer = showAnswer;
      $scope.rateWord = rateWord;
      $scope.isNotFinished = isNotFinished;
      $scope.getCountOfActivated = getCountOfActivated;
      $scope.getStatistics =  getStatistics;
      $scope.RATING = RATING;
      ///////////////////////////////

      function getStatistics(){
        return DrilService.getStatistics();
      }

      function getCountOfActivated(){
        return DrilService.getCountOfWords();
      }

      function isNotFinished(){
        return $scope.currentWord !== null;
      }

      function showAnswer() {
        $scope.isAnswerShown = true;
      }

      function rateWord(rating){
        $scope.currentWord = DrilService.rateAndGetNext($scope.currentWord, rating);
        $scope.isAnswerShown = false;
      }
    }
  ]);
