'use strict';



// Style related variables
var styleSrc        = './assets/sass/style.sass';	// Source for main .sass stylesheet
var styleDest       = './css/';							// Destination folder for compiled css file
var styleWatchFiles = './assets/sass/**/*.sass'; 	// Files to watch for sass files changes
var styleFileName   = 'style.css'
var mapsDest        = './'; 						// Destination to save css map file
//var maxLineLen      = 800 							// Maximum line to merge into one line for minification
var allStyles       = 'css/**/*.css'


/**
 * Load Plugins
 *
 * Load gulp plugins 
 */
var gulp       = require('gulp');

//CSS related plugins
var sass       = require('gulp-sass');
var minifycss  = require('gulp-uglifycss');

// Utility Plugins
var sourcemaps = require('gulp-sourcemaps');



/**
 * Task `styles`
 *
 * Tasks 
 * 	1. Compiles sass
 * 	2. Generate sourcemaps
 * 	3. Autoprefix CSS
 * 	4. Minify CSS
 */
gulp.task( 'style', function(){
	gulp.src( styleSrc )

		.pipe( sourcemaps.init() )

		// Compile SASS
		.pipe( sass({
			outputStyle : 'expanded'
		})).on('error', sass.logError)

		// // Write Source maps
		// .pipe( sourcemaps.write({
		// 	includeContent: false
		// }))
		
		// .pipe( sourcemaps.init({ loadMaps: true }))

		// // Minify CSS
		// .pipe ( minifycss( {
		// 	// maxLineLen: maxLineLen,
		// 	sourceMap: true
		// }))

		.pipe( sourcemaps.write( mapsDest ) )

		.pipe( gulp.dest( styleDest ) )
});

gulp.task( 'default', [ 'style' ], function(){
	gulp.watch( styleWatchFiles, ['style']);
} );