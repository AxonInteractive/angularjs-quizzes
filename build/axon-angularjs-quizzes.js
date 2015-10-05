/*! axon-angularjs-quizzes - v0.0.1 - 2015-10-05 */

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
( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quiz', [ '$injector',
    function ( $injector ) {

      return {

        scope: {
          'source': '@source'
        },
        restrict: 'AE',
        templateUrl: 'directives/quiz/quiz.html',
        link: function ( $scope, $elem, $attrs ) {

          // Directive code goes here
          // See http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/

          // Read in quiz type as attr (pretest, posttest or questionnaire)

          var data = $injector.get( $scope.source );

          $scope.data = data;

          $scope.questions = data.questions;

          if ( typeof $scope.quizVars !== 'object' ) {
            $scope.quizVars = {};
          }
        }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizAnswer', [
    '$sce', '$modal', '$peirReferencesData', 
    function ( $sce, $modal, $peirReferencesData ) {

      return {

        scope: {
          question: '=question'
        },
        restrict: 'AE',
        templateUrl: 'directives/quizAnswer/quizAnswer.html',
        link: function ( $scope, $elem, $attrs ) {

          /////////////////////
          // Event Handlers //
          ///////////////////

          $scope.onReferenceClicked = function ( event, referenceKey ) {
            event.preventDefault();
            $peirReferencesData.showReferenceModal( referenceKey );
          };

          /////////////////////
          // Initialization //
          ///////////////////
          
          ( function init () {

            // Sanitize the commentary to produce working HTML.
            $scope.sanitizedCommentary = $sce.trustAsHtml( $scope.question.commentary );

          } )();

        }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizQuestion', [
    function () {

      return {

        scope: {
          'question': '=question'
        },
        restrict: 'AE',
        templateUrl: 'directives/quizQuestion/quizQuestion.html',
        link: function ( $scope, $elem, $attrs ) {

          // Directive code goes here
          // See http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/

          // Read in quiz type as attr (pretest, posttest or questionnaire)

       }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizResults', [ '$injector',
    function ( $injector ) {

      return {

        scope: {
          'source': '@source'
        },
        restrict: 'AE',
        templateUrl: 'directives/quizResults/quizResults.html',
        link: function ( $scope, $elem, $attrs ) {

          // Directive code goes here
          // See http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/

          // Read in quiz type as attr (pretest, posttest or questionnaire)

          var data = $injector.get( $scope.source );

          $scope.data = data;

          $scope.questions = data.questions;

        }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizScorecard', [ '$injector', 'QuizScorecard',
    function ( $injector, QuizScorecard ) {

      return {

        scope: {
          "beforeSource": "@",
          "afterSource": "@",
          "modulesSource": "@"
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
            console.log( src );
            return function () {
              return src;
            };
          };

          /////////////////////
          // Initialization //
          ///////////////////

          var $beforeData = $injector.get( $scope.beforeSource );
          var $moduleData = $injector.get( $scope.modulesSource );
          var $afterData;

          if ( typeof $scope.afterSource === 'string' ) {
            $afterData = $injector.get( $scope.afterSource );
            $scope.isSingleSource = false;
          }
          else {
            $scope.isSIngleSource = true;
          }

          var scorecard = new QuizScorecard( $moduleData, $beforeData, $afterData );

          angular.extend( $scope, scorecard );

        }

      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.directive( 'quizScorecardQuestion', [ '$modal',
    function ( $modal ) {

      return {

        scope: {
          "question": "="
        },
        restrict: 'AE',
        templateUrl: 'directives/quizScorecardQuestion/quizScorecardQuestion.html',
        link: function ( $scope, $elem, $attrs ) {

          $scope.onButtonClicked = function() {
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

  var app = angular.module( 'peir-client' );

  app.factory( 'Quiz', [

    function () {

      return function Quiz( properties ) {

        // The name to be presented for this quiz.
        properties.name = ( typeof properties.name === 'undefined' ) ? "Quiz" : properties.name;

        // Any special instructions that should be presented at the start of this quiz.
        properties.instructions = ( typeof properties.instructions === 'undefined' ) ? "" : properties.instructions;

        // The expected maximum score that can be obtained on this quiz.
        properties.maxScore = ( typeof properties.maxScore === 'undefined' ) ? 0 : properties.maxScore;

        // The student's score on the quiz. Computed by calling grade().
        properties.score = ( typeof properties.score === 'undefined' ) ? null : properties.score;

        // The academic references that this quiz should attribute.
        properties.references = ( typeof properties.references === 'undefined' ) ? [] : properties.references;

        // The list of questions that make up the quiz.
        properties.questions = ( typeof properties.questions === 'undefined' ) ? [] : properties.questions;

        properties.competencies = ( function() {
          var competencies = {};

          var questions = properties.questions;

          var competency;

          for ( var i = 0; questions.length; i += 1 ) {

            var question = questions[ i ];

            if ( typeof question === 'undefined' ) {
              break;
            }

            competency = questions[ i ].competency;

            if ( competency === null ) {
              continue;
            }

            if( typeof competency.key !== 'string' ) {
              continue;
            }

            if ( typeof competencies[ competency.key ] === 'undefined' ) {
              competencies[ competency.key ] = [];
            }

            competencies[ competency.key ].push( questions[ i ] );
          }

          return competencies;

        }() );

        // Clear all answers and grading information from the quiz.
        properties.clear = function () {
          properties.score = null;
          for ( var i = 0; i < properties.questions.length; i += 1 ) {
            properties.questions[ i ].incomplete = false;
            properties.questions[ i ].answer = null;
            properties.questions[ i ].correct = null;
          }
        };

        // Check the answer of each question against the correct answer to grade each question, and
        // compute the student's score by totaling all questions' values. Returns the student's
        // score or null if the quiz shouldn't be graded.
        properties.grade = function () {

          if ( properties.maxScore <= 0 ) {
            // If this quiz has an invalid max score, then it shouldn't be graded.
            return null;
          }

          // Initialize the score as 0
          properties.score = 0;

          for ( var i = 0; i < properties.questions.length; i += 1 ) {

           var question = properties.questions[ i ];

           var correct = question.isCorrect();

            // Add the question's value to the score if the student's answer was correct.
            properties.score += ( correct ) ? question.value : 0;
          }

          return properties.score;
        };

        properties.getScoreFromAnswers = function( answers ) {

          var score = 0;

          for ( var i = 0; i < properties.questions.length; i += 1 ) {
            var question = properties.questions[ i ];

            var correct = question.isCorrectForAnswer( answers[ i ] );

            score += ( correct ) ? question.value : 0;
          }

          return score;
        };

        properties.getUnansweredQuestions = function() {
          var questions = [];

          for ( var i = 0; i < properties.questions.length; i += 1 ) {
            var question = properties.questions[ i ];

            if ( !question.isAnswered() ) {
              questions.push ( question );
            }
          }

          return questions;
        };

        // This function can be used to get a flat array of answers by scraping the values from each
        // question. This is typically used for output of a user's answers to a database.
        properties.getAnswers = function () {
          var answers = [];
          for ( var i = 0; i < properties.questions.length; i += 1 ) {
            answers.push( properties.questions[ i ].answer );
          }
          return answers;
        };

        // This function can be used to set the answer of each question by providing an array of
        // answers that matches the number of questions in this quiz.
        properties.setAnswers = function ( answersArray ) {
          if ( answersArray.length !== properties.questions.length ) {
            throw new Error( "The provided answers array is not the same size as the questions array!" );
          }
          for ( var i = 0; i < properties.questions.length; i += 1 ) {
            properties.questions[ i ].answer = answersArray[ i ];
          }
        };

        // Return the modified properties object.
        return properties;

      };

  } ] );

} )();

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

( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.factory( 'QuizQuestion', [

    function () {

      return function QuizQuestion( properties ) {

        // The ID number of the question, for administrative purposes.
        properties.number = ( typeof properties.number === 'undefined' ) ? 0 : properties.number;

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
        properties.type = ( typeof properties.type === 'undefined' ) ? "choice" : properties.type;

        // The number of points this question contributes toward the student's score if they
        // answer it correctly.
        properties.value = ( typeof properties.value === 'undefined' ) ? 0 : properties.value;

        // The question text.
        properties.text = ( typeof properties.text === 'undefined' ) ? "" : properties.text;

        // An array of potential answers that the student can pick from. If this is a
        // text question, this should be a list of strings that represent potential correct
        // responses to match the student's answer against.
        properties.choices = ( typeof properties.choices === 'undefined' ) ? [] : properties.choices;

        // The array index of the correct choice within the list of choices above or a string
        // that represents the correct answer (must be an exact match).
        properties.correctAnswer = ( typeof properties.correctAnswer === 'undefined' ) ? -1 : properties.correctAnswer;

        // The student's answer to this question. This will be set when a quiz is submitted by
        // the student, using the setAnswers() function.
        properties.answer = ( typeof properties.answer === 'undefined' ) ? null : properties.answer;

        // Whether the student's answer to this question is correct or not.
        properties.correct = ( typeof properties.correct === 'undefined' ) ? null : properties.correct;

        // Text to be presented to the student after the quiz is completed that justifies the
        // correct answer for the question and provides further background to aid understanding.
        properties.commentary = ( typeof properties.commentary === 'undefined' ) ? "" : properties.commentary;

        // The Core Competency with which this question is associated.
        properties.competency = ( typeof properties.competency === 'undefined' ) ? null : properties.competency;

        // The additional data to be stored inside of the question.
        properties.additionalData = ( typeof properties.additionalData === 'undefined' ) ? null : properties.additionalData;

        properties.getAnswer = function () {
          // If the answer is falsey then return an empty string
          if ( !properties.answer && properties.answer !== 0 ) {
            return "No answer";
          }
          else if ( properties.isChoiceLiteral() ) {
            return properties.choices[ properties.answer ];
          }
          else if ( properties.isChoice() ) {
            // 65 is ASCII for 'A'
            return String.fromCharCode( 65 + parseInt( properties.answer ) );
          }
          else {
            return properties.answer;
          }
        };

        properties.getCorrectAnswer = function() {
          //If the question type is a text then return the correct answer as is.
          if ( properties.isChoiceLiteral() ) {
            return properties.choices[ properties.correctAnswer ];
          }
          else if ( properties.isChoice() ) {
            // 65 is ASCII for 'A'
            return String.fromCharCode( 65 + parseInt( properties.correctAnswer ) );
          }
          else {
            return properties.correctAnswer;
          }
        };

        properties.getChoice = function( index ) {
          if ( properties.isChoiceLiteral() ) {
            return properties.choices[ index ];
          }
          else if ( properties.isChoice() ) {
            return String.fromCharCode( 65 + index );
          }
          else {
            return index;
          }
        };

        properties.isCorrect = function () {
          return properties.isCorrectForAnswer( properties.answer );
        };

        properties.isAnswered = function() {
          return ( properties.answer !== null );
        };

        properties.isCorrectForAnswer = function ( answer ) {
          var correctAnswer = null;
          var correct = false;
          var formattedAnswer = null;
          switch ( properties.type ) {

            case "text":
              // Compare the student's answer to each of the possible choices, and consider the
              // answer to be correct if any of them matches. Compare all strings as lower-case
              // text and remove all whitespace to eliminate common sources of false-negatives.
              formattedAnswer = answer.toString().toLowerCase().replace( " ", "" );
              for ( var j = 0; j < properties.choices.length; j += 1 ) {
                correctAnswer = properties.choices[ j ].toString().toLowerCase().replace( " ", "" );
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
              correctAnswer = parseInt( properties.correctAnswer );
              correct = ( formattedAnswer === correctAnswer );
              break;


            case "choiceLiteral":
              // Compare the student's answer to the correct answer as integers, because they both
              // refer to an index of the choices array. If they are equal, the student answered
              // with the correct answer.
              formattedAnswer = parseInt( answer );
              correctAnswer = parseInt( properties.correctAnswer );
              correct = ( formattedAnswer === correctAnswer );
              break;

          }

          return correct;
        };

        properties.isChoice = function() {
          return ( properties.type === 'choice' );
        };

        properties.isText = function() {
          return ( properties.type === 'text' );
        };

        properties.isChoiceLiteral = function() {
          return ( properties.type === 'choiceLiteral' );
        };

        // Return the modified properties object.
        return properties;
      };

  } ] );

} )();

( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.factory( 'QuizScorecard', [
    function() {

      function makeCompetency( competencyData, pretestData, posttestData ) {

        var competency = {
          description: "",
          pretest: {
            score: 0,
            maxScore: 0,
            percentCorrect: 0,
            questions: []
          },
          posttest: {
            score: 0,
            maxScore: 0,
            percentCorrect: 0,
            questions: []
          },
          percentageDifference: null
        };

        competency.description = competencyData.description;

        var index;
        var question;

        for ( index = 0; index < pretestData.questions.length; index += 1 ) {
          question = pretestData.questions[ index ];

          if ( question.competency.key === competencyData.key ) {

            competency.pretest.questions.push( question );

            competency.pretest.maxScore += question.value;

            if ( question.isCorrect() ) {
              competency.pretest.score += question.value;
            }
          }
        }

        competency.pretest.percentCorrect = competency.pretest.score / competency.pretest.maxScore * 100;

        if ( typeof posttestData  !== 'undefined' ) {

          for ( index = 0; index < posttestData.questions.length; index += 1 ) {
            question = posttestData.questions[ index ];

            if ( question.competency.key === competencyData.key ) {
              competency.posttest.questions.push( question );

              competency.posttest.maxScore += question.value;

              if ( question.isCorrect() ) {
                competency.posttest.score += question.value;
              }
            }
          }

          competency.posttest.percentCorrect = competency.posttest.score / competency.posttest.maxScore * 100;
          competency.percentageDifference = competency.posttest.percentCorrect - competency.pretest.percentCorrect;

        }
        else {
          competency.posttest = null;
        }

        return competency;
      }

      function makeModule( moduleData, pretestData, posttestData ) {
        var module = {
          number: moduleData.number,
          description: moduleData.description,
          title: moduleData.title,
          pretest: {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          },
          posttest: {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          },
          competencies: [],
          percentageDifference: null
        };

        var index;

        var competency;

        for ( index = 0; index < moduleData.competencies.length; index += 1 ) {
          var competencyData = moduleData.competencies[ index ];

          competency = makeCompetency( competencyData, pretestData, posttestData );

          module.competencies.push( competency );
        }

        for ( index = 0; index < module.competencies.length; index += 1 ) {
          competency = module.competencies[ index ];

          module.pretest.score    += competency.pretest.score;
          module.pretest.maxScore += competency.pretest.maxScore;

          if ( competency.posttest !== null ) {
            module.posttest.score    += competency.posttest.score;
            module.posttest.maxScore += competency.posttest.maxScore;
          }
          else {
            module.posttest = null;
          }
        }

        module.pretest.percentCorrect = module.pretest.score  / module.pretest.maxScore * 100;

        if ( module.posttest !== null ) {
          module.posttest.percentCorrect = module.posttest.score / module.posttest.maxScore * 100;

          module.percentageDifference = module.posttest.percentCorrect - module.pretest.percentCorrect;
        }

        return module;
      }

      return function QuizScorecard( modulesData, pretestData, posttestData ) {

        var self = {
          modules: [],
          pretest: {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          },
          posttest: {
            score: 0,
            maxScore: 0,
            percentCorrect: 0
          },
          percentageDifference: null
        };

        var index;

        for ( index = 0; index < modulesData.modules.length; index += 1 ) {
            var moduleData = modulesData.modules[ index ];

            self.modules.push( makeModule( moduleData, pretestData, posttestData ) );
        }

        var module;

        for ( index = 0; index < self.modules.length; index += 1 ) {
          module = self.modules[ index ];

          self.pretest.score += module.pretest.score;
          self.pretest.maxScore += module.pretest.maxScore;

          if ( module.posttest !== null ) {
            self.posttest.score += module.posttest.score;
            self.posttest.maxScore += module.posttest.maxScore;
          }
          else {
            self.posttest = null;
          }
        }

        self.pretest.percentCorrect = self.pretest.score / self.pretest.maxScore * 100;

        if ( self.posttest !== null ) {
          self.posttest.percentCorrect = self.posttest.score / self.posttest.maxScore * 100;
          self.percentageDifference = self.posttest.percentCorrect - self.pretest.percentCorrect;
        }

        return self;

      };
    }
  ]);
} )();

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
( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.factory( 'References', [
    '$modal', 
    function ( $modal ) {

      return function References( referencesMap ) {

        // The base object to augment;
        var self = {};

        ///////////////////////////////
        /// Reference Details Modal //
        /////////////////////////////
        ///
        /// See the ReferenceModal directive for further details.
        /// 

        // Displays a modal that contains detailed information about the reference.
        self.showReferenceModal = function ( referenceKey ) {

          // Open a modal containing information about the clicked reference.
          $modal.open( {
            templateUrl: 'views/__Modals/ReferenceModal/ReferenceModal.html',
            controller: 'ReferenceModalController',
            resolve: {
              '$modalArgs': function () {
                return {
                  reference: self.getReference( referenceKey )
                };
              }
            }
          } );
        };

        //////////////////////
        /// References Map //
        ////////////////////
        ///
        /// The references object maps reference keys to reference objects. Each reference object 
        /// should conform to the following interface:
        /// {
        ///   key: ''         // The reference's own key in the referernces map.
        ///   name: ''        // A name that the reference will be referred to as in-text.
        ///   description: '' // The complete citation as is will appear in footnotes/endnotes.
        ///   url: ''         // An (optional) url to the full text of the reference for download.
        /// }
        /// 
        /// See the Reference factory for further details.
        ///
        /// Note: References should never change at runtime. They are to be considered as constants.
        ///

        var references = referencesMap || {};

        // Get or set the references map (typically called at application start)
        self.getReferences = function () {
          return references;
        };
        self.setReferences = function ( quizReferences ) {
          references = quizReferences;
        };

        // Get a particular reference by looking up its key.
        self.getReference = function ( referenceKey ) {
          if ( typeof( references ) !== 'object' ) {
            throw new Error( 'References data must be an object!.' );
          }
          return references[ referenceKey ];
        };

        //////////////
        // Exports //
        ////////////

        return self;

      };

    }
  ] );

} )();
( function () {

  'use strict';

  var app = angular.module( 'peir-client' );

  app.controller( 'KTPlanEditModalController', [
    '$scope', '$state', '$modalInstance', '$modalArgs', '$log', '$sanitize',
    function ( $scope, $state, $modalInstance, $modalArgs, $log, $sanitize ) {

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

  var app = angular.module( 'peir-client' );

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
