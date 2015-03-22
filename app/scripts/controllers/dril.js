'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'DrilService',
    function ($scope, DrilService) {

      $scope.currentWord = DrilService.getNext();
      $scope.isAnswerShown = false;
      $scope.showAnswer = showAnswer;
      $scope.rateWord = rateWord;
      $scope.isNotFinished = isNotFinished;
      $scope.getCountOfActivated = getCountOfActivated;
      $scope.getStatistics =  getStatistics;

      ///////////////////////////////

      function getStatistics(){
        return DrilService.getStatistics();
      }

      function getCountOfActivated(){
        return DrilService.getCountOfActivated();
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
