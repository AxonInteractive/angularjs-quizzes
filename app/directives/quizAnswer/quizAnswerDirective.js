( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizAnswer', [
    '$sce', '$modal', '$peirReferencesData', 
    function ( $sce, $modal, $peirReferencesData ) {

      return {

        scope: {
          question: '=question'
        },
        restrict: 'AE',
        templateUrl: 'directives/quizAnswer/quizAnswer.html',
        link: function ( $scope, $elem, $attrs ) {

          /////////////////////
          // Event Handlers //
          ///////////////////

          $scope.onReferenceClicked = function ( event, referenceKey ) {
            event.preventDefault();
            $peirReferencesData.showReferenceModal( referenceKey );
          };

          /////////////////////
          // Initialization //
          ///////////////////
          
          ( function init () {

            // Sanitize the commentary to produce working HTML.
            $scope.sanitizedCommentary = $sce.trustAsHtml( $scope.question.commentary );

          } )();

        }

      };

  } ] );

} )();
