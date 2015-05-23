'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('SingupCtrl', [ '$scope', '$location', 'Toast', 'DrilAPI', '$window', '$translate',
    function ($scope, $location, Toast, DrilAPI, $window, $translate) {
      $window.ga('send', 'pageview', { page: $location.url() });


      DrilAPI.getAllLanguages().then(function(res){
        $scope.languages = res.data;
      });

      $scope.createAccount = function(isValid, user){
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilAPI.createAccount(user)
            .then(function (){
              $scope.created = true;
              $scope.email = user.email;
            }, function (res){
              if(res.status === 400 ){
                Toast.danger(res.data.error.message);
              }
            })
            .finally(function(){
              $scope.pending = false;
            });
        }else{
            Toast.danger($translate.instant('ERR_FORM'));
        }
      };

    }]);
