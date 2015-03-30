'use strict';

angular.module('webdrilApp')
  .controller('UserLectureCtrl', ['$scope','BookService', '$location', '$routeParams',
    function ($scope, BookService, $location, $routeParams) {

      $scope.isLoading = true;
      $scope.book = false;
      $scope.editBook = false;
      $scope.errors = false;

      $scope.onEditBook = onEditBook;
      $scope.onRemoveBook = onRemoveBook;
      $scope.cancelEditing = cancelEditing;
      $scope.goToLecture = goToLecture;
      $scope.saveBook = saveBook;
      $scope.showLectureForm = showLectureForm;
      $scope.hideLectureForm = hideLectureForm;
      $scope.saveLecture = saveLecture;

      loadLectures();

      // ---------------------------------------------------------

      function onRemoveBook(){
          BookService.removeBook($scope.book).then(
            function(res){
              console.log('book deleted');
              $location.path('/manage/books');
            },
            function(res){

            }
          )

      }


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
            $scope.errors = false;
        }, function(response){
            if(response.status === 400){
              $scope.errors = response.data.error.message;
            }
        });

      }

      function loadLectures(){
        BookService.getBookLectures($routeParams.bookId).then(function (res) {
          $scope.isLoading = false;
          $scope.book = res.data;
        });
      }

      function showLectureForm(){
        $scope.lecture = {
          name : "",
          dril_book_id : $scope.book.id
        };
        $scope.lectureErrors = false;
      }

      function hideLectureForm(){
        $scope.lecture = null;
      }

      function saveLecture(lecture){
        BookService.createLecture(lecture).then(
          function(res){
            $scope.book.lectures.push(res.data);
            $scope.lecture = null;
          },
          function(res){
            $scope.lectureErrors = res.data.error.message;
          }

        );
      }

    }]);
