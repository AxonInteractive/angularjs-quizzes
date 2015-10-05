( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.controller( 'KTPlanEditModalController', [
    '$scope', '$state', '$modalInstance', '$modalArgs', '$log', '$sanitize',
    function ( $scope, $state, $modalInstance, $modalArgs, $log, $sanitize ) {

      /////////////////////
      // Event Handlers //
      ///////////////////

      $scope.onOkayButtonClicked = function () {

        if ( typeof $modalArgs.onOkayButtonClicked !== 'function' ) {
          $modalInstance.close();
          return;
        }

        $modalArgs.onOkayButtonClicked( $modalInstance );

      };

      $scope.onCancelButtonClicked = function() {

        if ( typeof $modalArgs.onCancelButtonClicked !== 'function' ) {
          $modalInstance.close();
          return;
        }

        $modalArgs.onCancelButtonClicked( $modalInstance );

      };

      /////////////////////
      // Initialization //
      ///////////////////

      ( function init() {

        if ( typeof $modalArgs === 'undefined' ) {
          $modalArgs = {};
        }

        // Place the important stuff onto the scope.
        $scope.module = $modalArgs.module;
        $scope.competency = $modalArgs.competency;
        $scope.competencyNum = $modalArgs.competencyNum;

      } )();

  } ] );

} )();
