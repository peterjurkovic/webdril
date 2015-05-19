'use strict';

angular.module('webdrilApp')
  .controller('LectureCtrl', ['$scope','DrilAPI', '$location', '$routeParams', '$window',
  function ($scope, DrilAPI, $location, $routeParams, $window) {
    $window.ga('send', 'pageview', { page: $location.url() });
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
