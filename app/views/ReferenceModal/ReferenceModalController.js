( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.controller( 'ReferenceModalController', [
    '$scope', '$modalInstance', '$modalArgs', '$window', 
    function ( $scope, $modalInstance, $modalArgs, $window ) {

      /////////////////////
      // Event Handlers //
      ///////////////////

      $scope.onDownloadPdfButtonClicked = function () {
        $window.open( $scope.reference.url );
      };

      $scope.onCloseButtonClicked = function() {
        $modalInstance.close();
      };

      /////////////////////
      // Initialization //
      ///////////////////

      ( function init() {
        
        // Place the title and message onto the $scope so they can be templated.
        $scope.reference = $modalArgs.reference;

      } )();

  } ] );

} )();
