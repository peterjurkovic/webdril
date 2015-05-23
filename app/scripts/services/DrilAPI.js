'use strict';


angular.module('webdrilApp')
.factory('DrilAPI', ['$http', 'ENV', function ($http, ENV) {



  ///////////////////////////////////////////////

  function getAllLanguages(){
    return $http.get(ENV.api+ '/languages');
  }

  function getPage(params, user) {
    return $http.get(ENV.api+ (user ? '/user' : '') + '/books', {params : params });
  }

  function loadFilterOptions(){
    return $http.get(ENV.api+ '/filter');
  }


  function getBookLectures(bookId){
    return $http.get(ENV.api+ '/book/' + bookId);
  }

  function getLecture(bookId, lectureId, auth){
    return $http.get(ENV.api+ (auth ? '/user' : '')+ '/book/' + bookId +'/lecture/' + lectureId);
  }

  function createBook(book){
    return $http.post(ENV.api+ '/books', book);
  }

  function updateBook(book){
    return $http.put(ENV.api+ '/book/' + book.id  , book);
  }

  function updateLecture(lecture){
    return $http.put(ENV.api+ '/lectures', lecture );
  }

  function createLecture(lecture){
    return $http.post(ENV.api+ '/lectures'  , lecture);
  }

  function removeBook(book){
    return $http.delete(ENV.api+ '/book/' + book.id );
  }

  function updateWord(word){
      return $http.post(ENV.api+ '/user/words', word );
  }

  function createWord(word){
    return $http.put(ENV.api+ '/user/words', word );
  }

  function removeWord( id ){
    return $http.delete(ENV.api+ '/user/words/' + id );
  }

  function translate(text, from, to){
    var params = '?text='+encodeURIComponent(text) +
      '&from='+from+'&to='+to;
    return $http.get(ENV.api+ '/translate' + params);
  }

  function createAccount(user){
    return $http.post(ENV.api+ '/users' , user );
  }

  function updateAccount(user){
    return $http.put(ENV.api+ '/users' , user );
  }

  function rateWord(word){
    $http.post(ENV.api+ '/user/rateWord',{
      id : word.id,
      lastRating : word.lastRating,
      isLearned : word.isLearned
    })
  }

  function loadWords(){
    return $http.get(ENV.api+ '/words');
  }

  function getStats(withSessions){
    return $http.get(ENV.api+ '/stats', {withSession : withSessions });
  }

  function toggleActivation(params){
    return $http.post(ENV.api+ '/user/toggleActivation', params);
  }

  function deleteLecture(id, wordsOnly){
    return $http.delete(ENV.api+ '/user/lectures/'+id);
  }
  return {
    getPage: getPage,
    loadFilterOptions :  loadFilterOptions,
    getBookLectures : getBookLectures,
    getLecture : getLecture,
    createBook : createBook,
    updateBook : updateBook,
    removeBook : removeBook,
    updateLecture : updateLecture,
    createLecture : createLecture,
    deleteLecture : deleteLecture,
    updateWord : updateWord,
    translate : translate,
    createWord : createWord,
    removeWord : removeWord,
    rateWord : rateWord,
    getAllLanguages : getAllLanguages,
    createAccount : createAccount,
    updateAccount : updateAccount,
    loadWords : loadWords,
    getStats : getStats,
    toggleActivation : toggleActivation
  };

}]);
