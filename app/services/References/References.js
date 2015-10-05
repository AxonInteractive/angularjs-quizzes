( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.factory( 'References', [
    '$modal', 
    function ( $modal ) {

      return function References( referencesMap ) {

        // The base object to augment;
        var self = {};

        ///////////////////////////////
        /// Reference Details Modal //
        /////////////////////////////
        ///
        /// See the ReferenceModal directive for further details.
        /// 

        // Displays a modal that contains detailed information about the reference.
        self.showReferenceModal = function ( referenceKey ) {

          // Open a modal containing information about the clicked reference.
          $modal.open( {
            templateUrl: 'views/__Modals/ReferenceModal/ReferenceModal.html',
            controller: 'ReferenceModalController',
            resolve: {
              '$modalArgs': function () {
                return {
                  reference: self.getReference( referenceKey )
                };
              }
            }
          } );
        };

        //////////////////////
        /// References Map //
        ////////////////////
        ///
        /// The references object maps reference keys to reference objects. Each reference object 
        /// should conform to the following interface:
        /// {
        ///   key: ''         // The reference's own key in the referernces map.
        ///   name: ''        // A name that the reference will be referred to as in-text.
        ///   description: '' // The complete citation as is will appear in footnotes/endnotes.
        ///   url: ''         // An (optional) url to the full text of the reference for download.
        /// }
        /// 
        /// See the Reference factory for further details.
        ///
        /// Note: References should never change at runtime. They are to be considered as constants.
        ///

        var references = referencesMap || {};

        // Get or set the references map (typically called at application start)
        self.getReferences = function () {
          return references;
        };
        self.setReferences = function ( quizReferences ) {
          references = quizReferences;
        };

        // Get a particular reference by looking up its key.
        self.getReference = function ( referenceKey ) {
          if ( typeof( references ) !== 'object' ) {
            throw new Error( 'References data must be an object!.' );
          }
          return references[ referenceKey ];
        };

        //////////////
        // Exports //
        ////////////

        return self;

      };

    }
  ] );

} )();