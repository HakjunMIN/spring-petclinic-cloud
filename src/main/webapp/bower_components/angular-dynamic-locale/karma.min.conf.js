module.exports = function(config) {
  config.set({
    autoWatch: false,
    singleRun: true,
    logLevel: config.LOG_INFO,
    logColors: true,
    browsers: ['Chrome'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-mocks/angular-mocks.js',
      {pattern: 'node_modules/angular-i18n/*.js', included: false, served: true***REMOVED***,
      '*.min.js',
      'test/*Spec.js'
    ],
    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    ***REMOVED***,
    frameworks: ['jasmine']
  ***REMOVED***);
***REMOVED***;
