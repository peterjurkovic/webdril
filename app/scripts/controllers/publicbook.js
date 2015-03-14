'use strict';


angular.module('webdrilApp')
  .controller('PublicBookCtrl', ['$scope','BookService', 'ENV',
    function ($scope, BookService, ENV) {
      console.log('PublicBookCtrl');
      $scope.totalItems = 0;
      $scope.state = {
        currentPage : 1,
        peerPage : ENV.itemsPeerPage
      };



      $scope.items = [];
      var renderBooks = function () {
          console.log('Loading books..');
          $scope.isLoading = true;
          BookService.getPage($scope.state).then(function (result) {
          console.log('success');
            $scope.items = result.data.books;
            $scope.totalItems = result.data.count;
            $scope.isLoading = false;
        });
      };

      $scope.changePage = function(page) {
        $scope.state.currentPage = page;
        renderBooks();
      };

    renderBooks();
}]);
