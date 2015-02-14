'use strict';


var drilStorageModule = angular.module('drilStorageModule', []);

drilStorageModule.constant('storageSettings', {

    // Set a prefix that will be used for all storage data (defaults to the empty string.)
    // Use prefix() to modify this prefix.
    prefix: '',

    // Name of the event that will be broadcast via the $rootScope on errors.
    // Use errorName() to modify this value.
    errorName: 'drilStorage.error'
});

drilStorageModule.factory('drilStorage', [ '$rootScope', 'storageSettings',
    function ($rootScope, storageSettings) {


      /**
       * Boolean flag indicating client support for local storage.
       * @private
       */
      var isSupported = isLocalStorageSupported();


      /**
       * Test the client's support for storing values in the local store.
       *
       * @return {boolean} True if the client has support for the local store, else false.
       * @private
       */
      function isLocalStorageSupported(){
          try {
            localStorage.setItem( 'key-test', true);
            localStorage.removeItem( 'key-test');
            return true;
          } catch (e) {
            return false;
          }
      }

      /**
       * Broadcasts an error notification on thrown exceptions
       *
       * @param error
       * @returns {boolean}
       * @private
       */
      function triggerError(error){
          $rootScope.$broadcast(storageSettings.errorName, error.title + ': ' + error.message);
          return false;
      }


      /**
       * Add or update value under given key
       *
       * @param key - value will be saved under concatenated prefix and given key
       * @param value - value to store
       * @returns {boolean} - true on success, false otherwise
       * @public
       */
      function setItem(key, value){
        if(isSupported){
            try {
                localStorage.setItem(storageSettings.prefix + key, JSON.stringify(value));
                return true;
            } catch (e) {
              triggerError(e);
            }

          }
        return false;
      }


      /**
       * Retrieve value under given key
       *
       * @param key
       * @returns object or null if under the given key nothing exists
       */
      function getItem(key) {
        if (isSupported) {
          try {
            var value = localStorage.getItem(storageSettings.prefix + key);
            return value && JSON.parse(value);
          } catch (e) {
            triggerError(e);
          }
        }
        return null;
      }


      /**
       * Remove item under given key
       *
       * @param key
       * @returns true if was item successfully removed.
       */
      function removeItem(key) {
        if (isSupported) {
          try {
              localStorage.removeItem(storageSettings.prefix + key);
              return true;
          } catch (e) {
            croak(e);
          }
        }
        return false;
      }


      return {
        isSupported : isSupported,
        setItem : setItem,
        getItem : getItem,
        removeItem : removeItem
      }
}]);
