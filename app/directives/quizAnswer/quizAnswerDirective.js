( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.directive( 'quizAnswer', [
    '$sce', 
    function ( $sce ) {

      return {

        scope: {
          question: '='
        },
        restrict: 'AE',
        templateUrl: 'directives/quizAnswer/quizAnswer.html',
        link: function ( $scope, $elem, $attrs ) {

          // Sanitize the commentary to produce working HTML.
          $scope.sanitizedCommentary = $sce.trustAsHtml( $scope.question.commentary );

        }

      };

  } ] );

} )();
