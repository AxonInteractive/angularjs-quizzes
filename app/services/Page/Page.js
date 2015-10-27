( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Page', [

      function () {

        return function Page( page ) {

          var defaults = {

            // A number to order this page within the module.
            number: 0,

            // A string identifying the type of content this page presents. There is no specific 
            // list of types other than what your stie needs for its particular implementation.
            type: '',

            // The name of the page in human-readable format.
            name: '',

            // The router state at which this page can be reached.
            state: '',

            // If this page has non-text content that requires transcription for the hearing 
            // impaired, this URL points to the transcript file that can be downloaded.
            transcriptUrl: '',

            // An action for the button on this page defining the page/state to navigate to (next 
            // and previous) and labels to put on these buttons to describe them.
            actions: {
              next: null,
              prev: null
            }

          };

          // Extend the defaults with the passed properties.
          return angular.merge( defaults, page );

        };

    } ] );

} )();
