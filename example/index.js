( function () {

  'use strict';

  // Define the module and its dependencies.
  var app = angular.module( 'axon-quizzes-test', [
    'axon-angularjs-quizzes'
  ] );

  // Add some routes.
  app.config( [
    '$stateProvider', '$urlRouterProvider', 
    function ( $stateProvider, $urlRouterProvider ) {

      $urlRouterProvider.otherwise( '/' );

      $stateProvider.state( {
        name: 'root',
        url: '/',
        templateUrl: 'test.html',
        controller: [ 
          '$scope', '$testQuiz', '$testModules', 
          function ( $scope, $testQuiz, $testModules ) {

            $scope.testVal = 'Test message to see if the basics are working!';

            // Put the $testQuiz and $testModules factories on the $scope so we can pass them to 
            // the directives that need them.
            $scope.testQuiz = $testQuiz;
            $scope.testModules = $testModules;

            // Answer the questions and grade the quiz.
            $testQuiz.questions[ 0 ].answer = 0;
            $testQuiz.questions[ 0 ].answer = 1;
            $testQuiz.grade();

          } 
        ]
      } );

    } 

  ] );

  // Configure the progress arc defaults.
  app.config( [
    'progressArcDefaultsProvider',
    function ( progressArcDefaultsProvider ) {

      progressArcDefaultsProvider
        .setDefault( 'background', '#EEE' )
        .setDefault( 'counterClockwise', false )
        .setDefault( 'size', 90 );

    }
    
  ] );

  app.factory( '$testCompetencies', [
    'Competency',
    function ( Competency ) {

      return {
        "1": Competency( {
          key: "1", 
          name: "1", 
          description: "Competency 1" 
        } ),
        "2": Competency( {
          key: "2", 
          name: "2", 
          description: "Competency 2" 
        } )
      };

    }

  ] );

  app.factory( '$testQuiz', [
    'Quiz', 'Question', '$testCompetencies', 
    function ( Quiz, Question, $testCompetencies ) {

      return Quiz( {
        name: 'Test Quiz',
        maxScore: 2,
        score: null,
        questions: [
          Question( {
            number: 1,
            type: 'choiceLiteral',
            value: 1,
            text: 'Test question 1.',
            choices: [ 'True', 'False' ],
            correctAnswer: 1,
            answer: null,
            correct: null,
            commentary: 'Well that went badly...',
            competency: $testCompetencies[ "1" ]
          } ),
          Question( {
            number: 2,
            type: 'choiceLiteral',
            value: 1,
            text: 'Test question 2.',
            choices: [ 'True', 'False' ],
            correctAnswer: 0,
            answer: null,
            correct: null,
            commentary: 'Well that went badly...',
            competency: $testCompetencies[ "2" ]
          } )
        ]
      } );

    }
  ] );

  app.factory( '$testModules', [
    'Module', 'Page', 'Action', '$testCompetencies', 
    function ( Module, Page, Action, $testCompetencies ) {

      return [
        Module( {
          name: 'Module 1',
          number: 1,
          key: 'module-1',
          competencies: [ 
            $testCompetencies[ "1" ] 
          ],
          pages: [
            Page( {
              number: 0,
              type: 'default',
              name: 'Page 1',
              state: '/',
              transcriptUrl: '',
              actions: {
                next: Action( '/', 'Next' ),
                prev: Action( '/', 'Prev' )
              }
            } ), 
            Page( {
              number: 1,
              type: 'default',
              name: 'Page 2',
              state: '/',
              transcriptUrl: '',
              actions: {
                next: Action( '/', 'Next' ),
                prev: Action( '/', 'Prev' )
              }
            } )
          ]
        } ),
        Module( {
          name: 'Module 2',
          number: 2,
          key: 'module-2',
          competencies: [ 
            $testCompetencies[ "2" ] 
          ],
          pages: [
            Page( {
              number: 0,
              type: 'default',
              name: 'Page 1',
              state: '/',
              transcriptUrl: '',
              actions: {
                next: Action( '/', 'Next' ),
                prev: Action( '/', 'Prev' )
              }
            } ), 
            Page( {
              number: 1,
              type: 'default',
              name: 'Page 2',
              state: '/',
              transcriptUrl: '',
              actions: {
                next: Action( '/', 'Next' ),
                prev: Action( '/', 'Prev' )
              }
            } )
          ]
        } )
      ];

    }
  ] );

} )();