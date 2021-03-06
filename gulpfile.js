/*global require: true */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var qunit = require('node-qunit-phantomjs');
var eslint = require('gulp-eslint');

var files = [
	'src/interceptor.js'
];

var testFiles = [];

gulp.task('lint', function () {
	var allFiles = files.concat(testFiles);
	return gulp.src(allFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('minify', ['lint'], function () {
	gulp.src(files)
		.pipe(concat('interceptor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build'));
});

gulp.task('qunit', ['minify'], function () {
	qunit('tests/testrunner.html', {
		'verbose': false
	});
});

gulp.task('qunit-release', ['qunit'], function () {
	qunit('tests/testrunner-release.html', {
		'verbose': false
	});
});

gulp.task('default', ['lint', 'minify', 'qunit', 'qunit-release']);
