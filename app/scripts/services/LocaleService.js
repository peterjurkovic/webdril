'use strict';


angular.module('webdrilApp')
  .service('LocaleService', ['$translate', 'LOCALES', 'UserFactory',
    function ($translate, LOCALES, UserFactory) {

      var setLocale = function (code) {
        $translate.use(code);
        UserFactory.setUserLocale( code );
      },

      getLocale = function () {
        var locale = UserFactory.getUserLocale();

        return locale;
      },

      getLocales = function () {
        return LOCALES;
      };
      return{
        setLocale : setLocale,
        getLocale : getLocale,
        getLocales : getLocales
      };
    }]);
