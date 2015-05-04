
(function(window, angular, jQuery) {
  'use strict';

angular.module('webdrilApp')
.provider( '$exceptionHandler',{
    $get: function( errorLogService ) {
      return( errorLogService );
    }
  }
)
  .factory('errorLogService', function( $log, $window, ENV) {

    function log( exception, cause ) {
      $log.error.apply( $log, arguments );

      try {
        var trace = printStackTrace({e: exception}),
            user = $window.sessionStorage.getItem('loggedUser');
        if(user){
          user= JSON.parse(user);
        }
        jQuery.ajax({
          type: 'POST',
          url: ENV.api + '/errors',
          contentType: 'application/json',
          data: angular.toJson({
            errorUrl: $window.location.href,
            errorMessage: exception.toString(),
            stackTrace: trace.join('\n'),
            cause: ( cause || '' ),
            version : ENV.version,
            userId : user ? user.id : null
          })
        });

      } catch ( loggingError ) {
        $log.warn( 'Error logging failed' );
        $log.log( loggingError );

      }

    }
    return( log );

  }
);
})(window, window.angular, jQuery);
