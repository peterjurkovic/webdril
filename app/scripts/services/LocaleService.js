'use strict';


angular.module('webdrilApp')
  .service('LocaleService', ['$translate', 'LOCALES', '$rootScope',
    function ($translate, LOCALES, $rootScope) {

      var currentLocale = $translate.use(),

      setLocale = function (code) {
        currentLocale = code;
        $translate.use(code);
      },

      getLocale = function () {
        return currentLocale;
      },

      getLocales = function () {
        return LOCALES;
      };
      return{
        setLocale : setLocale,
        getLocale : getLocale,
        getLocales : getLocales
      }
    }]);
