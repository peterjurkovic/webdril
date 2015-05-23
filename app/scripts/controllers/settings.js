'use strict';

angular.module('webdrilApp')
  .controller('SettingsCtrl', ['$scope','Toast', 'DrilAPI', 'UserFactory', 'DrilStorage', '$translate',
    function ($scope, Toast, DrilAPI, UserFactory, DrilStorage, $translate) {

      $scope.stats = false;
      $scope.userObj = UserFactory.getUser();

      DrilAPI.getAllLanguages().then(function(res){
        $scope.languages = res.data;
      });


      DrilAPI.getStats(true).then(function(res){
        $scope.stats = res.data;
      });

      $scope.update = function(isValid, userObj){
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilAPI.updateAccount(userObj)
            .then(function (){
              DrilStorage.setItemInSession('loggedUser', userObj);
              Toast.success($translate.instant('SAVED'));
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

      $scope.deactivate = function(){
          DrilAPI.toggleActivation({ type : 'all' }).then(function(){
              $scope.stats.statistics.activatedWordCount = 0;
              Toast.success($translate.instant('DEACTIVATED'));
          });
      };

    }]);
