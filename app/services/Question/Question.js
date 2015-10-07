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
