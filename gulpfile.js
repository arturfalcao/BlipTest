var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
var browserify = require('browserify')
var source = require('vinyl-source-stream')


gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: 4000
	})
})

gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./app/app.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
})


gulp.task('assets', function() {
	gulp.src(['app/assets/**/*'])
	.pipe(gulp.dest('public/css/assets'));
	gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('public/css/assets/fonts'));	
})

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify'])
	// Watches for changes in style.sass and runs the sass task
	gulp.watch('app/sass/style.scss', ['sass'])
})


gulp.task('sass', function() {
	return sass('app/sass/style.scss')
		.pipe(gulp.dest('public/css'))
})

// Copy Bootstrap core files from node_modules to vendor directory
gulp.task('bootstrap', function() {
    return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('public/vendor/bootstrap'))
})

// Copy jQuery core files from node_modules to vendor directory
gulp.task('jquery', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('public/vendor/jquery'))
})



gulp.task('default', ['bootstrap', 'jquery','connect', 'watch','assets'])