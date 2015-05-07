'use strict';


angular.module('webdrilApp')
  .controller('EditWordCtrl', ['$scope', '$modalInstance', 'word', 'DrilAPI', 'Toast',
    function ($scope, $modalInstance, word, DrilAPI, Toast) {
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
    }])
  .controller('ImportCtrl', ['$scope', '$modalInstance', 'DrilAPI', 'Toast', 'Upload',
    function ($scope, $modalInstance, DrilAPI, Toast, Upload) {


      $scope.save = function (myFiles) {
        console.log(myFiles, $scope.files);
        if (myFiles && myFiles.length) {

            var file = myFiles[0];
            Upload.upload({
              url: 'upload/url',
              fields: {'username': $scope.username},
              file: file
            }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
              console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            });

        }
      };
  }]);
