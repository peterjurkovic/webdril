'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('LoginCtrl', [ '$scope', 'UserFactory',
    function ($scope, UserFactory) {
    $scope.user = null;
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (credentials) {
      console.log(credentials);
      UserFactory.login(credentials).then(function success(response) {
        $scope.user = response.data.user;
      }, handleError);

      function handleError(response) {
        alert('Error: ' + response.data);
      }

      //AuthService.login(credentials).then(function (user) {
      //  $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      //  $scope.setCurrentUser(user);
      //}, function () {
      //  $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      //});
    };
  }]);
