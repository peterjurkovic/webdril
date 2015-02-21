'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
