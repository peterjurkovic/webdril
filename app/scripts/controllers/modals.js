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
  .controller('ImportCtrl', ['$scope', '$modalInstance', 'lecture', 'ENV', 'Toast', 'Upload',
    function ($scope, $modalInstance, lecture, ENV, Toast, Upload) {

      $scope.progress = false;

      $scope.save = function (myFiles) {

        if (myFiles && myFiles.length) {
            var file = myFiles[0];
            $scope.progress = 6;
            Upload.upload({
              url: ENV.api + '/user/words/import',
              fields: {'lectureId': lecture.id},
              file: file
            }).progress(function (evt) {
              $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
              console.log(data);
              //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            }).error(function(data, status){
              console.log(data.message);

            });

        }
      };
  }]);
