'use strict';

angular.module('webdrilApp')
  .controller('UserWordCtrl',
  ['$scope','DrilAPI', '$location', '$routeParams', 'Toast', 'DrilService', '$modal',
    function ($scope, DrilAPI, $location, $routeParams, Toast, DrilService, $modal) {

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
        console.log(arguments);
        if(type === 'q'){
          word.question = newValue;
        }else{
          word.answer = newValue;
        }
        DrilAPI.updateWord( word ).then( function(){
          Toast.success("Saved");
        });
      };

      $scope.validate = function ( newValue ){
        if(newValue.trim().length){
          return true;
        }
        Toast.danger('The word can not be empty.');
        return false;
      };

      $scope.add = function ( ){
        if(!$scope.word.answer.trim().length ||
           !$scope.word.question.trim().length){
          Toast.danger('All field are required.');
          return;
        }
        $scope.adding = true;
        DrilAPI.createWord( $scope.word ).then( function( res ){
          $scope.book.lecture.words.push(res.data);
          Toast.success("Added");
          initWord();

        }).finally(function(){
          $scope.adding = false;
        });
      };

      $scope.removeWord = function ( word) {
        DrilAPI.removeWord( word.id ).then( function(){
          $scope.book.lecture.words.splice( $scope.book.lecture.words.indexOf(word), 1 );
          Toast.success("Deleted");
        });
      };

      $scope.toggleLectureActivity = function( activate ){
        DrilAPI.toggleActivation({
          id: $routeParams.lectureId,
          activate : activate,
          type : 'lecture'
        }).then( function(){
          Toast.success('Saved');
          _.forEach($scope.book.lecture.words, function(word) {
            word.isActivated = activate;
          });
        });
      }

      $scope.toggleActivity = function ( word ) {
        word.isActivated = !word.isActivated;
        DrilAPI.toggleActivation({
          id: word.id,
          activate :word.isActivated,
          type : 'word'
        }).then( function(res) {
          if (word.isActivated){
            var w = res.data;
            var count = DrilService.addWord(w);
            Toast.info({
              content : 'You have activated ' + count + ' word(s)',
              dismissButton : false,
              timeout: 2500
            })
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
      }

    }]);
