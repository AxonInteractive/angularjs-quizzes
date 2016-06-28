( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quiz', [
      function () {

        return {

          scope: {
            'source': '='
          },
          restrict: 'AE',
          templateUrl: '/directives/quiz/quiz.html',
          link: function ( $scope, $elem, $attrs ) {


            
          }

        };

    } ] );

} )();
