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
