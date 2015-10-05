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
