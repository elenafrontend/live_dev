const { src, dest, watch, parallel, series } = require('gulp');
const pug = require('gulp-pug');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const svgSprite = require('gulp-svg-sprite');
const gulpStylelint = require('gulp-stylelint');

function browsersync() {
	browserSync.init({
			server: {
					baseDir: 'src/'
			}
	})
}

function html() {
	return src('src/pug/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(dest('src'))
}

function scripts() {
	return src(
		// e.g. 'node_modules/jquery/dist/jquery.js'
		'src/js/script.js'
	)
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(dest('src/js'))
		.pipe(browserSync.stream())
}

// rename, autoprefixer
function styles() {
  return src('src/scss/style.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 version'],
			grid: true
		}))
		.pipe(concat('style.min.css'))
		.pipe(dest('src/css'))
		.pipe(browserSync.stream())
};

function towebp() {
	return src('src/images/**/*')
	.pipe(webp({
		quality: 100
	}))
	.pipe(dest('src/images'))
}

function images() {
	return src('src/images/*')
		.pipe(imagemin(
			[
				imagemin.gifsicle({interlaced: true}),
				imagemin.mozjpeg({quality: 75, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
						plugins: [
								{removeViewBox: true},
								{cleanupIDs: false}
						]
				})
		]
		))
		.pipe(dest('dist/images'))
}

function svg() {
	return src('src/images/svg/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg",
					example: true,
				},
			},
		}))
		.pipe(dest('src/images'))
}

function watching() {
	watch(['src/pug/**/*.pug'], html);
	watch(['src/scss/**/*.scss'], styles);
	watch(['src/js/**/*.js', '!src/js/script.min.js'], scripts);
	watch('src/*.html').on('change', browserSync.reload);
};

function cleanDist() {
	return del('dist')
}

function lintCss() {
	return src('src/scss/modules/button.scss')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
}

function build() {
	return src([
		'src/css/style.min.css',
		'src/fonts/**/*',
		'src/js/script.min.js',
		'src/*.html',
	], {base: 'src'})
		.pipe(dest('dist'))
}


exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.towebp = towebp;
exports.images = images;
exports.cleanDist = cleanDist;
exports.svg = svg;
exports.lintCss = lintCss;

exports.default = parallel(html, styles, scripts, watching, browsersync);
exports.build = series(cleanDist, images, build);

