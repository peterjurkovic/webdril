/**
 * Created by peto on 25.3.2015.
 */
'use strict';


angular.module('webdrilApp')
  .controller('UserBookCtrl', ['$scope','BookService', '$location',
    function ($scope, BookService, $location) {

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
        BookService.getUserBookPage($scope.state).then(function (res) {
          $scope.items = res.data.books;
          $scope.totalItems = res.data.count;
          $scope.isLoading = false;
        });

      };

      $scope.changePage = function(page) {
        $scope.state.currentPage = page;
        renderBooks();
      };

      $scope.changeFilter = function() {
        $scope.state.currentPage = 1;
        renderBooks();
      };

      $scope.goToBook = function(id) {
        console.log(id);
        $location.path('/book/' + id);
      };

      $scope.renderBooks = renderBooks;
      renderBooks();
    }]);
