'use strict';

angular.module('webdrilApp')
  .controller('UserWordCtrl', ['$scope','BookService', '$location', '$routeParams', 'Toast', 'Translate',
    function ($scope, BookService, $location, $routeParams, Toast, Translate) {

      $scope.isLoading = true;
      $scope.book = null;

      BookService.getLecture($routeParams.bookId, $routeParams.lectureId).then(function (res) {
        $scope.book = res.data;
        $scope.isLoading = false;
        $scope.word = {};
      });


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

      $scope.translageQuestion = function(){
        var text = $scope.word.question;
        if(text.length)
        BookService.translate(text,
                $scope.book.question_lang_code,
                $scope.book.answer_lang_code).success(function(data){
            $scope.word.answer = data.result;
        });
      }
    }]);
