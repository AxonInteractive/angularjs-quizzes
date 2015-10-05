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
  angular.module( 'axon-quizzes', [
    'angular-progress-arc', 
    'axon-utilities',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router'
  ] );

} )();