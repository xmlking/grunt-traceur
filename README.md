# grunt-traceur

> A grunt plugin for Google's Traceur-Compile, a lib to compile ES6 JavaScript into ES3 JavaScript. 

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-traceur --save-dev
To install my verion which is built on traceur 0.0.32
npm install --save-dev git://github.com/xmlking/grunt-traceur.git

`traceur-compiler` offline ES6 to ES5 compile also need traceur-runtime.js
bower install --save traceur-runtime 
 or manually add bin/traceur-runtime.js to your html. 
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-traceur');
```

## The "traceur" task

### Overview

Here is how I changed Yeoman's `generator-angular` plugin generated `Gruntfile.js` file after creating angular seed project with: 

```
yo angular [app-name]
```

[Angular Gruntfile.js File](/Yeoman-Angular-Gruntfile.js)

In your project's Gruntfile, add a section named `traceur` to the data object passed into `grunt.initConfig()`.
This example below compiles all *.es6.js files into *.js files in the same location. 


```js
grunt.initConfig({

   traceur: { // SUMO
      options: {
        experimental: true,
        sourceMaps: true,
        typeAssertions: true,
        validate: true,
        modules: 'amd',
        //freeVariableChecker: true,
        commentCallback: true,
        debug: true
      },
      custom: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/scripts/',
            src: ['**/*.js'], //src: ['**/*.es6.js'],
            dest: '<%= yeoman.app %>/build/',
            ext: '.js'
          }
        ]
      }
    },...

}, ...
```
Optionally add traceur to watch.

```js
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all','newer:traceur'], //traceur watch
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/views/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
```
Once the files have ben transpiled into ES3, you can minify or concat them. 

### Options

Any specified option will be passed through directly to traceur, thus you can specify any option that traceur supports.

Some common options:

* `experimental` - Turn on all experimental features
* `sourceMaps`  - Turn on sourceMaps generation 
* `typeAssertions`  - Turn ontypeAssertions
* `freeVariableChecker`  - Turn on freeVariableChecker // not recommended for angular project.
* `commentCallback`  - Turn on commentCallback
* `debug`  - Turn on debug

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
