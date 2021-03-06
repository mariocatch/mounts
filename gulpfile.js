var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var filter = require('gulp-filter');

var debug = require('gulp-debug');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
	bootstrapRoot: './node_modules/bootstrap/dist/',
	jqueryRoot: './node_modules/jquery/dist/'
};

gulp.task('html', function() {
	gulp.src('app/index.html')
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function() {
	gulp.src('./app/images/**/*')
		.pipe(gulp.dest('public/images'));
})

gulp.task('scripts', function() {
	var jqueryFilter = filter('site.js');

	gulp.src([
		'./app/scripts/**/*.js',
		config.jqueryRoot + '*.min.js'
		])
		.pipe(jqueryFilter)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jqueryFilter.restore())
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function() {
	gulp.src('app/styles/**/*.css')
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('bootstrap-styles', function() {
	return gulp.src(config.bootstrapRoot + 'css/*.min.css')
		.pipe(gulp.dest('public/css'));
});

gulp.task('bootstrap-scripts', function() {
	return gulp.src(config.bootstrapRoot + 'js/*.min.js')
		.pipe(gulp.dest('public/js'));
});

gulp.task('bootstrap-fonts', function() {
	return gulp.src(config.bootstrapRoot + 'fonts/*')
		.pipe(gulp.dest('public/fonts'));
});

gulp.task('bootstrap', ['bootstrap-styles', 'bootstrap-scripts', 'bootstrap-fonts']);

gulp.task('default', ['html', 'scripts', 'styles', 'images', 'bootstrap']);

gulp.task('serve', function() {
	browserSync({
		server: './public'
	});

  	gulp.watch('app/styles/**/*.css', ['styles']);
  	gulp.watch('app/scripts/**/*.js', ['scripts']);
  	gulp.watch('app/*.html', ['html']);
});