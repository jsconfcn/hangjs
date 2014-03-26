'use strict';

var has = function(array, value){
  return array.indexOf(value) > -1;
};


module.exports = [
    {
      type: 'input',
      name: 'source',
      message: 'Specify the input folder?',
      default : './src'
    },
    {
      type: 'input',
      name: 'destination',
      message: 'Specify the destination folder?',
      default : './build'
    },
    {
      type: 'checkbox',
      message: 'Which plugins do you want to use?',
      name: 'plugins',
      choices: [
        {
          name: 'metalsmith-drafts'
        },
        {
          name: 'metalsmith-markdown'
        },
        {
          name: 'metalsmith-permalinks'
        },
        {
          name: 'metalsmith-templates'
        }
      ]
    },
    {
      type: 'input',
      message: 'Which template engine do you want to use?',
      name: 'metalsmith-templates--engine',
      default : 'handelbars',
      when : function( answers ){
        return has(answers.plugins, 'metalsmith-templates');
      }
    },
    {
      type: 'input',
      message: 'Where are your templates stored?',
      name: 'metalsmith-templates--directory',
      default : './templates',
      when : function( answers ){
        return has(answers.plugins, 'metalsmith-templates');
      }
    },
    {
      type: 'input',
      message: 'What should a permalink look like?',
      name: 'metalsmith-permalinks--pattern',
      default : ':title',
      when : function( answers ){
        return has(answers.plugins, 'metalsmith-permalinks');
      }
    }
  ];