(function () {
  'use strict';

  module.exports = function(grunt) {
    //grunt plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-npm');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
      jshint: {
        all: ['Gruntfile.js', 'src/*.js', 'test/*.js']
***REMOVED***,
      jscs: {
        src: ['src/**/*.js', 'test/**/*.js'],
        options: {
        ***REMOVED*** ".jscs.json"
  ***REMOVED***
***REMOVED***,
      karma: {
        unit: { configFile: 'karma.conf.js' ***REMOVED***,
        'unit.min': {
          configFile: 'karma.min.conf.js'
  ***REMOVED***,
        autotest: {
          configFile: 'karma.conf.js',
          autoWatch: true,
          singleRun: false
  ***REMOVED***,
        travis: {
          configFile: 'karma.conf.js',
          reporters: 'dots',
          browsers: ['PhantomJS']
  ***REMOVED***
***REMOVED***,
      uglify: {
        all: {
          files: {
            'tmhDynamicLocale.min.js': ['src/*.js']
    ***REMOVED***,
          options: {
            sourceMap: true
    ***REMOVED***
  ***REMOVED***
***REMOVED***,
      bump: {
        options: {
          files: ['package.json', 'bower.json'],
          commitFiles: ['package.json', 'bower.json'],
          tagName: '%VERSION%',
          pushTo: 'origin'
  ***REMOVED***
***REMOVED***,
      'npm-publish': {
         options: {
           requires: ['jshint', 'karma:unit', 'bump'],
           abortIfDirty: true
   ***REMOVED***
***REMOVED***
    ***REMOVED***);
    grunt.registerTask('release', ['jshint', 'jscs', 'karma:unit', 'uglify:all', 'karma:unit.min', 'bump', 'publish']);
  ***REMOVED***;
***REMOVED***());

