( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizAnswer', [
      '$sce',
      function ( $sce ) {

        return {

          scope: {
            question: '='
          },
          restrict: 'AE',
          templateUrl: '/directives/quizAnswer/quizAnswer.html',
          link: function ( $scope, $elem, $attrs ) {

            $scope.htmlText = $sce.trustAsHtml( $scope.question.text );
            $scope.htmlAnswer = $sce.trustAsHtml( $scope.question.getFormattedAnswer() );
            $scope.htmlCorrectAnswer = $sce.trustAsHtml( $scope.question.getFormattedCorrectAnswer() );
            $scope.htmlCommentary = $sce.trustAsHtml( $scope.question.commentary );
            $scope.htmlChoices =
              $scope
                .question
                .choices
                .map( function ( choice ) {
                  return $sce.trustAsHtml( choice );
                } );
            $scope.htmlFormattedChoices =
              $scope
                .question
                .choices
                .map( function ( choice, i ) {
                  return $sce.trustAsHtml( $scope.question.getFormattedChoice( i ) );
                } );

          }

        };

    } ] );

} )();
