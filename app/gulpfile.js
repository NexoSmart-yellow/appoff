/**
 * Dependencies
 */
var gulp    = require('gulp'),
	clean   = require('gulp-clean'),
	rev     = require('gulp-rev'),
	rev_col = require('gulp-rev-collector');

/**
 * App cache revision
 */
/* clean prev rev */
gulp.task('clean:app', function() {
	return gulp
		.src(['./rev/functions-*', './rev/styles-sub-paneles-*', 'views/includes/rev/footer-web.php', 'views/includes/rev/header-web.php'], {read: false})
		.pipe(clean());
});

/* copy files to cache rev */
gulp.task('copy:app', function() {
	return gulp
		.src(['views/includes/footer-web.php', 'views/includes/header-web.php'])
		.pipe(gulp.dest('views/includes/rev'));
});

gulp.task('rev:app', function() {
	return gulp
		.src(['./js/functions.js', './assets/scss/styles-pages/styles-sub-paneles.css'])
		.pipe(rev())
		.pipe(gulp.dest('./rev/'))
		.pipe(rev.manifest('rev.json'))
		.pipe(gulp.dest('./'));
});

gulp.task('rev:app:update', function() {
	return gulp
		.src(['./rev.json', 'views/includes/rev/header-web.php', 'views/includes/rev/footer-web.php'])
		.pipe(rev_col())
		.pipe(gulp.dest('views/includes/rev'));
});

gulp.task('app:build', gulp.series('clean:app', 'copy:app', 'rev:app', 'rev:app:update'));

