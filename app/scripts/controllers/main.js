'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
