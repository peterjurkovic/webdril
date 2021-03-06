'use strict';

angular.module('webdrilApp')
  .controller('UserWordCtrl',
  ['$scope','DrilAPI', '$location', '$routeParams', 'Toast', 'DrilService', '$modal', '$translate',
    function ($scope, DrilAPI, $location, $routeParams, Toast, DrilService, $modal, $translate) {

      $scope.isLoading = true;
      $scope.book = null;
      initWord();
      DrilAPI.getLecture($routeParams.bookId, $routeParams.lectureId, true).then(function (res) {
        $scope.book = res.data;
        $scope.isLoading = false;
      });

      function initWord(){
        $scope.word = {
          answer : '',
          question : '',
          dril_lecture_id : $routeParams.lectureId
        };
      }

      $scope.edit = function (word) {
        var modalBox = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/edit-word.html',
          controller: 'EditWordCtrl',
          resolve: {
            word: function () {
              return word;
            }
          }
        });
        modalBox.result.then(function (eWord) {
          word.question = eWord.question;
          word.answer = eWord.answer;
        });
      };


      $scope.saveWord = function ( newValue, word, type ){
        if(type === 'q'){
          word.question = newValue;
        }else{
          word.answer = newValue;
        }
        DrilAPI.updateWord( word ).then( function(){
          success();
        });
      };

      $scope.validate = function ( newValue ){
        if(newValue.trim().length){
          return true;
        }
        Toast.danger($translate.instant('ERR_WORD'));
        return false;
      };

      $scope.add = function ( ){
        if(!$scope.word.answer.trim().length ||
           !$scope.word.question.trim().length){
            Toast.danger($translate.instant('ERR_ALL_REQUIRED'));
          return;
        }
        $scope.adding = true;
        DrilAPI.createWord( $scope.word ).then( function( res ){
          $scope.book.lecture.words.push(res.data);
          initWord();
        }).finally(function(){
          $scope.adding = false;
        });
      };

      $scope.removeWord = function ( word) {
        DrilAPI.removeWord( word.id ).then( function(){
          $scope.book.lecture.words.splice( $scope.book.lecture.words.indexOf(word), 1 );
          Toast.success($translate.instant('REMOVED'));
        });
      };

      $scope.remove = function(wordsOnly){
        DrilAPI.deleteLecture($routeParams.lectureId, wordsOnly).then(function(){
          success();
          if(wordsOnly){
            $scope.book.lecture.words = [];
          }else{
            $location.path('/manage/book/' + $scope.book.id);
          }
        });
      };

      $scope.toggleLectureActivity = function( activate ){
        DrilAPI.toggleActivation({
          id: $routeParams.lectureId,
          activate : activate,
          type : 'lecture'
        }).then( function(){
          success();
          angular.forEach($scope.book.lecture.words,function(word){
            word.isActivated = activate;
          });
        });

      };

      $scope.toggleActivity = function ( word ) {
        word.isActivated = !word.isActivated;
        DrilAPI.toggleActivation({
          id: word.id,
          activate :word.isActivated,
          type : 'word'
        }).then( function(res) {
          if (word.isActivated){
            DrilService.addWord(res.data);
          }else{
            DrilService.removeWord(word.id);
          }
        });
      };

      $scope.importFile = function(){
        var modalBox = $modal.open({
          templateUrl: 'views/import.html',
          controller: 'ImportCtrl',
          resolve: {
            lecture: function () {
              return $scope.book.lecture;
            }
          }
        });

        modalBox.result.then(function (book) {
          $scope.book = book;
        });
      };

      $scope.saveLecture = function(){
        var lec = angular.copy($scope.book.lecture);
        delete lec.words;
        if(lec.name.length){
          DrilAPI.updateLecture(lec)
            .then(function(){

              success();
              $scope.editLecture = false;
            }, function(res){
              if(res.status === 400){
                Toast.danger(res.data.error.message);
              }
            });

        }
      };
      $scope.onEditLecture = function(){
        $scope.editLecture = true;
      };

      $scope.onCancelEditLecture = function(){
        $scope.editLecture = false;
      };

      function success(){
          Toast.success($translate.instant('SAVED'));
      }
    }]);
