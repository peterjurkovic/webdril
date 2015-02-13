'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:DrilCtrl
 * @description
 * # DrilCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('DrilCtrl', function ($scope) {

    $scope.shouldShowAnwer = false;


    $scope.showAnswer = function (){
      $scope.shouldShowAnwer = true;
    }

  });
