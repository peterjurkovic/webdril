'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'DrilService', 'RATING', 'TTSConfig', 'ENV', '$modal',
    function ($scope, DrilService, RATING, TTSConfig, ENV, $modal) {
      TTSConfig.url = ENV.api + '/tts';

      DrilService.loadFromServer().then(function(){
        $scope.currentWord = DrilService.getNextWord();
        $scope.isAnswerShown = false;
      });

      $scope.userAnswer = {
        value : ''
      };

      ///////////////////////////////


      $scope.edit = function () {
        var modalBox = $modal.open({
          animation: $scope.animationsEnabled,
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


      function getStatistics(){
        return DrilService.getStatistics();
      }

      function getCountOfActivated(){
        return DrilService.getCountOfWords();
      }

      function isNotFinished(){
        return $scope.currentWord !== null;
      }

      function showAnswer() {
        $scope.isAnswerShown = true;
      }

      function rateWord(rating){
        $scope.currentWord = DrilService.rateAndGetNext($scope.currentWord, rating);
        $scope.isAnswerShown = false;
        $scope.userAnswer.value = '';
      }

      function compare(text){
        if(clean(text) === clean($scope.currentWord.answer)){
           $scope.isAnswerShown = true;
        }
      }

      function clean(text){
        var from = 'àôďḟëšơßăřțňāķŝỳņĺħṗóúěéçẁċõṡøģŧșėĉśîűćęŵṫūčöèŷąłųůşğļƒžẃḃåìïḋťŗäíŕêüòēñńĥĝđĵÿũŭưţýőâľẅżīãġṁōĩùįźáûþðæµĕı',
            to =   'aodfesosartnaksynlhpoueecwcosogtsecsiucewtucoeyaluusglfzwbaiidtraireuoennhgdjyuuutyoalwziagmoiuizautdauei',
            length = text.length,
            position,
            result = '';

        text = text.toLowerCase();
        for(var i = 0; i < length; i++){
          position = from.indexOf(text[i]);
          if(position > -1){
            result += to.charAt(position);
          } else{
            result += text[i];
          }
        }
        return result
          .replace(/ +?/g, '-')
          .replace(/[^\w\s]|(.)\1/gi, '-')
          .replace(/[\-]{2,}/g, '-');
      }


      $scope.showAnswer = showAnswer;
      $scope.rateWord = rateWord;
      $scope.isNotFinished = isNotFinished;
      $scope.getCountOfActivated = getCountOfActivated;
      $scope.getStatistics =  getStatistics;
      $scope.compare = compare;
      $scope.RATING = RATING;
    }
  ]);
