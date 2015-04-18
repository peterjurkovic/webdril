'use strict';

angular.module('webdrilApp')
  .controller('WordCtrl', ['$scope','DrilAPI', '$location', '$routeParams',
    function ($scope, DrilAPI, $location, $routeParams) {

      $scope.isLoading = true;
      $scope.book = null;
      DrilAPI.getLecture($routeParams.bookId, $routeParams.lectureId).then(function (res) {
        $scope.book = res.data;
        $scope.isLoading = false;
      });

    }]);
