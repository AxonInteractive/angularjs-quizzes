( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Reference', [  

      function () {

        return function Reference( referenceKey, nameStr, descriptionStr, url ) {

          return {

            // The reference's own key in the referernces map.
            key: referenceKey || '',

            // A name that the reference will be referred to as in-text.
            name:  nameStr || '',

            // The complete citation as is will appear in footnotes/endnotes.
            description: descriptionStr || '',

            // A url to the full text of the reference for download.
            url: url || ''

          };

        };

      }
      
    ] );

} )();