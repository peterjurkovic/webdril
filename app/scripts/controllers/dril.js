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
        $scope.currentWord = drilService.processRatingAndGetNext(word, rating);
      }

      $scope.isFinished = function(){
        return $scope.currentWord !== null;
      }

    }
  ]);
