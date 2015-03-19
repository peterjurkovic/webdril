'use strict';


angular.module('webdrilApp')
.factory('BookService', ['$http', 'ENV', function ($http, ENV) {

  return {
    getPage: getPage,
    loadFilterOptions :  loadFilterOptions,
    getBookLectures : getBookLectures,
    getLecture : getLecture
  };

  ///////////////////////////////////////////////

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

}]);
