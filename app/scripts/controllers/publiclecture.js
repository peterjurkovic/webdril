'use strict';

angular.module('webdrilApp')
  .controller('PublicLectureCtrl', ['$scope','BookService', '$location', '$routeParams',
  function ($scope, BookService, $location, $routeParams) {

    $scope.isLoading = false;
    $scope.book = null;
    BookService.getBookLectures($routeParams.bookId).then(function (res) {
      $scope.book = res.data;
    });


    $scope.goToLecture = function(id) {
      $location.path('/book/' + $scope.book.id + '/lecture/' + id);
    };
  }]);
