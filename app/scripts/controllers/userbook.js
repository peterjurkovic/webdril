/**
 * Created by peto on 25.3.2015.
 */
'use strict';


angular.module('webdrilApp')
  .controller('UserBookCtrl', ['$scope','DrilAPI', '$location',
    function ($scope, DrilAPI, $location) {

      $scope.isLoading = false;
      $scope.totalItems = 0;
      $scope.state = {
        orderBy : "date",
        orderType : 1,
        currentPage : 1
      };

      $scope.items = [];

      var renderBooks = function () {
        $scope.isLoading = true;
        DrilAPI.getUserBookPage($scope.state).then(function (res) {
          $scope.items = res.data.books;
          $scope.totalItems = res.data.count;
          $scope.isLoading = false;
        });

      };

      $scope.changePage = function(page) {
        $scope.state.currentPage = page;
        renderBooks();
      };

      $scope.goToBook = function(id) {
        $location.path('/manage/book/' + id);
      };

      $scope.changeFilter = function() {
        $scope.state.currentPage = 1;
        renderBooks();
      };

      $scope.toggleActivation = function( book ){
        var bookToUpdate = angular.copy( book );
            bookToUpdate.is_shared =  !book.is_shared;
        DrilAPI.updateBook(bookToUpdate).then(function(){
            book.is_shared = bookToUpdate.is_shared;
        });
      };

      $scope.renderBooks = renderBooks;
      renderBooks();
    }]);
