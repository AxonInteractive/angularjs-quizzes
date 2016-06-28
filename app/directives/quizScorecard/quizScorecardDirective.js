( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizScorecard', [
      'Scorecard',
      function ( Scorecard ) {

        return {

          scope: {
            "beforeSource": "=",
            "afterSource": "=",
            "modulesSource": "="
          },
          restrict: 'AE',
          templateUrl: '/directives/quizScorecard/quizScorecard.html',
          link: function ( $scope, $elem, $attrs ) {

            ///////////////////////
            // Helper Functions //
            /////////////////////

            // Returns a func that, when called, will yield the requested property from the provided
            // source object. This is weird as hell, and I'm only using it to get
            // angular-progress-arc to behave, since internall it CALLS the complete attribute passed
            // to it as a function, and I'm grasping at straws as to how to make that work nicely.
            $scope.getFn = function ( src ) {
              //console.log( src );
              return function () {
                return src;
              };
            };

            /////////////////////
            // Initialization //
            ///////////////////

            $scope.isSingleSource = !$scope.afterSource;

            var scorecard = Scorecard(
              $scope.modulesSource,
              $scope.beforeSource,
              $scope.afterSource
            );
            angular.extend( $scope, scorecard );

          }

        };

    } ] );

} )();
