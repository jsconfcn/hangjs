#!/usr/bin/env node
'use strict';

var fs          = require('fs');
var resolve     = require('path').resolve;

var chalk       = require('chalk');
var inquirer    = require('inquirer');

var questions   = require('./questions.js');


var convertToMeta = function ( answers ){

  // Convert the plugins array to an object
  var pluginsObj = {};
  answers.plugins.forEach(function(name){
    pluginsObj[name] = {};
  });

  // Search in answers for keys like [plugin-name]--[option]
  // and merge it into the pluginsObj
  for ( var key in answers ){
    if ( key.indexOf('--') === -1 ) { continue; }

    var pluginKeyName = key.split('--');

    if (!!pluginsObj[pluginKeyName[0]]){
      pluginsObj[pluginKeyName[0]][pluginKeyName[1]] = answers[key];
      delete answers[key];
    }
  }

  answers.plugins = pluginsObj;

  // Add empty metadata
  answers.metadata = {};

  return answers;
};

var writeMeta = function( answers ){
  var config = resolve(process.cwd(), 'metalsmith.json');
  fs.writeFile(config, JSON.stringify(answers, null, '  '), function(err){
    if ( err ){
      throw err;
    }
    console.log(chalk.green('\n✓ Successfully written ') + chalk.cyan('metalsmith.json'));
  });
};


inquirer.prompt ( questions , function ( answers ){
  writeMeta ( convertToMeta ( answers ) );
});



