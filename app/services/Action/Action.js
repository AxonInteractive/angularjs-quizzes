( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Action', [

      function () {

        return function Action( state, label ) {

          return {

            // The router state this action should navigate to.
            state: state || '',

            // The label to place upon the button that renders this action.
            label: label || 'Next'

          };

        };

    } ] );

} )();
