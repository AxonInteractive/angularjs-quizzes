( function () {

  'use strict';

  var gulp       = require( 'gulp'             );
  var concat     = require( 'gulp-concat'      );
  var connect    = require( 'gulp-connect'     );
  var jshint     = require( 'gulp-jshint'      );
  var mincss     = require( 'gulp-minify-css'  );
  var ngAnnotate = require( 'gulp-ng-annotate' );
  var rimraf     = require( 'gulp-rimraf'      );
  var uglify     = require( 'gulp-uglify'      );
  var sourceMaps = require( 'gulp-sourcemaps'  );


  ///////////////////////
  // Notable Commands //
  /////////////////////

  // > gulp
  // Builds production library files and watches for changes in the source files, rebuilding each
  // time a change is detected.
  gulp.task( 'default', [ 'build', 'serve', 'watch' ] );

  // > gulp build
  // Outputs the build and production folders from the app source files.
  gulp.task( 'build', [ 'lint', 'fonts', 'views', 'css', 'cssmaps', 'js', 'js404' ] );


  ///////////////////////
  // Task Definitions //
  // //////////////////

  // Concatenate all of our app's JS files.
  gulp.task( 'js', function () {
    return gulp.src( [
        // This is a specific order -- don't change
        //'./bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
        //'./non_bower_components/google-analytics/ga.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-animate/angular-animate.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './non_bower_components/angular-progress-arc/angular-progress-arc.js',
        './bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/bridge-client/lib/BridgeClient.js',
        './bower_components/bridge-client/lib/plugins/AngularJS.js',
        '!./app/**/*Test.js',
        '!./app/404.js',
        './app/app.js',
        './app/directives/**/*.js',
        './app/filters/**/*.js',
        './app/services/**/*.js',
        './app/views/**/*.js'
      ] )
      .pipe( sourceMaps.init() )
      .pipe( concat( 'app.js' ) )
      .pipe( sourceMaps.write() )
      .pipe( gulp.dest( './build/js' ) )
      .pipe( ngAnnotate() )
      .pipe( uglify( {
        mangle: false // Don't shorten variable names -- this screws with angular badly
      } ) )
      .pipe( gulp.dest( './production/js' ) );
  } );

  // Concatenate the 404 page JS files.
  gulp.task( 'js404', function () {
    return gulp.src( [
        // This is a specific order -- don't change
        './bower_components/jquery/dist/jquery.js',
        './app/404.js'
      ] )
      .pipe( sourceMaps.init() )
      .pipe( concat( '404.js' ) )
      .pipe( sourceMaps.write() )
      .pipe( gulp.dest( './build/js' ) )
      .pipe( uglify( {
        mangle: false // Don't shorten variable names
      } ) )
      .pipe( gulp.dest( './production/js' ) );
  } );

  gulp.task( 'testJs', function() {
    return gulp.src( [
      // This is a specific order -- don't change
      //'./bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
      //'./non_bower_components/google-analytics/ga.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-input-match/dist/angular-input-match.js',
      './bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
      './bower_components/angular-ui-router/release/angular-ui-router.js',
      './bower_components/bridge-client/lib/BridgeClient.js',
      './bower_components/bridge-client/lib/plugins/AngularJS.js',
      '!./app/**/*Test.js',
      './app/**/*.js'
    ] )
    .pipe( sourceMaps.init() )
    .pipe( concat( 'app.js' ) )
    .pipe( sourceMaps.write() )
    .pipe( gulp.dest( './build/js' ) );
  } );

  // Concatenate all of our app's CSS files.
  gulp.task( 'css', function () {
    return gulp.src( [
        // This is a specific order -- don't change
        // Don't need normalize.css since we're using Bootstrap
        './bower_components/bootstrap-css-only/css/bootstrap.css',
        './bower_components/bootstrap-css-only/css/bootstrap-theme.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './non_bower_components/unicons/css/unicons.css',
        './app/app.css'
      ] )
      .pipe( concat( 'app.css' ) )
      .pipe( gulp.dest( './build/css' ) )
      .pipe( mincss() )
      .pipe( gulp.dest( './production/css' ) );
  } );

  // Concatenate all css maps into the appropriate folders.
  gulp.task( 'cssmaps', function () {
    return gulp.src( [
        './bower_components/bootstrap-css-only/css/*.css.map'
      ] )
      .pipe( gulp.dest( './build/css' ) )
      .pipe( gulp.dest( './production/css' ) );
  } );

  // Copy all fonts into the appropriate folders.
  gulp.task( 'fonts', function () {
    return gulp.src( [
      './bower_components/bootstrap-css-only/fonts/*',
      './bower_components/font-awesome/fonts/*',
      './non_bower_components/unicons/fonts/*'
    ] )
    .pipe( gulp.dest( './build/fonts' ) )
    .pipe( gulp.dest( './production/fonts' ) );
  } );

  // Copy all views into the appropriate folders.
  gulp.task( 'views', function () {
    return gulp.src( [
      './app/humans.txt',
      './app/robots.txt',
      './app/favicon.ico',
      './app/**/*.html'
    ] )
      .pipe( gulp.dest( './build' ) )
      .pipe( gulp.dest( './production' ) );
  } );

  // Watch for changes to files on disk and respond by re-running tasks.
  gulp.task( 'watch', function () {
    gulp.watch( [ './app/*.js', './app/**/*.js', '!./app/**/*Test.js' ], [ 'js', 'reload' ] );
    gulp.watch( [ './app/**/*.css' ], [ 'css', 'cssmaps', 'reload' ] );
    gulp.watch( [ './app/**/*.html' ], [ 'views', 'reload' ] );
  } );

  // Run the livereload server to make the site available in the browser.
  gulp.task( 'serve', function () {
    connect.server( {
      root: [ './build' ],
      port: 9000,
      livereload: true
    } );
  } );

  // Reload the server.
  gulp.task( 'reload', function () {
    connect.reload();
  } );

  // Run jshint to check for any glaring errors in the JS.
  gulp.task( 'lint', function () {
    return gulp.src( [
      './app/**/*.js'
    ] )
    .pipe( jshint() );
  } );

  // Clean out the build and production folders and delete them.
  gulp.task( 'clean', function () {
    return gulp.src( [
      './build**/*',
      './production**/*'
    ], {
      read: false
    } )
    .pipe( rimraf() );
  } );

} )();
