'use strict';


angular.module('webdrilApp')
  .factory('DrilService', ['DrilStorage', '$filter', '$log', 'ENV', 'UserFactory', '$http',
      function (DrilStorage, $filter, $log, ENV, UserFactory, $http) {


    var storageKey = "activatedWords",
        countOfWords = 0,
        strategy = {

          selectLatest : function (list){
              var now = _.now(),
                  index = -1;
              for(var i = 0; i < list.length; i++){
                if(list[i].lastViewed === null){
                  return list[i]
                }
                if(now > list[i].lastViewed ){
                  now = list[i].lastViewed;
                  index = i;
                }
              }
              if(index !== -1){
                return list[index];
              }
             $log.warn("Something is wrong..");
            return null;
          },



        }


    function getNextWord( list ){
      if(!list) {
        list = loadWords();
      }
      if(list.length){
        var nextWord =  strategy.selectLatest( list );
        $log.info('Next word is [id='+nextWord.id+']');
        return nextWord;
      }
      return null;
    };

    function getCountOfWords(){
      return countOfWords;
    }


    function rateWord(list, word, rating){
      var index = _.findIndex(list, {'id' :word.id});
      if(index !== -1){
        list[index].isLearned = list[index].lastRating === 1 && rating === 1;
        list[index].viewed++;
        list[index].lastViewed = _.now();
        list[index].lastRating = rating;
        updateWord(list[index]);
        if(list[index].isLearned){
          removeLearnedWords( list );
        }
        $log.info('Updating word: ');
        $log.info(list[index]);
        saveList( list );
      }else{
        $log.error('Can not update rating. Word ['+word.id+'] was not found');
      }
    };


    function removeLearnedWords(list , index ){
        list.splice(index, 1);
    }


    function rateAndGetNextWord(word, rating){
      var list = loadWords();
      rateWord(list, word, rating);
      return getNextWord( list );
    };

    function clearWords(){
      DrilStorage.removeItem(storageKey);
    }


    function saveList(list){
      $log.info('Saving list: ' + list.length);
      DrilStorage.setItem(storageKey, list );
    }

    function loadWords(){
      $log.info('Loading activated words from storage.');
      var list = DrilStorage.getItem(storageKey);
      if(list === null){
        list = [
          { id : 1, question: 'question', answer : ' answer', viewed : 0, lastViewed : 1424210734010, lastRating : null, langQuestion: 'en', langAnswer: 'sk', isLearned : false },
          { id : 2, question: 'question 2', answer : ' answer 3', viewed : 0, lastViewed : 1424210734012, lastRating : null, langQuestion: 'en', langAnswer: 'sk', isLearned : false },
          { id : 12, question: 'question12', answer : ' answer12', viewed : 5, lastViewed : 1424210734960, lastRating : null, isLearned : false }
        ]
      }
      countOfWords = list.length;
      $log.info('Loaded activated words: ' + countOfWords);
      return list;
    }

    function getStatistics(){
      return {};
    }


    function addWord( word ){
      var list = loadWords();
      list.push(word);
      saveList(list);
      return countOfWords;
    }

    function removeWord( wordId ){
      var list = loadWords();
      _.remove(list, {'id' :wordId});
      console.log(list);
      saveList(list);
      return countOfWords;
    }

    function updateWord(word){
      var user = UserFactory.getUser();
      if(user !== null){
          $http.post(ENV.api+ '/user/rateWord',{
            id : word.id,
            lastRating : word.lastRating,
            isLearned : word.isLearned
          });
      }
    }

    return {
      saveList : saveList,
      clearWords: clearWords,
      getNextWord : getNextWord,
      rateAndGetNext : rateAndGetNextWord,
      getCountOfWords : getCountOfWords,
      getStatistics : getStatistics,
      addWord : addWord,
      removeWord : removeWord
    };
  }]);
