'use strict';

angular.module('webdrilApp')
  .controller('LectureCtrl', ['$scope','DrilAPI', '$location', '$routeParams',
  function ($scope, DrilAPI, $location, $routeParams) {

    $scope.isLoading = true;
    $scope.book = null;
    DrilAPI.getBookLectures($routeParams.bookId).then(function (res) {
      $scope.isLoading = false;
      $scope.book = res.data;
    });


    $scope.goToLecture = function(id) {
      $location.path('/book/' + $scope.book.id + '/lecture/' + id);
    };
  }]);
