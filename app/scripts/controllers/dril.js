'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'drilService',
    function ($scope, drilService) {


      $scope.currentWord = drilService.getNext();

      $scope.shouldShowAnwer = false;

      $scope.showAnswer = function () {
        $scope.shouldShowAnwer = true;
      }

      $scope.rateWord = function (word, rating){
        $scope.currentWord = drilService.rateAndGetNext(word, rating);
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
