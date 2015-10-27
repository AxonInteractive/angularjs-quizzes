( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Action', [

      function () {

        return function Action( action ) {

          var defaults = {

            // The URL this action should navigate to (if any).
            href: '',

            // The router state this action should navigate to (if any).
            sref: '',

            // The label to place upon the button that renders this action.
            label: 'Next'

          };

          // Extend the defaults with the passed properties.
          return angular.merge( defaults, action );

        };

    } ] );

} )();
