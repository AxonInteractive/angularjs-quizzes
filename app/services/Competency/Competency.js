( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Competency', [  

      function () {

        return function Competency( competency ) {

          var defaults = {

            // The competency's own key in the referernces map.
            key: '',

            // A name that the competency will be referred to as in-text.
            name: '',

            // A human-readable description of this competency.
            description: '',

            // A url to the full text of the competency for download.
            url: ''

          };

          return angular.merge( defaults, competency );

        };

      }
      
    ] );

} )();