( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .controller( 'QuizAnswerModalController', [
      '$scope', '$modalInstance', '$modalArgs', 
      function ( $scope, $modalInstance, $modalArgs ) {

        /////////////////////
        // Event Handlers //
        ///////////////////

        $scope.onCloseButtonClicked = function () {
          $modalInstance.close();
        };

        /////////////////////
        // Initialization //
        ///////////////////

        ( function init() {

          if ( typeof $modalArgs === 'undefined' ) {
            $modalArgs = {};
          }

          $scope.question = $modalArgs.question;

        } )();

    } ] );

} )();
