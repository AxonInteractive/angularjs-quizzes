( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizResults', [ '$injector',
    function ( $injector ) {

      return {

        scope: {
          'source': '@source'
        },
        restrict: 'AE',
        templateUrl: 'directives/quizResults/quizResults.html',
        link: function ( $scope, $elem, $attrs ) {

          // Directive code goes here
          // See http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/

          // Read in quiz type as attr (pretest, posttest or questionnaire)

          var data = $injector.get( $scope.source );

          $scope.data = data;

          $scope.questions = data.questions;

        }

      };

  } ] );

} )();
