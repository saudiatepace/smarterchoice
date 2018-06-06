'use strict';

var gulp      = require('gulp');
var selenium  = require('selenium-standalone');
var webdriver = require('gulp-webdriver');

// task to run test in jenkins
gulp.task('jenkins-test', function() {

	return gulp.src('wdio-jenkins.conf.js')
		.pipe(webdriver({
			type: 'selenium'
		}))
		.on('error', function(err) {
			throw err;
		})
});

// task to execute specific test
gulp.task('test', function() {

	return gulp.src('wdio.conf.js')
		.pipe(webdriver({
			type: 'selenium'
		}))
		.on('error', function(err) {
			throw err;
		})
});
