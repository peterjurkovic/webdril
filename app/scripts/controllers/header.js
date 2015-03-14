'use strict';

angular.module('webdrilApp')
  .controller('HeaderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (url) {
      return url === $location.path();
    };
  }]);
