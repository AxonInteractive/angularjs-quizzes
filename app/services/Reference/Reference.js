( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.factory( 'Reference', [ function () {

      return function Reference( referenceKey, nameStr, descriptionStr, url ) {

        return {
          key:         referenceKey   || '',
          name:        nameStr        || '',
          description: descriptionStr || '',
          url:         url            || ''
        };

      };

    }
  ] );

} )();