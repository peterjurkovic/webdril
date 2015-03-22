'use strict';

angular.module('webdrilApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'AUTH_EVENTS', 'UserFactory',
    function ($scope, $location, AUTH_EVENTS, UserFactory) {

    $scope.loggedIn = UserFactory.getUser() !== null;

    $scope.isActive = function (url) {
      return url === $location.path();
    };

    $scope.logout = function () {
      UserFactory.logout();
      $scope.loggedIn = false;
    };

    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
      $scope.loggedIn = true;
    });


  }]);
