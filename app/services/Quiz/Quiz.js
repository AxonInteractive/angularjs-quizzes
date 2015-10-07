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
