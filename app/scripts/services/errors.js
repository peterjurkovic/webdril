'use strict';


angular.module('webdrilApp')
.provider( "$exceptionHandler",{
    $get: function( errorLogService ) {
      return( errorLogService );
    }
  }
).factory("errorLogService", function( $log, $window, ENV) {

    // I log the given error to the remote server.
    function log( exception, cause ) {

      // Pass off the error to the default error handler
      // on the AngualrJS logger. This will output the
      // error to the console (and let the application
      // keep running normally for the user).
      $log.error.apply( $log, arguments );

      return !f ? [] :
          st2(f.caller).concat([f.toString().split('(')[0].substring(9) + '(' + f.join(',') + ')']);
      }

      // Now, we need to try and log the error the server.
      // --
      // NOTE: In production, I have some debouncing
      // logic here to prevent the same client from
      // logging the same error over and over again! All
      // that would do is add noise to the log.
      try {

        // Log the JavaScript error to the server.
        // --
        // NOTE: In this demo, the POST URL doesn't
        // exists and will simply return a 404.
        console.log(st(exception));

      



        $.ajax({
          type: "POST",
          url: ENV.api + '/errors',
          contentType: "application/json",
          data: angular.toJson({
            errorUrl: $window.location.href,
            errorMessage: exception.toString(),
            stackTrace: JSON.stringify(exception),
            cause: ( cause || "" ),
            version : ENV.version
          })
        });

      } catch ( loggingError ) {

        // For Developers - log the log-failure.
        $log.warn( "Error logging failed" );
        $log.log( loggingError );

      }

    }
    return( log );

  }
);
