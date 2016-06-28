( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizQuestion', [
      '$sce',
      function ( $sce ) {

        return {

          scope: {
            'question': '='
          },
          restrict: 'AE',
          templateUrl: '/directives/quizQuestion/quizQuestion.html',
          link: function ( $scope, $elem, $attrs ) {

            $scope.htmlText = $sce.trustAsHtml( $scope.question.text );
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
