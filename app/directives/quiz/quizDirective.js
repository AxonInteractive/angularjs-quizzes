( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quiz', [
      function () {

        return {

          scope: {
            'source': '=',
            'highlight': '&'
          },
          restrict: 'AE',
          templateUrl: 'directives/quiz/quiz.html',
          link: function ( $scope, $elem, $attrs ) {

            // Nothing to do here.
          }

        };

    } ] );

} )();
