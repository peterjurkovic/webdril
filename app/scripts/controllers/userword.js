'use strict';

angular.module('webdrilApp')
  .controller('UserWordCtrl', ['$scope','BookService', '$location', '$routeParams', 'Toast',
    function ($scope, BookService, $location, $routeParams, Toast) {

      $scope.isLoading = true;
      $scope.book = null;
      BookService.getLecture($routeParams.bookId, $routeParams.lectureId).then(function (res) {
        $scope.book = res.data;
        $scope.isLoading = false;
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


    }]);
