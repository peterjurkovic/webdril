'use strict';


angular.module('webdrilApp')
  .controller('ForgottenPassCtrl', [ '$scope', '$location', 'Toast', 'DrilAPI', '$window', '$translate',
    function ($scope, $location, Toast, DrilAPI, $window, $translate) {
      $window.ga('send', 'pageview', { page: $location.url() });

      var token = $location.hash();
      if(token){
        $scope.showForm = true;
      }


      $scope.reset = function(isValid, data){
        if(!isValid){
          return false;
        }
        showLoader();
        $scope.tokenExpired = false;
        data.token = token;

        DrilAPI.resetPass(data).then(function(){
          Toast.success($translate.instant('RESET_SUCCESS'));
          $location.path('/login');
        }, function(res){
          $scope.tokenExpired = true;
        })
        .finally(hideLoader);
      };


      $scope.sendEmail = function(isValid, email){
        if(!isValid){
          return false;
        }
        showLoader();
        $scope.emailNotFound = false;
        DrilAPI.sendResetPassEmail(email).then(function(){

        }, function(res){
          $scope.emailNotFound = true;
        })
        .finally(hideLoader);
      };

      function hideLoader() {
        $scope.isLoading = false;
      }
      function showLoader() {
        $scope.isLoading = true;
      }
    }]);
