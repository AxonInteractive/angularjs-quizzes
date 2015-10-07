( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Competency', [  

      function () {

        return function Competency( competencyKey, nameStr, descriptionStr, url ) {

          return {

            // The competency's own key in the referernces map.
            key: competencyKey || '',

            // A name that the competency will be referred to as in-text.
            name: nameStr || '',

            // A human-readable description of this competency.
            description: descriptionStr || '',

            // A url to the full text of the competency for download.
            url: url || ''

          };

        };

      }
      
    ] );

} )();