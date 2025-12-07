const plugins = [
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/jquery-validation/dist/jquery.validate.js',
	'node_modules/slick-slider/slick/slick.min.js',
	'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
];
const {
	src,
	dest
} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');
const chalk = require('chalk');

module.exports = function libs_js(done) {
	if (plugins.length > 0)
		return src(plugins)
			.pipe(map.init())
			.pipe(uglify())
			.pipe(concat('libs.min.js'))
			.pipe(map.write('../sourcemaps'))
			.pipe(dest('build/js/'))
	else {
		return done(console.log(chalk.bgYellow(`${chalk.bold('WARNING!')} You did not add any JavaScript plugins.`)));
	}
}
