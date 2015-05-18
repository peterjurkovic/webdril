'use strict';


angular.module('webdrilApp')
  .controller('BookCtrl', ['$scope','DrilAPI', '$location','UserFactory', '$window',
    function ($scope, DrilAPI, $location, UserFactory,$window) {
      $window.ga('send', 'pageview', { page: $location.url() });
      $scope.isLoading = false;
      $scope.totalItems = 0;
      $scope.state = {
        orderBy : 'date',
        orderType : 1,
        currentPage : 1,
        level : '',
        langQuestion : '',
        langAnswer : '',
        category : ''
      };

      var user = UserFactory.getUser();
      if(user){
        $scope.state.langQuestion = user.localeId;
        if(user.targetLocaleId){
          $scope.state.langAnswer = user.targetLocaleId;
        }
      }
      $scope.items = [];

      DrilAPI.loadFilterOptions().then(function (res) {
        $scope.levels = res.data.levels;
        $scope.languages = res.data.languages;
        $scope.categoryList = res.data.categories;
      });

      var renderBooks = function () {
        $scope.isLoading = true;
        DrilAPI.getPage($scope.state).then(function (res) {
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
        $location.path('/book/' + id);
      };

    $scope.renderBooks = renderBooks;
    renderBooks();
}]);
