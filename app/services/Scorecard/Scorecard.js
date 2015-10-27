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
