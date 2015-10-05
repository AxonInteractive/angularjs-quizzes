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
