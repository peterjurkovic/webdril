'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('LoginCtrl', [ '$scope', 'UserFactory', 'AUTH_EVENTS', '$rootScope', '$location',
    function ($scope, UserFactory, AUTH_EVENTS, $rootScope, $location) {
    $scope.user = null;
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (isValid, credentials) {
      $scope.badCredentials = false;
      if(!isValid || $scope.isLoading){
        return false;
      }
      showLoader();

      UserFactory.login(credentials).then(handleSuccess, handleError);
      function handleSuccess(res){
        $scope.user = res.data.user;
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $location.path('/manage/books');
      }

      function handleError(){
          $scope.badCredentials = true;
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        hideLoader();
      }

      function showLoader(){
        $scope.isLoading = true;
      }

      function hideLoader(){
        $scope.isLoading = false;
      }

      //AuthService.login(credentials).then(function (user) {
      //  $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      //  $scope.setCurrentUser(user);
      //}, function () {
      //  $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      //});
    };
  }]);
