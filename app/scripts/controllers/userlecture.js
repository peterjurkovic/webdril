'use strict';

angular.module('webdrilApp')
  .controller('UserLectureCtrl', ['$scope','BookService', '$location', '$routeParams',
    function ($scope, BookService, $location, $routeParams) {

      $scope.isLoading = true;
      $scope.book = false;
      $scope.editBook = false;
      $scope.errors = false;

      $scope.onEditBook = onEditBook;
      $scope.cancelEditing = cancelEditing;
      $scope.goToLecture = goToLecture;
      $scope.saveBook = saveBook;

      loadLectures();

      // ---------------------------------------------------------

      function goToLecture(id){
        $location.path('/manage/book/' + $scope.book.id + '/lecture/' + id);
      }

      function onEditBook(){
        BookService.loadFilterOptions().then(function (res) {
          $scope.levels = res.data.levels;
          $scope.languages = res.data.languages;
          $scope.categories = res.data.categories;
        });
        $scope.editBook = angular.copy($scope.book);
      }

      function cancelEditing(){
        $scope.editBook = false;
        $scope.errors = false;
      }

      function saveBook(){
        BookService.updateBook($scope.editBook).then(
          function(response){
            $scope.book = response.data;
            $scope.editBook = false;
        }, function(){
            console.log(arguments);
            $scope.errors = 'An error  has occured';
        });

      }

      function loadLectures(){
        BookService.getBookLectures($routeParams.bookId).then(function (res) {
          $scope.isLoading = false;
          $scope.book = res.data;
        });
      }

    }]);
