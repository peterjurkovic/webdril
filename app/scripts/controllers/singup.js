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
      $scope.user = User.info;

      $scope.user = {
        login: '',
        email: '',
        lang : '',
        fistName : 'a',
        lastName : 'b',
        password: '1',
        password2: ''
      };


      $timeout(function(){
        DrilApi.getAllLanguages().then(function(res){
          $scope.languages = res.data;
        })
      },10);

      $scope.createAccount = function(isValid, user){
        console.log(user);
      };
    }]);
