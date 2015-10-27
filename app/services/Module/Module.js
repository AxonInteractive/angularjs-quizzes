( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Module', [

      function () {

        return function Module( module ) {

          var defaults = {

            // The name of the module in human-readable format.
            name: '',

            // The 1-indexed number of the module.
            number: 0,

            // The identifier used in code (typically in router states refrencing module pages.
            key: '',

            // A list of competencies this module relates to.
            competencies: [],

            // The list of pages that belong to this module.
            pages: []

          };

          // Extend the defaults with the passed properties.
          return angular.extend( defaults, module );

        };

    } ] );

} )();
