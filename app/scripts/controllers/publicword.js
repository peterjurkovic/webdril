'use strict';

angular.module('webdrilApp')
  .controller('PublicWordCtrl', ['$scope','BookService', '$location', '$routeParams',
    function ($scope, BookService, $location, $routeParams) {

      $scope.isLoading = true;
      $scope.book = null;
      BookService.getLecture($routeParams.bookId, $routeParams.lectureId).then(function (res) {
        $scope.book = res.data;
        $scope.isLoading = false;
      });

    }]);
