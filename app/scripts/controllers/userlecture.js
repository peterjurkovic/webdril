'use strict';

angular.module('webdrilApp')
  .controller('UserLectureCtrl', ['$scope','BookService', '$location', '$routeParams',
    function ($scope, BookService, $location, $routeParams) {

      $scope.isLoading = true;
      $scope.book = null;
      $scope.isEditing = false;

      BookService.getBookLectures($routeParams.bookId).then(function (res) {
        $scope.isLoading = false;
        $scope.book = res.data;
      });

      $scope.editBook = function(){
        $scope.isEditing = true;
      }


      $scope.goToLecture = function(id) {
        $location.path('/manage/book/' + $scope.book.id + '/lecture/' + id);
      };
    }]);
