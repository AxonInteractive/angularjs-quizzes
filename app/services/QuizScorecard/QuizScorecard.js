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
