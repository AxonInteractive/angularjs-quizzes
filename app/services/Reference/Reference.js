( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Reference', [  

      function () {

        return function Reference( reference ) {

          var defaults = {

            // The reference's own key in the referernces map.
            key: '',

            // A name that the reference will be referred to as in-text.
            name: '',

            // The complete citation as is will appear in footnotes/endnotes.
            description: '',

            // A url to the full text of the reference for download.
            url: ''

          };

          return angular.merge( defaults, reference );

        };

      }
      
    ] );

} )();