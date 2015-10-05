module.exports = function ( grunt ) {

  'use strict';

  ///////////////////
  /// Load Tasks ///
  /////////////////

  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch'  );

  ////////////////////////
  /// Configure Tasks ///
  //////////////////////

  grunt.initConfig( {

    // Read the package.json intp pkg.
    pkg: grunt.file.readJSON( 'package.json' ),

    'concat': {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
      },
      css: {
        src: [ 'app/**/*.css' ],
        dest: 'build/<%= pkg.name %>.css'
      },
      js: {
        src: [ 'app/**/*.js', '!app/**/*Test.js' ],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    'cssmin': {
      options: {
        keepSpecialComments: false
      },
      css: {
        src: [ 'build/<%= pkg.name %>.css' ],
        dest: 'build/<%= pkg.name %>.min.css'
      }
    },

    'jshint': {
      files: [ 'gruntfile.js', 'app/**/*.js' ]
    },

    'uglify': {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + 
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
        report: 'min',
        mangle: false
      },
      js: {
        files: {
          'build/<%= pkg.name %>.min.js': [ 'build/<%= pkg.name %>.js' ]
        }
      }
    },

    'watch': {
      files: [ '<%= jshint.files %>', 'app/**/*.css' ],
      tasks: [ 'build' ]
    }

  } );

  /////////////////////////////
  /// CLI Task Definitions ///
  ///////////////////////////

  grunt.registerTask( 'build', [ 'jshint', 'concat' ] );

  grunt.registerTask( 'minify', [ 'build', 'cssmin', 'uglify' ] );

  grunt.registerTask( 'default', [ 'build', 'watch' ] );

};