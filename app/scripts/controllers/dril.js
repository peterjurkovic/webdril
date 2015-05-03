'use strict';


angular.module('webdrilApp')
  .controller('DrilCtrl', ['$scope', 'DrilService', 'RATING', 'TTSConfig', 'ENV',
    function ($scope, DrilService, RATING, TTSConfig, ENV) {
      TTSConfig.url = ENV.api + '/tts';

      DrilService.loadFromServer().then(function(){
        $scope.currentWord = DrilService.getNextWord();
        $scope.isAnswerShown = false;
      })

      ///////////////////////////////

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
        //$scope.currentWord = DrilService.rateAndGetNext($scope.currentWord, rating);
        $scope.currentWord = DrilService.rateAGetNext($scope.currentWord, rating);
        $scope.isAnswerShown = false;
        $scope.user.answer = '';
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
