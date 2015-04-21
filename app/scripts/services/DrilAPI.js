'use strict';


angular.module('webdrilApp')
.factory('DrilAPI', ['$http', 'ENV', function ($http, ENV) {



  ///////////////////////////////////////////////

  function getAllLanguages(){
    return $http.get(ENV.api+ '/languages');
  }

  function getUserBookPage(params) {
      return $http.get(ENV.api+ '/user/books', params);
  }

  function getPage(params) {
    return $http.get(ENV.api+ '/books', params);
  }

  function loadFilterOptions(){
    return $http.get(ENV.api+ '/filter');
  }


  function getBookLectures(bookId){
    return $http.get(ENV.api+ '/book/' + bookId);
  }

  function getLecture(bookId, lectureId){
    return $http.get(ENV.api+ '/book/' + bookId +'/lecture/' + lectureId);
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

  function updateWordActivity( id , acitivy){
    return $http.post(ENV.api+ '/user/words/' + id +'/activate' , {activate : acitivy} );
  }

  function createAccount(user){
    return $http.post(ENV.api+ '/users' , user );
  }

  function rateWord(word){
    $http.post(ENV.api+ '/user/rateWord',{
      id : word.id,
      lastRating : word.lastRating,
      isLearned : word.isLearned
    }).success(function(res){
      console.log(res);
    });
  }

  return {
    getPage: getPage,
    loadFilterOptions :  loadFilterOptions,
    getBookLectures : getBookLectures,
    getLecture : getLecture,
    getUserBookPage : getUserBookPage,
    updateBook : updateBook,
    removeBook : removeBook,
    updateLecture : updateLecture,
    createLecture : createLecture,
    updateWord : updateWord,
    translate : translate,
    createWord : createWord,
    removeWord : removeWord,
    updateWordActivity : updateWordActivity,
    rateWord : rateWord,
    getAllLanguages : getAllLanguages,
    createAccount : createAccount

  };

}]);