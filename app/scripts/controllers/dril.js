'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'drilService',
    function ($scope, drilService) {


      $scope.currentWord = drilService.getNext();

      $scope.isAnswerShown = false;


      $scope.showAnswer = function () {
        $scope.isAnswerShown = true;
        console.log('$scope.isAnswerShown ' + $scope.isAnswerShown);
      }

      $scope.rateWord = function (rating){
        $scope.currentWord = drilService.rateAndGetNext($scope.currentWord, rating);
        $scope.isAnswerShown = false;
      }

      $scope.isNotFinished = function(){
        return $scope.currentWord !== null;
      }

      $scope.getCountOfActivated = function(){
        return drilService.getCountOfActivated();
      }

      $scope.getStatistics = function(){
        return drilService.getStatistics();
      }
    }
  ]);
