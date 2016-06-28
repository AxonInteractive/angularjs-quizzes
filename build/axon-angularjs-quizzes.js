/*! axon-angularjs-quizzes - v0.0.5 - 2016-06-28 */

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
            'source': '=',
            'highlight': '&'
          },
          restrict: 'AE',
          templateUrl: '/directives/quiz/quiz.html',
          link: function ( $scope, $elem, $attrs ) {

            // Nothing to do here.
          }

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizAnswer', [
      '$sce',
      function ( $sce ) {

        return {

          scope: {
            question: '='
          },
          restrict: 'AE',
          templateUrl: '/directives/quizAnswer/quizAnswer.html',
          link: function ( $scope, $elem, $attrs ) {

            // Sanitize the commentary to produce working HTML.
            $scope.sanitizedCommentary = $sce.trustAsHtml( $scope.question.commentary );

          }

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizQuestion', [
      function () {

        return {

          scope: {
            'question': '=',
            'highlight': '&'
          },
          restrict: 'AE',
          templateUrl: '/directives/quizQuestion/quizQuestion.html',
          link: function ( $scope, $elem, $attrs ) {

            $scope.markAsIncomplete = function () {
              var showIncomplete = ( typeof( $scope.highlight ) === 'function' )
                ? $scope.highlight()
                : false;
              return !$scope.question.isAnswered() && showIncomplete;
            };

            console.log( $scope.highlight );
            console.log( $scope.highlight() );

         }

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizResults', [ 
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

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizScorecard', [
      'Scorecard',
      function ( Scorecard ) {

        return {

          scope: {
            "beforeSource": "=",
            "afterSource": "=",
            "modulesSource": "="
          },
          restrict: 'AE',
          templateUrl: '/directives/quizScorecard/quizScorecard.html',
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

          }

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .directive( 'quizScorecardQuestion', [
      '$modal',
      function ( $modal ) {

        return {

          scope: {
            "question": "="
          },
          restrict: 'AE',
          templateUrl: '/directives/quizScorecardQuestion/quizScorecardQuestion.html',
          link: function ( $scope, $elem, $attrs ) {

            $scope.onButtonClicked = function () {
              $modal.open( {
                  templateUrl: 'views/QuizAnswerModal/QuizAnswerModal.html',
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

        return function Action( action ) {

          var defaults = {

            // The URL this action should navigate to (if any).
            href: '',

            // The router state this action should navigate to (if any).
            sref: '',

            // The label to place upon the button that renders this action.
            label: 'Next'

          };

          // Extend the defaults with the passed properties.
          return angular.merge( defaults, action );

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Competency', [  

      function () {

        return function Competency( competency ) {

          var defaults = {

            // The competency's own key in the referernces map.
            key: '',

            // A name that the competency will be referred to as in-text.
            name: '',

            // A human-readable description of this competency.
            description: '',

            // A url to the full text of the competency for download.
            url: ''

          };

          return angular.merge( defaults, competency );

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

        return function Module( module ) {

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
          return angular.extend( defaults, module );

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Page', [

      function () {

        return function Page( page ) {

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
          return angular.merge( defaults, page );

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Question', [

      function () {

        return function Question( question ) {

          var merged = {};

          // CONSTANTS

          // Multiple choice questions where the student picks an option from the choices array but
          // is displayed in a literal form for results
          var TYPE_CHOICE = 'choice';

          // True/False questions where the student picks an option from the choices array.
          var TYPE_CHOICE_LITERAL = 'choiceLiteral';

          // Short-Answer questions and potentially numeric answers expected to be an exact string
          // match of the correct answer.
          var TYPE_TEXT = 'text';

          // DEFAULTS

          var defaults = {

            // The student's answer to this question. This will be set when a quiz is submitted
            // by the student, using the setAnswers() function.
            answer: null,

            // An array of potential answers that the student can pick from. If this is a
            // text question, this should be a list of strings that represent potential correct
            // responses to match the student's answer against.
            choices: [],

            // Text to be presented to the student after the quiz is completed that justifies
            // the correct answer for the question and provides further background.
            commentary: null,

            // The Competency object with which this question is associated.
            competency: null,

            // The array index of the correct choice within the list of choices above or a
            // string that represents the correct answer (must be an exact match).
            correctAnswer: null,

            // Whether or not the question is correct (according to the server).
            isCorrect: null,

            // The key/index of the question within the quiz questions array.
            key: null,

            // The number of the question within the quiz as the user would see it.
            number: null,

            // The question text.
            text: '',

            // The format to present the question as and how to interpret answers. See the
            // constants above for the complete list of available types.
            type: TYPE_CHOICE,

            // The number of points this question contributes toward the student's score if
            // they answer it correctly.
            value: 0

          };

          // FUNCTIONS

          function clearAnswer () {

            merged.answer = null;

          }

          function clearResultData () {

            merged.commentary = null;
            merged.correctAnswer = null;
            merged.isCorrect = null;

          }

          function getFormattedAnswer () {

            if ( !isAnswered() ) {
              return "No Answer";
            }
            else {
              return getFormattedChoice( merged.answer );
            }

          }

          function getFormattedChoice ( index ) {

            // FIXME: This is better implemented as a filter.

            if ( isChoiceLiteral() ) {
              return merged.choices[ parseInt( index ) ];
            }
            else if ( isChoice() ) {
              // 65 is ASCII for 'A'
              return String.fromCharCode( 65 + parseInt( index ) );
            }
            else {
              return index;
            }

          }

          function getFormattedCorrectAnswer () {

            if ( !hasResultData() ) {
              return "No Answer";
            }
            else {
              return getFormattedChoice( merged.correctAnswer );
            }

          }

          function hasCompetency () {

            return ( merged.competency !== null );

          }

          function hasResultData () {

            return ( merged.correctAnswer !== null );

          }

          function isAnswered () {

            return ( merged.answer !== null );

          }

          function isChoice () {

            return ( merged.type === TYPE_CHOICE );

          }

          function isChoiceLiteral () {

            return ( merged.type === TYPE_CHOICE_LITERAL );

          }

          function isText () {

            return ( merged.type === TYPE_TEXT );

          }

          // INIT

          ( function init () {

            // Merge the defaults with the custom implementation and the functions that are defined
            // above into a single object to represent the Quiz.
            angular.extend(
              merged,
              defaults,
              question,
              {
                clearAnswer: clearAnswer,
                clearResultData: clearResultData,
                getFormattedAnswer: getFormattedAnswer,
                getFormattedChoice: getFormattedChoice,
                getFormattedCorrectAnswer: getFormattedCorrectAnswer,
                hasCompetency: hasCompetency,
                hasResultData: hasResultData,
                isAnswered: isAnswered,
                isChoice: isChoice,
                isChoiceLiteral: isChoiceLiteral,
                isText: isText
              }
            );

          } )();

          // Return the merged Question object.
          return merged;

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Quiz', [
      'Question',
      function ( Question ) {

        return function Quiz( quiz ) {

          var merged = {};

          // DEFAULTS

          var defaults = {

            // Any special instructions that should be presented at the start of this quiz.
            instructions: '',

            // The name to be presented for this quiz.
            name: '',

            // The list of questions that make up the quiz.
            questions: []

          };

          // FUNCTIONS

          function clear () {

            merged
              .questions
              .forEach( function ( question ) {
                question.clear();
              } );

          }

          function getAnswers () {

            return merged
              .questions
              .map( function ( question ) {
                return question.answer;
              } );

          }

          function getCompetencies () {

            merged
              .questions
              .filter( function ( question ) {
                return question.hasCompetency();
              } )
              .map( function ( question ) {
                return question.competency;
              } )
              .filter( function ( competency ) {
                return !competency;
              } )
              .reduce( function ( competency, quizCompetencies ) {
                // Merge all of the question competencies into one array.
                return quizCompetencies.concat( competency );
              } )
              .filter( function ( competency, index, quizCompetencies ) {
                // Eliminate all duplicate elements to ensure uniqueness.
                return quizCompetencies.indexOf( competency ) === index;
              } )
              .sort( function ( a, b ) {
                // Sort the results by key.
                if ( a.key < b.key ) {
                  return -1;
                }
                else if ( a.key > b.key ) {
                  return 1;
                }
                else {
                  return 0;
                }
              } );

          }

          function getMaxScore () {

            return merged
              .questions
              .reduce( function ( question, sum ) {
                return sum + question.value;
              }, 0 );

          }

          function getScore () {

            return merged
              .questions
              .reduce( function ( question, sum ) {
                return sum + question.correct ? question.value : 0;
              }, 0 );

          }

          function getUnansweredQuestions () {

            return merged
              .questions
              .filter( function ( question ) {
                return !question.isAnswered();
              } );

          }

          function setAnswers ( answers ) {

            if ( answers.length !== merged.questions.length ) {
              throw new Error( "The provided answers array is not the same size as the questions array!" );
            }

            answers
              .forEach( function ( answer, index ) {
                var question = merged.questions[ index ];
                question.answer = answer;
              } );

          }

          // INIT

          ( function init () {

            // Merge the defaults with the custom implementation and the functions that are defined
            // above into a single object to represent the Quiz.
            angular.extend(
              merged,
              defaults,
              quiz,
              {
                clear: clear,
                getAnswers: getAnswers,
                getCompetencies: getCompetencies,
                getMaxScore: getMaxScore,
                getScore: getScore,
                getUnansweredQuestions: getUnansweredQuestions,
                setAnswers: setAnswers
              }
            );


            merged.questions = merged.questions.map( function( item ) {
              return Question( item );
            } );
          } )();

          // Return the merged Quiz object.
          return merged;

        };

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .factory( 'Reference', [  

      function () {

        return function Reference( reference ) {

          var defaults = {

            // The reference's own key in the referernces map.
            key: '',

            // A name that the reference will be referred to as in-text.
            name: '',

            // The complete citation as is will appear in footnotes/endnotes.
            description: '',

            // A url to the full text of the reference for download.
            url: ''

          };

          // Extend the defaults with the passed properties.
          return angular.merge( defaults, reference );

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
              if ( question.isCorrect ) {
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
                if ( question.isCorrect ) {
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

  angular
    .module( 'axon-angularjs-quizzes' )
    .controller( 'KTPlanEditModalController', [
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

  angular
    .module( 'axon-angularjs-quizzes' )
    .controller( 'QuizAnswerModalController', [
      '$scope', '$modalInstance', '$modalArgs', 
      function ( $scope, $modalInstance, $modalArgs ) {

        /////////////////////
        // Event Handlers //
        ///////////////////

        $scope.onCloseButtonClicked = function () {
          $modalInstance.close();
        };

        /////////////////////
        // Initialization //
        ///////////////////

        ( function init() {

          if ( typeof $modalArgs === 'undefined' ) {
            $modalArgs = {};
          }

          $scope.question = $modalArgs.question;

        } )();

    } ] );

} )();

( function () {

  'use strict';

  angular
    .module( 'axon-angularjs-quizzes' )
    .controller( 'ReferenceModalController', [
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
