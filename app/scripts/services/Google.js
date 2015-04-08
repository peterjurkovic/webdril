'use strict';


angular.module('webdrilApp')
  .factory('Google', ['$http', 'ENV', function ($http, ENV) {

    return {
      translate: translate
    };


    function translate(text, source, target) {
      var url =
        'https://www.googleapis.com/language/translate/v2?key='+ENV.gtKey+
        '&source='+source+'&target='+target+'&q='+text;
      return $http.jsonp(url).success(function(data){
          console.log(data);
      });
    }

  }]);
