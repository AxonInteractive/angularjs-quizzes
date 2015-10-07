/*! axon-angularjs-quizzes - v0.0.1 - 2015-10-07 */

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
  angular.module( 'axon-angularjs-quizzes', [
    'angular-progress-arc', 
    'axon-angularjs-utilities',
    'ui.bootstrap',
    'ui.router'
  ] );

} )();
( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quiz', [ 
      function () {

        return {

          scope: {
            'source': '='
          },
          restrict: 'AE',
          templateUrl: 'directives/quiz/quiz.html',
          link: function ( $scope, $elem, $attrs ) {

            // Nothing to do here.

          }

        };

    } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.directive( 'quizAnswer', [
    '$sce', 
    function ( $sce ) {

      return {

        scope: {
          question: '='
        },
        restrict: 'AE',
        templateUrl: 'directives/quizAnswer/quizAnswer.html',
        link: function ( $scope, $elem, $attrs ) {

          // Sanitize the commentary to produce working HTML.
          $scope.sanitizedCommentary = $sce.trustAsHtml( $scope.question.commentary );

        }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.directive( 'quizQuestion', [
    function () {

      return {

        scope: {
          'question': '='
        },
        restrict: 'AE',
        templateUrl: 'directives/quizQuestion/quizQuestion.html',
        link: function ( $scope, $elem, $attrs ) {

          // Nothing to do here.

       }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.directive( 'quizResults', [ 
    function () {

      return {

        scope: {
          'source': '='
        },
        restrict: 'AE',
        templateUrl: 'directives/quizResults/quizResults.html',
        link: function ( $scope, $elem, $attrs ) {

          // Nothing to do here.

        }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.directive( 'quizScorecard', [ 
    'Scorecard',
    function ( Scorecard ) {

      return {

        scope: {
          "beforeSource": "=",
          "afterSource": "=",
          "modulesSource": "="
        },
        restrict: 'AE',
        templateUrl: 'directives/quizScorecard/quizScorecard.html',
        link: function ( $scope, $elem, $attrs ) {

          ///////////////////////
          // Helper Functions //
          /////////////////////

          // Returns a func that, when called, will yield the requested property from the provided
          // source object. This is weird as hell, and I'm only using it to get
          // angular-progress-arc to behave, since internall it CALLS the complete attribute passed
          // to it as a function, and I'm grasping at straws as to how to make that work nicely.
          $scope.getFn = function ( src ) {
            //console.log( src );
            return function () {
              return src;
            };
          };

          /////////////////////
          // Initialization //
          ///////////////////

          $scope.isSingleSource = !$scope.afterSource;

          var scorecard = Scorecard( 
            $scope.modulesSource, 
            $scope.beforeSource, 
            $scope.afterSource 
          );
          angular.extend( $scope, scorecard );

          console.log( scorecard.modules );
          console.log( scorecard.modules.posttest );

        }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.directive( 'quizScorecardQuestion', [ 
    '$modal',
    function ( $modal ) {

      return {

        scope: {
          "question": "="
        },
        restrict: 'AE',
        templateUrl: 'directives/quizScorecardQuestion/quizScorecardQuestion.html',
        link: function ( $scope, $elem, $attrs ) {

          $scope.onButtonClicked = function () {
            $modal.open( {
                templateUrl: 'views/__Modals/QuizAnswerModal/QuizAnswerModal.html',
                controller: 'QuizAnswerModalController',
                resolve: {
                  '$modalArgs': function () {
                    return {
                      question: $scope.question
                    };
                  }
                }
            } );
          };

        }

      };

  } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Action', [

      function () {

        return function Action( state, label ) {

          return {

            // The router state this action should navigate to.
            state: state || '',

            // The label to place upon the button that renders this action.
            label: label || 'Next'

          };

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Competency', [  

      function () {

        return function Competency( competencyKey, nameStr, descriptionStr, url ) {

          return {

            // The competency's own key in the referernces map.
            key: competencyKey || '',

            // A name that the competency will be referred to as in-text.
            name: nameStr || '',

            // A human-readable description of this competency.
            description: descriptionStr || '',

            // A url to the full text of the competency for download.
            url: url || ''

          };

        };

      }
      
    ] );

} )();
( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Module', [

      function () {

        return function Module( properties ) {

          var defaults = {

            // The name of the module in human-readable format.
            name: '',

            // The 1-indexed number of the module.
            number: 0,

            // The identifier used in code (typically in router states refrencing module pages.
            key: '',

            // A list of competencies this module relates to.
            competencies: [],

            // The list of pages that belong to this module.
            pages: []

          };

          // Extend the defaults with the passed properties.
          var extended = angular.extend( defaults, properties );

          // Return the final Module object.
          return extended;

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Page', [

      function () {

        return function Page( properties ) {

          var defaults = {

            // A number to order this page within the module.
            number: 0,

            // A string identifying the type of content this page presents. There is no specific 
            // list of types other than what your stie needs for its particular implementation.
            type: '',

            // The name of the page in human-readable format.
            name: '',

            // The router state at which this page can be reached.
            state: '',

            // If this page has non-text content that requires transcription for the hearing 
            // impaired, this URL points to the transcript file that can be downloaded.
            transcriptUrl: '',

            // An action for the button on this page defining the page/state to navigate to (next 
            // and previous) and labels to put on these buttons to describe them.
            actions: {
              next: null,
              prev: null
            }

          };

          // Extend the defaults with the passed properties.
          var extended = angular.extend( defaults, properties );

          // Return the final ModulePage object.
          return extended;

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Question', [

      function () {

        return function Question( properties ) {

          var defaults = {

            // The ID number of the question, for administrative purposes.
            number: 0,

            // The type of question this is from the following list:
            // [
            //   "text",         -- Short-Answer questions and potentially numeric answers expected to be
            //                      an exact string match of the correct answer.
            //   "choiceLiteral" -- True/False questions where the student picks one of
            //                      several options from the choices array.
            //   "choice"        -- Multiple choice questions where the student picks on of several
            //                      several options from the choices array but is displayed in a literal
            //                      form for results
            //   ""
            // ]
            type: 'choice',

            // The number of points this question contributes toward the student's score if they
            // answer it correctly.
            value: 0,

            // The question text.
            text: '',

            // An array of potential answers that the student can pick from. If this is a
            // text question, this should be a list of strings that represent potential correct
            // responses to match the student's answer against.
            choices: [],

            // The array index of the correct choice within the list of choices above or a string
            // that represents the correct answer (must be an exact match).
            correctAnswer: -1,

            // The student's answer to this question. This will be set when a quiz is submitted by
            // the student, using the setAnswers() function.
            answer: null,

            // Whether the student's answer to this question is correct or not.
            correct: null,

            // Text to be presented to the student after the quiz is completed that justifies the
            // correct answer for the question and provides further background to aid understanding.
            commentary: '',

            // The Core Competency with which this question is associated.
            competency: null,

            // The additional data to be stored inside of the question.
            additionalData: null,

            getAnswer: function () {

              // If the answer is falsey then return an empty string
              if ( !this.answer && this.answer !== 0 ) {
                return "No answer";
              }
              else if ( this.isChoiceLiteral() ) {
                return this.choices[ this.answer ];
              }
              else if ( this.isChoice() ) {
                // 65 is ASCII for 'A'
                return String.fromCharCode( 65 + parseInt( this.answer ) );
              }
              else {
                return this.answer;
              }

            },

            getCorrectAnswer: function() {

              //If the question type is a text then return the correct answer as is.
              if ( this.isChoiceLiteral() ) {
                return this.choices[ this.correctAnswer ];
              }
              else if ( this.isChoice() ) {
                // 65 is ASCII for 'A'
                return String.fromCharCode( 65 + parseInt( this.correctAnswer ) );
              }
              else {
                return this.correctAnswer;
              }

            },

            getChoice: function( index ) {

              if ( this.isChoiceLiteral() ) {
                return this.choices[ index ];
              }
              else if ( this.isChoice() ) {
                return String.fromCharCode( 65 + index );
              }
              else {
                return index;
              }

            },

            isAnswered: function() {

              return ( this.answer !== null );

            },

            isChoice: function() {

              return ( this.type === 'choice' );

            },

            isCorrect: function () {

              return this.isCorrectForAnswer( this.answer );

            },

            isCorrectForAnswer: function ( answer ) {

              var correctAnswer = null;
              var correct = false;
              var formattedAnswer = null;
              switch ( this.type ) {

                case "text":
                  // Compare the student's answer to each of the possible choices, and consider the
                  // answer to be correct if any of them matches. Compare all strings as lower-case
                  // text and remove all whitespace to eliminate common sources of false-negatives.
                  formattedAnswer = answer.toString().toLowerCase().replace( " ", "" );
                  for ( var j = 0; j < this.choices.length; j += 1 ) {
                    correctAnswer = this.choices[ j ].toString().toLowerCase().replace( " ", "" );
                    if ( formattedAnswer === correctAnswer ) {
                      correct = true;
                      break;
                    }
                  }
                  break;

                case "choice":
                  // Compare the student's answer to the correct answer as integers, because they both
                  // refer to an index of the choices array. If they are equal, the student answered
                  // with the correct answer.
                  formattedAnswer = parseInt( answer );
                  correctAnswer = parseInt( this.correctAnswer );
                  correct = ( formattedAnswer === correctAnswer );
                  break;


                case "choiceLiteral":
                  // Compare the student's answer to the correct answer as integers, because they both
                  // refer to an index of the choices array. If they are equal, the student answered
                  // with the correct answer.
                  formattedAnswer = parseInt( answer );
                  correctAnswer = parseInt( this.correctAnswer );
                  correct = ( formattedAnswer === correctAnswer );
                  break;

              }

              return correct;

            },

            isChoiceLiteral: function() {

              return ( this.type === 'choiceLiteral' );

            },

            isText: function() {

              return ( this.type === 'text' );

            }

          };

          // Return the final QuizQuestion object.
          return angular.extend( defaults, properties );
          
        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Quiz', [

      function () {

        return function Quiz( properties ) {

          var defaults = {

            // The name to be presented for this quiz.
            name: '',

            // Any special instructions that should be presented at the start of this quiz.
            instructions: '',

            // The expected maximum score that can be obtained on this quiz.
            maxScore: 0,

            // The student's score on the quiz. Computed by calling grade().
            score: null,

            // The academic references that this quiz should attribute.
            references: [],

            // The list of questions that make up the quiz.
            questions: [],

            // A list of competencies this quiz relates to.
            competencies: [],

            clear: function () {

              // Set the score invalid.
              this.score = null;

              // Clear the scoring of each of the questions.
              for ( var i = 0; i < this.questions.length; i += 1 ) {
                this.questions[ i ].incomplete = false;
                this.questions[ i ].answer = null;
                this.questions[ i ].correct = null;
              }

            },

            grade: function () {

              // If this quiz has an invalid max score, then it shouldn't be graded.
              if ( this.maxScore <= 0 ) {
                return null;
              }

              // Initialize the score as 0.
              this.score = 0;

              // Add the question's value to the score if the student's answer was correct.
              for ( var i = 0; i < this.questions.length; i += 1 ) {
                var question = this.questions[ i ];
                var correct = question.isCorrect();
                this.score += ( correct ) ? question.value : 0;
              }

              return this.score;

            },

            getScoreFromAnswers: function( answers ) {

              var score = 0;

              for ( var i = 0; i < this.questions.length; i += 1 ) {
                var question = this.questions[ i ];
                var correct = question.isCorrectForAnswer( answers[ i ] );
                score += ( correct ) ? question.value : 0;
              }

              return score;

            },

            getUnansweredQuestions: function() {

              var questions = [];

              for ( var i = 0; i < this.questions.length; i += 1 ) {
                var question = this.questions[ i ];
                if ( !question.isAnswered() ) {
                  questions.push( question );
                }
              }

              return questions;

            },

            // This function can be used to get a flat array of answers by scraping the values from each
            // question. This is typically used for output of a user's answers to a database.
            getAnswers: function () {

              var answers = [];
              for ( var i = 0; i < this.questions.length; i += 1 ) {
                answers.push( this.questions[ i ].answer );
              }

              return answers;

            },

            // This function can be used to set the answer of each question by providing an array of
            // answers that matches the number of questions in this quiz.
            setAnswers: function ( answersArray ) {

              if ( answersArray.length !== this.questions.length ) {
                throw new Error( "The provided answers array is not the same size as the questions array!" );
              }

              for ( var i = 0; i < this.questions.length; i += 1 ) {
                this.questions[ i ].answer = answersArray[ i ];
              }

            }

          };

          // Extend the defaults with the passed properties.
          var extended = angular.extend( defaults, properties );

          // Automatically construct the competencies from the questions.
          for ( var i = 0; extended.questions.length; i += 1 ) {
            
            var question = extended.questions[ i ];
            if ( typeof( question ) === 'undefined' ) {
              break;
            }

            var competency = extended.questions[ i ].competency;
            if ( competency === null || typeof( competency.key ) !== 'string' ) {
              continue;
            }

            if ( typeof( extended.competencies[ competency.key ] ) === 'undefined' ) {
              extended.competencies[ competency.key ] = [];
            }

            extended.competencies[ competency.key ].push( extended.questions[ i ] );

          }

          // Return the final Quiz object.
          return extended;

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Reference', [  

      function () {

        return function Reference( referenceKey, nameStr, descriptionStr, url ) {

          return {

            // The reference's own key in the referernces map.
            key: referenceKey || '',

            // A name that the reference will be referred to as in-text.
            name:  nameStr || '',

            // The complete citation as is will appear in footnotes/endnotes.
            description: descriptionStr || '',

            // A url to the full text of the reference for download.
            url: url || ''

          };

        };

      }
      
    ] );

} )();
( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Scorecard', [

      function () {

        function Scorecard( modulesData, pretestData, posttestData ) {

          // 
          var modules = modulesData
            .map( function ( module ) { 
              return makeModule( module, pretestData, posttestData ); 
            } );
          var pretest = {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          };
          var posttest = {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          };
          var percentageDifference = null;

          // 
          modules
            .forEach( function ( module ) {
              pretest.score += module.pretest.score;
              pretest.maxScore += module.pretest.maxScore;
              if ( module.posttest !== null ) {
                posttest.score += module.posttest.score;
                posttest.maxScore += module.posttest.maxScore;
              }
              else {
                posttest = null;
              }
            } );

            // 
          pretest.percentCorrect = pretest.score / pretest.maxScore * 100;
          if ( posttest !== null ) {
            posttest.percentCorrect = posttest.score / posttest.maxScore * 100;
            percentageDifference = posttest.percentCorrect - pretest.percentCorrect;
          }

          // 
          return {
            modules: modules,
            pretest: pretest,
            posttest: posttest,
            percentageDifference: percentageDifference
          };

        }

        function makeCompetency( competencyData, pretestData, posttestData ) {

          // 
          var description = competencyData.description;
          var pretest = {
            score: 0,
            maxScore: 0,
            percentCorrect: 0,
            questions: []
          };
          var posttest = {
            score: 0,
            maxScore: 0,
            percentCorrect: 0,
            questions: []
          };
          var percentageDifference = null;

          // 
          pretestData.questions
            .filter( function ( question ) {
              return question.competency.key === competencyData.key;
            } )
            .forEach( function ( question ) {
              pretest.questions.push( question );
              pretest.maxScore += question.value;
              if ( question.isCorrect() ) {
                pretest.score += question.value;
              }
            } );
          pretest.percentCorrect = pretest.score / pretest.maxScore * 100;

          // 
          if ( typeof( posttestData ) !== 'undefined' ) {
            posttestData.questions
              .filter( function ( question ) {
                return question.competency.key === competencyData.key;
              } )
              .forEach( function ( question ) {
                posttest.questions.push( question );
                posttest.maxScore += question.value;
                if ( question.isCorrect() ) {
                  posttest.score += question.value;
                }
              } );
            posttest.percentCorrect = posttest.score / posttest.maxScore * 100;
            percentageDifference = posttest.percentCorrect - pretest.percentCorrect;
          }
          else {
            posttest = null;
          }

          // 
          return {
            description: description,
            pretest: pretest,
            posttest: posttest,
            percentageDifference: percentageDifference
          };

        }

        function makeModule( moduleData, pretestData, posttestData ) {
          
          // 
          var number = moduleData.number;
          var description = moduleData.description;
          var title = moduleData.title;
          var competencies = moduleData.competencies
            .map( function ( competency ) {
              return makeCompetency( competency, pretestData, posttestData );
            } );
          var pretest = {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          };
          var posttest = {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          };
          var percentageDifference = null;

          // 
          competencies
            .forEach( function ( competency ) {
              pretest.score    += competency.pretest.score;
              pretest.maxScore += competency.pretest.maxScore;
              if ( competency.posttest !== null ) {
                posttest.score    += competency.posttest.score;
                posttest.maxScore += competency.posttest.maxScore;
              }
              else {
                posttest = null;
              }
            } );
          pretest.percentCorrect = pretest.score  / pretest.maxScore * 100;

          // 
          if ( posttest !== null ) {
            posttest.percentCorrect = posttest.score / posttest.maxScore * 100;
            percentageDifference = posttest.percentCorrect - pretest.percentCorrect;
          }

          // 
          return {
            number: number, 
            description: description, 
            title: title, 
            competencies: competencies,
            pretest: pretest,
            posttest: posttest,
            percentageDifference: percentageDifference
          };

        }

        // Return the Scorecard factory function.
        return Scorecard;

      }

    ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'axon-angularjs-quizzes' );

  app.controller( 'KTPlanEditModalController', [
    '$scope', '$state', '$modalInstance', '$modalArgs', 
    function ( $scope, $state, $modalInstance, $modalArgs ) {

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
