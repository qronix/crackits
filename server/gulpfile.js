const path              = require('path');
const gulp              = require('gulp');
const connect           = require('gulp-connect');
const nodemon           = require('gulp-nodemon');
const browserSync       = require('browser-sync').create();
const autoprefixer      = require('gulp-autoprefixer');
const gulpConcat        = require('gulp-concat');
const cleanCSS          = require('gulp-clean-css');
const souremaps         = require('gulp-sourcemaps');
const uglifyES          = require('gulp-uglify-es').default;
const image             = require('gulp-image');
const CSS_PATH          = '../public/css/**/*.css';
const SCRIPTS_PATH      = '../public/js/**/*.js';
const IMAGES_PATH       = '../public/img/**/*';
const DIST_PATH         = '../public/dist';

gulp.task('images',()=>{
    return gulp.src(IMAGES_PATH)
    .pipe(image())
    .pipe(gulp.dest(path.join(DIST_PATH,'/img')));
});

gulp.task('scripts',()=>{
    console.log('Running scripts task');
    return gulp.src(SCRIPTS_PATH)
    .pipe(uglifyES())
    .pipe(gulp.dest(DIST_PATH+'/js'))
    .pipe(browserSync.stream());
});

gulp.task('styles',()=>{
    console.log('Running styles task');
    return gulp.src(CSS_PATH)
    .pipe(souremaps.init())
    .pipe(autoprefixer())
    .pipe(gulpConcat('styles.css'))
    .pipe(cleanCSS())
    .pipe(souremaps.write())
    .pipe(gulp.dest(DIST_PATH+'/css'))
    .pipe(browserSync.stream());
});

gulp.task('connect',()=>{
    connect.server({
        root:'../public',
        livereload:true
    });
});

gulp.task('watch',()=>{
    console.log('Starting watch');
    gulp.watch(SCRIPTS_PATH,gulp.series(['scripts']));
    gulp.watch(CSS_PATH,gulp.series(['styles']));
});

gulp.task('gulp_nodemon',()=>{
    nodemon({
        script:'./server.js',
        ext:'js,html,css,hbs',
        env:{'NODE_ENV':'development'}
    });
});
gulp.task('sync',()=>{
    browserSync.init({
        injectChanges:true,
        port:3002,
        proxy:'http://localhost:3000',
        ui:{port:3003},
        reloadDelay:1000
    });
});
gulp.task('test',gulp.series('scripts','styles'));

gulp.task('default',gulp.series(gulp.parallel('gulp_nodemon','sync','watch')),function(){});