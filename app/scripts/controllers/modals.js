'use strict';


angular.module('webdrilApp')
  .controller('EditWordCtrl', ['$scope', '$modalInstance', 'word', 'DrilAPI', 'Toast', '$translate',
    function ($scope, $modalInstance, word, DrilAPI, Toast, $translate) {
      $scope.word = angular.copy(word);

      $scope.save = function (isValid) {
        if(isValid && !$scope.pending){
          $scope.pending = true;
          DrilAPI.updateWord( $scope.word ).then( function(){
              Toast.success($translate.instant('SAVED'));
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
  .controller('ImportCtrl', ['$scope', '$modalInstance', 'lecture', 'ENV', 'Upload', 'Toast',
    function ($scope, $modalInstance, lecture, ENV, Upload, Toast) {

      $scope.progress = false;
      $scope.lecture = lecture;

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      $scope.save = function (myFiles) {
        $scope.error = false;
        if (myFiles && myFiles.length) {
          var file = myFiles[0];
          $scope.progress = 6;
          Upload.upload({
            url: ENV.api + '/user/words/import',
            fields: {'lectureId': lecture.id},
            file: file
          }).progress(function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
          }).success(function (data) {
              Toast.success($translate.instant('WORDS_SAVED'));
              $modalInstance.close(data);
          }).error(function(data, status){
            if(status === 400){
              $scope.error = data.error.message;
            }else{
                $scope.error = $translate.instant('ERR');
            }
            $scope.progress = false;
          });

        }
      };
    }])
  .controller('ContactCtrl', ['$scope', '$modalInstance', '$http', '$rootScope', 'ENV', 'Toast',
    function ($scope, $modalInstance,$http, $rootScope, ENV, Toast) {
      $scope.report = {
        message : '',
        name : '',
        email : ''
      };

      $scope.save = function(isValid){
        if(isValid){
          $http.post(ENV.api + '/contact', $scope.report).then(function(){
              Toast.success($translate.instant('MSG_SENT'));
              $scope.cancel();
          });
        }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
