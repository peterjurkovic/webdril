'use strict';

angular.module('webdrilApp')
  .controller('WordCtrl', ['$scope','DrilAPI', '$location', '$routeParams', 'DrilService',
    function ($scope, DrilAPI, $location, $routeParams, DrilService, Toast) {

      $scope.isLoading = true;
      $scope.book = null;
      DrilAPI.getLecture($routeParams.bookId, $routeParams.lectureId).then(function (res) {
        updateActivity(res.data.lecture.words);
        console.log(res.data);
        $scope.book = res.data;
        $scope.isLoading = false;
      });


      $scope.toggleActivity = function(word){
        word.isActivated = !word.isActivated;
        if(word.isActivated){
          addWord(word);
        }else{
          DrilService.removeWord(word.id);
        }
      };

      function updateActivity(wordList){
          var i, j, found,
              activatedWord = DrilService.loadFromStorage();
          for(i = 0; i < wordList.length; i++){
              found = false;
              for(j = 0; j < activatedWord.length; j++){
                if(wordList[i].id === activatedWord[j].id){
                  found = true;
                  break;
                }
              }
            wordList[i].isActivated = found;
          }
      }

      function addWord( word ){
        var dWord = angular.extend({}, word, {
          lastRating : null,
          viewed : 0,
          isLearned : 0,
          lastViewed : 0,
          langQuestion : $scope.book.question_lang_code,
          langAnswer : $scope.book.answer_lang_code
        });
        DrilService.addWord(dWord);
      }

    }]);
