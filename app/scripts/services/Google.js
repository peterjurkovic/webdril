'use strict';


angular.module('webdrilApp')
  .factory('Translate', ['$http', 'ENV', function ($http, ENV) {

    return {
      value: value
    };


    function value(text, source, target) {
      var url =
        'https://api.datamarket.azure.com/Bing/MicrosoftTranslator/v1/Translate?Text='+
        encodeURIComponent(text)+'To='+target+'&From='+source + '&appId';
      return $http.jsonp(url);
    }

  }]);
