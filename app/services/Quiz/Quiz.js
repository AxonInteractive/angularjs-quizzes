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


            merged = merged.questions.map( function( item ) {
              return Question( item );
            } );
          } )();

          // Return the merged Quiz object.
          return merged;

        };

    } ] );

} )();
