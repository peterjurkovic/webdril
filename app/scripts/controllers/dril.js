'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'DrilService',
    function ($scope, DrilService) {


      $scope.currentWord = DrilService.getNext();

      $scope.isAnswerShown = false;


      $scope.showAnswer = function () {
        $scope.isAnswerShown = true;
      }

      $scope.rateWord = function (rating){
        $scope.currentWord = DrilService.rateAndGetNext($scope.currentWord, rating);
        $scope.isAnswerShown = false;
      }

      $scope.isNotFinished = function(){
        return $scope.currentWord !== null;
      }

      $scope.getCountOfActivated = function(){
        return DrilService.getCountOfActivated();
      }

      $scope.getStatistics = function(){
        return DrilService.getStatistics();
      }
    }
  ]);
