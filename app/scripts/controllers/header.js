'use strict';

angular.module('webdrilApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'AUTH_EVENTS', 'UserFactory', '$rootScope',
    function ($scope, $location, AUTH_EVENTS, UserFactory, $rootScope) {

    $rootScope.user = UserFactory.getUser();

    $scope.isActive = function (url) {
      return url === $location.path();
    };

    $scope.logout = function () {
      UserFactory.logout();
      $scope.user = false;
      $location.path('/login');1
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
      $rootScope.user = UserFactory.getUser();
    });


  }]);
