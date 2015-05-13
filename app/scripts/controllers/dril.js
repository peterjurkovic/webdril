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

      function showAnswer() {
        $scope.isAnswerShown = true;
      }

      function rateWord(rating){
        $scope.currentWord = DrilService.rateAndGetNext($scope.currentWord, rating);
        console.log('current workd,', $scope.currentWord);
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

      $scope.share = function(){
        console.log(FB);
        FB.ui(
          {
            method: 'feed',
            name: 'I\'ve just extended my vocabulary of 3 new words!',
            link: 'http://web.drilapp.com',
            picture: 'http://www.hyperarts.com/external-xfbml/share-image.gif',
            caption: '',
            description: 'This is the content of the "description" field, below the caption.',
            message: ''
          });
      }

      $scope.showAnswer = showAnswer;
      $scope.rateWord = rateWord;
      $scope.getCountOfActivated = getCountOfActivated;
      $scope.getStatistics =  getStatistics;
      $scope.compare = compare;
      $scope.RATING = RATING;
    }
  ]);
