'use strict';

angular.module('webdrilApp')
  .controller('HomeCtrl', ['$scope', '$location', '$window',
    function ($scope, $location, $window) {
      $window.ga('send', 'pageview', { page: $location.url() });
      $scope.homePage = true;


    }]);
