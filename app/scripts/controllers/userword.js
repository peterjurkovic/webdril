'use strict';

angular.module('webdrilApp')
  .controller('UserWordCtrl', ['$scope','BookService', '$location', '$routeParams', 'Toast', 'Translate',
    function ($scope, BookService, $location, $routeParams, Toast, Translate) {

      $scope.isLoading = true;
      $scope.book = null;
      initWord();
      BookService.getLecture($routeParams.bookId, $routeParams.lectureId).then(function (res) {
        $scope.book = res.data;
        $scope.isLoading = false;
      });

      function initWord(){
        $scope.word = {
          answer : "",
          question : "",
          dril_lecture_id : $routeParams.lectureId
        };
      }


      $scope.saveWord = function ( newValue, word, type ){
        console.log(arguments);
        if(type === 'q'){
          word.question = newValue;
        }else{
          word.answer = newValue;
        }
        BookService.updateWord( word ).then( function(){
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
        BookService.createWord( $scope.word ).then( function( res ){
          $scope.book.lecture.words.push(res.data);
          Toast.success("Added");
          initWord();

        }).finally(function(){
          $scope.adding = false;
        });
      };


    }]);
