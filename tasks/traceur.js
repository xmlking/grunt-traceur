/*
* grunt-traceur
* https://github.com/aaron/grunt
*
* Copyright (c) 2013 Aaron Frost
* Licensed under the MIT license.
*/

'use strict';
var fs = require('fs'),
path = require('path'),
compiler = require('../lib/compiler'),
async = require('async');

function asyncCompile(content, filename, options, callback) {
  var result;
  try {
    result = compiler.compile(content, filename, options);
  } catch (e) {
    callback(e.message, null);
    return;
  }
  callback(null, result);
}


/**
* Compiles a list of srcs files
* */
function compileAll(grunt, compile, group, options, callback) {
var srcs = group.src, dest = group.dest;
  grunt.log.debug('Compiling... ' + dest);

  async.map(srcs, function(src, callback) {
    var content = grunt.file.read(src).toString('utf8');
    compile(content, src, options, callback);
  }, function(err, result) {
    if (err) {
      grunt.log.error(err);
      callback(false);
    } else {
		result.map( function(res) {
			if(res.errors && res.errors.length > 0) {
            	grunt.log.error("Errors encountered for " + res.file);
            	grunt.log.error(res.errors );
          	} else {
          		grunt.log.debug('Compilation successful - ' + dest);
          		grunt.file.write(dest, res.js, {encoding: 'utf8'});
          	}
		});
		grunt.log.ok(srcs + ' -> ' + dest);
        callback(true);
      }
  });
}

module.exports = function(grunt) {
  grunt.registerMultiTask('traceur',
    'Compile ES6 JavaScript to ES3 JavaScript', function() {
      var options = this.options({
        sourceMaps: false,
        spawn: true
      });
      grunt.log.debug('using options: ' + JSON.stringify(options));
      var done = this.async();
      var compile = asyncCompile;


      // We don't terminate immediately on errors to log all error messages
      // before terminating.
      async.every(this.files, function(group, callback) {
        compileAll(grunt, compile, group, options, callback);
      }, function(success) {
       grunt.log.debug("Success" + success);
        done(success);
      });
    });

};
