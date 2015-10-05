( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.factory( 'QuizCompetencies', [

    function () {

      return function QuizCompetencies( map ) {

        // Yeah, this is definitely overkill, but I wanted to have this here in case we need to add
        // specialized behaviour later on.
        return map;

      };

  } ] );

} )();
