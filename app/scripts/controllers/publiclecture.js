'use strict';

angular.module('webdrilApp')
  .controller('PublicLectureCtrl', ['$scope','BookService', '$location', '$routeParams',
  function ($scope, BookService, $location, $routeParams) {

    $scope.isLoading = true;
    $scope.book = null;
    BookService.getBookLectures($routeParams.bookId).then(function (res) {
      $scope.isLoading = false;
      $scope.book = res.data;
    }).error(function(data, status, headers, config) {

    });;


    $scope.goToLecture = function(id) {
      $location.path('/book/' + $scope.book.id + '/lecture/' + id);
    };
  }]);
