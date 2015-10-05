( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizScorecardQuestion', [ '$modal',
    function ( $modal ) {

      return {

        scope: {
          "question": "="
        },
        restrict: 'AE',
        templateUrl: 'directives/quizScorecardQuestion/quizScorecardQuestion.html',
        link: function ( $scope, $elem, $attrs ) {

          $scope.onButtonClicked = function() {
            $modal.open( {
                templateUrl: 'views/__Modals/QuizAnswerModal/QuizAnswerModal.html',
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
