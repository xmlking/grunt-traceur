/*
 * grunt-traceur
 * https://github.com/aaron/grunt
 *
 * Copyright (c) 2013 Aaron Frost
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    traceur: {
      options: {
        sourceMaps: true,
        modules: 'commonjs'
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/fixtures/',
          src: '**/*.js',
          dest: 'test/tmp/',
          ext: '.js'
        }]
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['traceur', 'nodeunit']);

};
