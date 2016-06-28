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

            // Wait for a bit, then do stuff.
            // "Answer" the questions.
            $scope.testQuiz.questions[ 0 ].answer = 0;
            //$scope.testQuiz.questions[ 1 ].answer = 0;

            // Merge in answers "from the server" after grading is done.
            angular.merge( $scope.testQuiz, {
              questions: [
                {
                  commentary: '<p>Yay!</p>',
                  correctAnswer: 0,
                  isCorrect: true
                },
                {
                  commentary: '<h2>Well that went badly...</h2>',
                  correctAnswer: 1,
                  isCorrect: false
                },
                {
                  commentary: '<h3>WORDS</h3>'
                }
              ]
            } );

            $scope.highlight = function ( question ) {
              return !question.isAnswered();
            };

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

      function isHighlighted ( quiz, question ) {
        return !question.isAnswered();
      }

      return Quiz( {
        name: 'Test Quiz',
        maxScore: 2,
        score: null,
        questions: [
          Question( {
            key: 0,
            number: 1,
            type: 'choiceLiteral',
            value: 1,
            text: '<strong>Test question 1.</strong>',
            choices: [ '<em>True</em>', '<strong>False</strong>' ],
            competency: $testCompetencies[ "1" ],
            isHighlighted: isHighlighted
          } ),
          Question( {
            key: 1,
            number: 2,
            type: 'choice',
            value: 1,
            text: '<em>Test question 2.</em>',
            choices: [ '<strong>True</strong>', '<em>False</em>' ],
            competency: $testCompetencies[ "2" ],
            isHighlighted: isHighlighted
          } ),
          Question( {
            key: 2,
            number: 3,
            type: 'text',
            value: 0,
            text: '<h4>Test question 3.</h4>',
            choices: [],
            competency: $testCompetencies[ "2" ],
            isHidden: function ( quiz ) {
              return !quiz.questions[ 1 ].isAnswered();
            },
            isHighlighted: isHighlighted
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
                next: Action( {
                  sref: '/',
                  label: 'Next'
                } ),
                prev: Action( {
                  sref: '/',
                  label: 'Prev'
                } )
              }
            } ),
            Page( {
              number: 1,
              type: 'default',
              name: 'Page 2',
              state: '/',
              transcriptUrl: '',
              actions: {
                next: Action( {
                  sref: '/',
                  label: 'Next'
                } ),
                prev: Action( {
                  sref: '/',
                  label: 'Prev'
                } )
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
                next: Action( {
                  sref: '/',
                  label: 'Next'
                } ),
                prev: Action( {
                  sref: '/',
                  label: 'Prev'
                } )
              }
            } ),
            Page( {
              number: 1,
              type: 'default',
              name: 'Page 2',
              state: '/',
              transcriptUrl: '',
              actions: {
                next: Action( {
                  sref: '/',
                  label: 'Next'
                } ),
                prev: Action( {
                  sref: '/',
                  label: 'Prev'
                } )
              }
            } )
          ]
        } )
      ];

    }
  ] );

} )();
