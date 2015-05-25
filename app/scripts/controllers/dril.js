'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'DrilService', 'RATING', 'TTSConfig', 'ENV', '$modal','$location', '$window', 'Similarity',
    function ($scope, DrilService, RATING, TTSConfig, ENV, $modal,$location, $window, Similarity) {
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

      $scope.key = function($event){
        if($event.keyCode === 39){
          rateWord(RATING.DO_NOT_KNOW);
        }else if($event.keyCode === 40){
          rateWord(RATING.NOT_YET);
        }else if($event.keyCode === 37){
          rateWord(RATING.KNOW);
        }
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



      //function compare(text){
      //  var distance = Similarity.getDistance($scope.currentWord.answer, text);
      //  console.log(distance);
      //  if(distance === 0){
      //    $scope.isAnswerShown = true;
      //  }
      // }

      function isFinished(){
        return $scope.currentWord === null;
      }


      $scope.showAnswer = showAnswer;
      $scope.rateWord = rateWord;
      $scope.getCountOfActivated = getCountOfActivated;
      //$scope.compare = compare;
      $scope.isFinished = isFinished;
      $scope.RATING = RATING;
      $window.ga('send', 'pageview', { page: $location.url() });
    }
  ]);
