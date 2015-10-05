///////////////////////////////////////////////////////////////////////////////////////////////////
// app.js /////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Axon Quiz Module
//
// Written by Jeff Rose of Axon Interactive
//
// Description
// -----------
// This module provides a series of directives, services and modals that can be used to rapidly 
// develop quizzes for deployment on educational websites or websites making us of some kind of
// knowledge translation (KT) component.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Initialize the AngularJS module as app
( function () {

  'use strict';

  // Define the module and its dependencies ///////////////////////////////////////////////////////
  var app = angular.module( 'peir-client', [
    'angular-progress-arc', 
    'axon-utilities',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router'
  ] );


  // Default progress-arc appearance //////////////////////////////////////////////////////////////
  app.config( [
    'progressArcDefaultsProvider',
    function ( progressArcDefaultsProvider ) {

      progressArcDefaultsProvider
        .setDefault( 'background', '#EEE' )
        .setDefault( 'counterClockwise', false )
        .setDefault( 'size', 90 );

    }
  ] );

} )();