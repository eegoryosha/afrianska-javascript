const gulp = require('gulp');
const {src, dest} = require('gulp');

const browsersync = require('browser-sync').create();
const del = require('del');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');


let project_folder = 'dist';
let source_folder = 'src';

// объект, который содержит различные пути к файлам и папкам
let path = {
    // куда gulp будет выгружать уже обработанный файл
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        icons: project_folder + '/icons/',
        fonts: project_folder + '/fonts/'
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/scss/style.scss',
        js: source_folder + '/js/index.js',
        img: source_folder + '/assets/img/**/*.+(png|jpg|gif|ico|svg|webp)',
        icons: source_folder + '/assets/icons/*.svg',
        fonts: source_folder + '/assets/fonts/*.ttf'
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/**/*.js',
        img: source_folder + '/assets/img/**/*.+(png|jpg|gif|ico|svg|webp)',
        icons: source_folder + '/assets/icons/*.svg',
        fonts: source_folder + '/assets/fonts/*.(ttf|otf|woff|woff2)'
    },
    // clean нужен для того, чтобы папка с проектом удалялась каждый раз, как мы запускаем Gulp
    clean: './' + project_folder + '/'
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/' // базовая папка
        },
        port: 3000, // порт
        notify: false // оповещение
    });
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], script);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.icons], icons);
    gulp.watch([path.watch.fonts], fonts);
}

function clean(params) {
    return del(path.clean);
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(groupMedia())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            grid: true
        }))
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function script() {
    return src(path.src.js)
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function icons() {
    return src(path.src.icons)
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons.svg',
                    example: true
                }
            }
        }))
        .pipe(dest(path.build.icons))
        .pipe(browsersync.stream());
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}



let build = gulp.series(clean, gulp.parallel(css, html, script, images, icons, fonts)); // запускает команды по очереди
let watch = gulp.parallel(build, watchFiles, browserSync); // запускает команды одновременно

exports.fonts = fonts;
exports.icons = icons;
exports.images = images;
exports.script = script;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;

exports.default = watch; // при запуске галпа, это будет выполняться по умолчанию
