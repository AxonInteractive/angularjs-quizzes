( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizScorecardQuestion', [
      '$modal',
      function ( $modal ) {

        return {

          scope: {
            "question": "="
          },
          restrict: 'AE',
          templateUrl: '/directives/quizScorecardQuestion/quizScorecardQuestion.html',
          link: function ( $scope, $elem, $attrs ) {

            $scope.onButtonClicked = function () {
              $modal.open( {
                  templateUrl: 'views/QuizAnswerModal/QuizAnswerModal.html',
                  controller: 'QuizAnswerModalController',
                  resolve: {
                    '$modalArgs': function () {
                      return {
                        question: $scope.question
                      };
                    }
                  }
              } );
            };

          }

        };

    } ] );

} )();
