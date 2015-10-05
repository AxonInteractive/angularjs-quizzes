( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizQuestion', [
    function () {

      return {

        scope: {
          'question': '=question'
        },
        restrict: 'AE',
        templateUrl: 'directives/quizQuestion/quizQuestion.html',
        link: function ( $scope, $elem, $attrs ) {

          // Directive code goes here
          // See http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/

          // Read in quiz type as attr (pretest, posttest or questionnaire)

       }

      };

  } ] );

} )();
