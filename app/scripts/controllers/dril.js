'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'DrilService', 'RATING', 'TTSConfig', 'ENV', '$modal','$location', '$window',
    function ($scope, DrilService, RATING, TTSConfig, ENV, $modal,$location, $window) {
      TTSConfig.url = ENV.api + '/tts';

      function init(){
        $scope.currentWord = DrilService.getNextWord();
        updateStats();
      }

      if($scope.user || !DrilService.loadFromStorage().length){
        DrilService.loadFromServer().then(init);
      }else{
        init();
      }

      $scope.userAnswer = { value : '' };

      ///////////////////////////////


      $scope.edit = function () {
        var modalBox = $modal.open({
          templateUrl: 'views/edit-word.html',
          controller: 'EditWordCtrl',
          resolve: {
            word: function () {
              return $scope.currentWord;
            }
          }
        });
        modalBox.result.then(function (word) {
          $scope.currentWord.question = word.question;
          $scope.currentWord.answer = word.answer;
        });
      };

      function updateStats(){
        $scope.stats = DrilService.getStatistics();
      }

      function getCountOfActivated(){
        return DrilService.getCountOfWords();
      }

      function showAnswer() {
        $scope.isAnswerShown = true;
      }

      function rateWord(rating){
        $scope.currentWord = DrilService.rateAndGetNext($scope.currentWord, rating);
        $scope.isAnswerShown = false;
        $scope.userAnswer.value = '';
        updateStats();
      }

      function isFinished(){
        return $scope.currentWord === null;
      }


      $scope.showAnswer = showAnswer;
      $scope.rateWord = rateWord;
      $scope.getCountOfActivated = getCountOfActivated;
      $scope.isFinished = isFinished;
      $scope.RATING = RATING;
      $window.ga('send', 'pageview', { page: $location.url() });
    }
  ]);
