'use strict';

angular.module('webdrilApp')
  .controller('SettingsCtrl', ['$scope','Toast', 'DrilAPI', 'UserFactory', 'DrilStorage',
    function ($scope, Toast, DrilAPI, UserFactory, DrilStorage) {

      $scope.userObj = UserFactory.getUser();

      DrilAPI.getAllLanguages().then(function(res){
        $scope.languages = res.data;
      })

      $scope.update = function(isValid, userObj){
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilAPI.updateAccount(userObj)
            .then(function (){
              DrilStorage.setItemInSession('loggedUser', userObj);
              Toast.danger('Saved');
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
