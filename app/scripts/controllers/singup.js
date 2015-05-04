'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('SingupCtrl', [ '$scope', '$location', 'Toast', 'DrilAPI',
    function ($scope, $location, Toast, DrilAPI) {

      function init(){
        $scope.user = {
          login: '',
          email: '',
          locale_id : '',
          firstName : '',
          lastName : '',
          password: '',
          password2: ''
        };
      }

      DrilAPI.getAllLanguages().then(function(res){
        $scope.languages = res.data;
      })

      $scope.createAccount = function(isValid, user){
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilAPI.createAccount(user)
            .then(function (res){
              $scope.created = true;
            }, function (res){
              if(res.status === 400 ){
                Toast.danger(res.data.error.message);
              }
            })
            .finally(function(){
              $scope.pending = false;
            });
        }else{
          Toast.danger('The registration form contains errors.');
        }




      };

      init();
    }]);
