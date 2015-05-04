'use strict';

angular.module('webdrilApp')
  .controller('SettingsCtrl', ['$scope','Toast', 'DrilAPI',
    function ($scope, Toast, DrilAPI) {

      function init(){
        $scope.user = {
          locale_id : '',
          firstName : '',
          lastName : ''
        };
      }


      DrilAPI.getAllLanguages().then(function(res){
        $scope.languages = res.data;
      })

      $scope.updateAccount = function(isValid, user){
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilApi.createAccount(user)
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
          Toast.danger('The form contains errors.');
        }

      };

      init();

    }]);
