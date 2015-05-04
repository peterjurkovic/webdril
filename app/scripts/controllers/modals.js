'use strict';


angular.module('webdrilApp')
  .controller('EditWordCtrl', ['$scope', '$modalInstance', 'word', 'DrilAPI', 'Toast',
      function ($scope, $modalInstance, word, DrilAPI, Toast) {
      console.log(word);
      $scope.word = angular.copy(word);

      $scope.save = function (isValid) {
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilAPI.updateWord( $scope.word ).then( function(){
            Toast.success('Saved');
            $modalInstance.close($scope.word);
          });
        }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };



      $scope.translateQuestion = function(){
        $scope.isTranslating = true;
        DrilAPI.translate($scope.word.question, word.langQuestion,word.langAnswer).then(function(res){
          $scope.word.answer = res.data.result;
        }).finally(stopTranslating);
      };

      $scope.translateAnswer = function(){
        $scope.isTranslating = true;
        DrilAPI.translate($scope.word.answer, word.langAnswer, word.langQuestion).then(function(res){
          $scope.word.question = res.data.result;
        }).finally(stopTranslating);
      };

      function stopTranslating(){
        $scope.isTranslating = false;
      }
  }]);
