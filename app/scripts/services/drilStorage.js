'use strict';


var app = angular.module('webdrilApp');
app.constant('storageSettings', {

    // Set a prefix that will be used for all storage data (defaults to the empty string.)
    // Use prefix() to modify this prefix.
    prefix: '',

    // Name of the event that will be broadcast via the $rootScope on errors.
    // Use errorName() to modify this value.
    errorName: 'drilStorage.error'
});
app.factory('DrilStorage', [ '$rootScope', 'storageSettings', '$window',
    function ($rootScope, storageSettings, $window) {


      var LOCAL_STORAGE = 1,
          SESSION_STORAGE = 2;

      /**
       * Boolean flag indicating client support for local storage.
       * @private
       */
      var isLocalStorageSupported = isLocalStorageSupported();


      /**
       * Test the client's support for storing values in the local store.
       *
       * @return {boolean} True if the client has support for the local store, else false.
       * @private
       */
      function isLocalStorageSupported(){
          try {
            $window.localStorage.setItem( 'key-test', true);
            $window.localStorage.removeItem( 'key-test');
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
       * Add or update value  under given key in Local Storage
       *
       * @param key - value will be saved under concatenated prefix and given key
       * @param value - value to store
       * @returns {boolean} - true on success, false otherwise
       * @public
       */
      function setItem(key, value){
        return setItemIn(LOCAL_STORAGE, key, value);
      }


      /**
       * Add or update value  under given key in Session Storage
       *
       * @param key - value will be saved under concatenated prefix and given key
       * @param value - value to store
       * @returns {boolean} - true on success, false otherwise
       * @public
       */
      function setItemInSession(key, value){
        return setItemIn(SESSION_STORAGE, key, value);
      }


      /**
       * Retrieve value from Local Storage under given key
       *
       * @param key
       * @returns object or null if under the given key nothing exists
       */
      function getItem( key ) {
        return getItemFrom(LOCAL_STORAGE, key);
      }


      /**
       * Retrieve value from Session Storage under given key
       *
       * @param key
       * @returns object or null if under the given key nothing exists
       */
      function getItemFromSession( key) {
        return getItemFrom(SESSION_STORAGE, key);
      }


      /**
       * Remove item under given key
       *
       * @param key
       * @returns true if was item successfully removed.
       */
      function removeItem(key) {
        if (isLocalStorageSupported) {
          try {
              $window.localStorage.removeItem(getKey(key));
              return true;
          } catch (e) {
            croak(e);
          }
        }
        return false;
      }

      function setItemIn(storageType, key, value){
        if(isLocalStorageSupported){
          try {
            if(storageType === LOCAL_STORAGE){
              $window.localStorage.setItem( getKey(key), JSON.stringify(value));
            }else{
              $window.sessionStorage.setItem( getKey(key), JSON.stringify(value));
            }
            return true;
          } catch (e) {
            triggerError(e);
          }

        }
        return false;
      }

      function getItemFrom(storageType, key){
        if (isLocalStorageSupported) {
          try {
            if(storageType === LOCAL_STORAGE){
              var value = $window.localStorage.getItem( getKey(key) );
            }else{
              var value = $window.sessionStorage.getItem( getKey(key) );
            }
            return value && JSON.parse(value);
          } catch (e) {
            triggerError(e);
          }
        }
        return null;
      }

      function getKey(key){
        return storageSettings.prefix + key;
      }

      function clear(){
        $window.localStorage.clear();
        $window.sessionStorage.clear();
      }
      return {
        isSupported : isLocalStorageSupported,

        setItem : setItem,
        getItem : getItem,
        removeItem : removeItem,

        getItemFromSession : getItemFromSession,
        setItemInSession : setItemInSession,

        clear : clear
      }
}]);
