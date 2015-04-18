'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('LoginCtrl', [ '$scope', 'UserFactory', 'AUTH_EVENTS', '$rootScope', '$location', 'Toast', 'User',
    function ($scope, UserFactory, AUTH_EVENTS, $rootScope, $location, Toast, User) {
    $scope.user = User.info;

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

      function handleSuccess(){
        Toast.success('You have been successfully logged in');
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

    };
  }]);
