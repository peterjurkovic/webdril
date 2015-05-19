'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('LoginCtrl', [ '$scope', 'UserFactory', 'AUTH_EVENTS', '$rootScope', '$location', 'Toast', '$window',
    function ($scope, UserFactory, AUTH_EVENTS, $rootScope, $location, Toast, $window) {
      $window.ga('send', 'pageview', { page: $location.url() });

    $scope.credentials = {
      username: '',
      password: ''
    };

    var token = $location.hash();
      if(token){
        UserFactory.activateAccount(token).then(
          function(res){
            if(res.data.success){
              $scope.activated = true;
            }
          }
        );
      }
    $scope.login = function (isValid, credentials) {

      $scope.badCredentials = false;

      function showLoader(){
        $scope.isLoading = true;
      }

      function hideLoader(){
        $scope.isLoading = false;
      }

      if(!isValid || $scope.isLoading){
        return false;
      }
      showLoader();



      function handleSuccess(res){
        $rootScope.user = res.data.user;
        Toast.success('You have been successfully logged in');
        $location.path('/manage/books');
      }

      function handleError(res){
          if(res.status === 400 && res.data.error){
            Toast.info(res.data.error.message);
          }else{
            $scope.badCredentials = true;
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          }
        hideLoader();
      }

      UserFactory.login(credentials).then(handleSuccess, handleError);
    };
  }]);
