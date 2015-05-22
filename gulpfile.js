var gulp = require('gulp');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var useref = require('gulp-useref');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('html', function() {
	gulp.src('app/index.html')
		.pipe(useref())
		.pipe(gulp.dest('public'));
		// TODO: reload.
});

gulp.task('scripts', function() {
	gulp.src('app/scripts/**/*.js')
		.pipe(gulp.dest('public/js'));
		// TODO: reload.
});

gulp.task('default', ['html', 'scripts'], function() {
	console.log('Default task!');
});

gulp.task('serve', function() {
	browserSync({
		server: './public'
	});

  	//gulp.watch('app/styles/**/*.scss', ['styles']);
  	//gulp.watch('app/scripts/**/*.js', ['scripts']);
  	//gulp.watch('app/*.html', ['html']);
});