'use strict';

angular.module('webdrilApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'WORD_LIMIT', 'AUTH_EVENTS', 'UserFactory', '$rootScope', '$window',
    function ($scope, $location, WORD_LIMIT, AUTH_EVENTS, UserFactory, $rootScope) {
    $rootScope.wordLimit = WORD_LIMIT;
    $rootScope.user = UserFactory.getUser();

    $scope.isActive = function (url) {
      return url === $location.path();
    };

    $scope.logout = function () {
      UserFactory.logout();
      $scope.user = false;
      $location.path('/login');
    };

      $scope.$on(AUTH_EVENTS.loginSuccess, function(){
        $rootScope.user = UserFactory.getUser();
      });

      $scope.$on(AUTH_EVENTS.sessionTimeout, function(){
        $scope.logout();
      });
  }]);
