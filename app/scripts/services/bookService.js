'use strict';


angular.module('webdrilApp')
.factory('BookService', ['$http', 'ENV', function ($http, ENV) {

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
    translate : translate
  };

  ///////////////////////////////////////////////

  function getUserBookPage(params) {
      return $http({
        url: ENV.api+ '/user/books',
        method: "GET",
        params : params
      });
  }

  function getPage(params) {
    return $http({
      url: ENV.api+ '/books',
      method: "GET",
      params : params
    });
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

    function translate(text, from, to){
      var params = '?text='+encodeURIComponent(text) + '&from='+from+'&to='+to;
      return $http.get(ENV.api+ '/translate' + params);
    }

}]);
