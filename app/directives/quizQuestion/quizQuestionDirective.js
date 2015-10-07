( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.directive( 'quizQuestion', [
    function () {

      return {

        scope: {
          'question': '='
        },
        restrict: 'AE',
        templateUrl: 'directives/quizQuestion/quizQuestion.html',
        link: function ( $scope, $elem, $attrs ) {

          // Nothing to do here.

       }

      };

  } ] );

} )();
