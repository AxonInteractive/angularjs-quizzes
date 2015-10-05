( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'peirSubmissionHistory', [
    '$peirBridge',
    function ( $peirBridge ) {

      return {
        scope: {
          route: '@',
          results: '@',
          gradeQuiz: '='
        },
        restrict: 'AE',
        replace: true,
        templateUrl: 'directives/peirSubmissionHistory/peirSubmissionHistory.html',
        transclude: true,
        link: function ( $scope ) {

          ///////////////////////
          // Helper Functions //
          /////////////////////

          function getData () {

            var user = $peirBridge.getUser();

            if ( angular.isDefined( $scope.results ) ) {

              $scope.results = parseInt( $scope.results );

              if ( isNaN( $scope.results ) ) {
                $scope.errorPhrasing.error = 'Directive error. Please report this error to the site administrator. Maximum results was not a number.';
                $scope.dirState = 'error';
                return;
              }
            }

            var filters = {
              email: user.email,
              deleted: false,
              maxResults: $scope.results || undefined,
              sorts: [ {
                predicate: 'date',
                order: 'ASC'
              } ]
            };

            requestObj.get( filters )
            .then( function( data ) {

              if ( angular.isUndefined( data ) ) {
                throw { message: 'Unexpected result from the server. Please report this error to the site administrator.' };
              }

              if ( angular.isString( data.message ) ) {
                $scope.dirState = 'no-results';
                $scope.$apply();
                return;
              }

              if ( !angular.isArray( data ) ) {
                throw { message: 'Unexpected result from the server. Please report this error to the site administrator.' };
              }

              $scope.submissions = [];

              for( var i = 0; i < data.length; i += 1 ) {

                var submission = {
                  date: new Date( data[ i ].time + " GMT -0000" )
                };

                if ( $scope.displayScore ) {
                  submission.score = $scope.gradeQuiz.getScoreFromAnswers( data[ i ].answers );
                }

                $scope.submissions.push( submission );
              }

              $scope.dirState = 'display';
              $scope.$apply();

            } )
            .catch( function( error ) {
              $scope.errorPhrasing.error = error.message;
              $scope.dirState = 'error';
              $scope.$apply();
            } );

          }

          /////////////////////
          // Initialization //
          ///////////////////
          
          // This stores the object passed in the route attribute that is used to get submissions.
          var requestObj = null;

          ( function init() {

            // Initialize the state of the controller to 'loading'.
            $scope.dirState = 'loading';

            // Test setting up a custom phrasing.
            $scope.errorPhrasing = {
              noun: 'your submission history for this exercise',
              verb: 'list out',
              verbPresent: 'listing out'
            };

            // Read in the route and make sure it's a valid route in the PEIR API.
            // Note: MAKE SUER THIS IS DONE BEFORE CALLING getData()!
            requestObj = $peirBridge[ $scope.route ];
            if ( !angular.isObject ( requestObj ) ) {
              $scope.errorPhrasing.error = 'Directive error. Please report this error to the site administrator. Could not find route for submission history.';
              $scope.dirState = 'error';
              return;
            }
            $scope.displayScore = angular.isDefined( $scope.gradeQuiz );

            // If the score is going to be displayed, use the quiz's maxScore as the maximum score 
            // that the fetched submissions' scores are graded out of.
            if ( $scope.displayScore ) {
              $scope.maxScore = $scope.gradeQuiz.maxScore;
            }

            // Fetch data to display now, or whenever the resume event is signaled (if it isn't 
            // available yet).
            if ( !angular.isObject( $peirBridge.getUser() ) ) {
              $scope.$on( 'resume', function() {
                getData();
              } );
            } else {
              getData();
            }

          } )();
        }
      };

    }
  ] );
} )();
