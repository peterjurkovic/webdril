'use strict';

angular.module('webdrilApp')
  .controller('SettingsCtrl', ['$scope','Toast', 'DrilAPI', 'UserFactory',
    function ($scope, Toast, DrilAPI, UserFactory) {
      console.log(UserFactory.getUser());

      $scope.userObj = angular.copy(UserFactory.getUser());



      DrilAPI.getAllLanguages().then(function(res){
        $scope.languages = res.data;
      })

      $scope.update = function(isValid, userObj){
        console.log(userObj);
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilApi.update(user)
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

    }]);
