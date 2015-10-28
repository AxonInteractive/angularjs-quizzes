( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizQuestion', [
      function () {

        return {

          scope: {
            'question': '=',
            'highlight': '&'
          },
          restrict: 'AE',
          templateUrl: 'directives/quizQuestion/quizQuestion.html',
          link: function ( $scope, $elem, $attrs ) {

            $scope.markAsIncomplete = function () {
              var showIncomplete = ( typeof( $scope.highlight ) === 'function' )
                ? $scope.highlight()
                : false;
              return !$scope.question.isAnswered() && showIncomplete;
            };
              
            console.log( $scope.highlight );
            console.log( $scope.highlight() );

         }

        };

    } ] );

} )();
