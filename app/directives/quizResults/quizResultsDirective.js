( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizResults', [ 
      function () {

        return {

          scope: {
            'source': '='
          },
          restrict: 'AE',
          templateUrl: 'directives/quizResults/quizResults.html',
          link: function ( $scope, $elem, $attrs ) {

            // Nothing to do here.

          }

        };

    } ] );

} )();
