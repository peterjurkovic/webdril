'use strict';

/**
 * @ngdoc function
 * @name webdrilApp.controller:LoginctrlCtrl
 * @description
 * # LoginctrlCtrl
 * Controller of the webdrilApp
 */
angular.module('webdrilApp')
  .controller('SingupCtrl', [ '$scope', 'UserFactory', '$location', 'Toast', 'User', 'DrilAPI', '$timeout',
    function ($scope, UserFactory, $location, Toast, User, DrilApi, $timeout) {

      function init(){
        $scope.user = {
          login: '',
          email: '',
          locale : '',
          firstName : '',
          lastName : '',
          password: '',
          password2: ''
        };
      }

      DrilApi.getAllLanguages().then(function(res){
        $scope.languages = res.data;
      })

      $scope.createAccount = function(isValid, user){
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilApi.createAccount(user)
            .then(function (res){
              $scope.created = true;
            }, function (res){
              console.log(res.status === 400);
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
