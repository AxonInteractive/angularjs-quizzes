( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizScorecard', [ '$injector', 'QuizScorecard',
    function ( $injector, QuizScorecard ) {

      return {

        scope: {
          "beforeSource": "@",
          "afterSource": "@",
          "modulesSource": "@"
        },
        restrict: 'AE',
        templateUrl: 'directives/quizScorecard/quizScorecard.html',
        link: function ( $scope, $elem, $attrs ) {

          ///////////////////////
          // Helper Functions //
          /////////////////////

          // Returns a func that, when called, will yield the requested property from the provided
          // source object. This is weird as hell, and I'm only using it to get
          // angular-progress-arc to behave, since internall it CALLS the complete attribute passed
          // to it as a function, and I'm grasping at straws as to how to make that work nicely.
          $scope.getFn = function ( src ) {
            console.log( src );
            return function () {
              return src;
            };
          };

          /////////////////////
          // Initialization //
          ///////////////////

          var $beforeData = $injector.get( $scope.beforeSource );
          var $moduleData = $injector.get( $scope.modulesSource );
          var $afterData;

          if ( typeof $scope.afterSource === 'string' ) {
            $afterData = $injector.get( $scope.afterSource );
            $scope.isSingleSource = false;
          }
          else {
            $scope.isSIngleSource = true;
          }

          var scorecard = new QuizScorecard( $moduleData, $beforeData, $afterData );

          angular.extend( $scope, scorecard );

        }

      };

  } ] );

} )();
