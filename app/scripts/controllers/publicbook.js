'use strict';


angular.module('webdrilApp')
  .controller('PublicBookCtrl', ['$scope','BookService', 'ENV',
    function ($scope, BookService, ENV) {

      $scope.totalItems = 0;
      $scope.state = {
        orderBy : "date",
        orderType : 1,
        currentPage : 1,
        peerPage : ENV.itemsPeerPage
      };



      $scope.items = [];

      function loadFilterOptions(){
        BookService.loadFilterOptions().then(function (res) {
          $scope.levels = res.data.levels;
          $scope.languages = res.data.languages;
          $scope.categories = res.data.categories;
        });
      }

      var renderBooks = function () {
        $scope.isLoading = true;
        BookService.getPage($scope.state).then(function (res) {
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

    $scope.renderBooks = renderBooks;
    loadFilterOptions();
    renderBooks();
}]);
