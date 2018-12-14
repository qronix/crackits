const path              = require('path');
const gulp              = require('gulp');
const livereload        = require('gulp-livereload');
const autoprefixer      = require('gulp-autoprefixer');
const gulpConcat        = require('gulp-concat');
const cleanCSS          = require('gulp-clean-css');
const souremaps         = require('gulp-sourcemaps');
const uglifyES          = require('gulp-uglify-es').default;
const plumber           = require('gulp-plumber');
const image             = require('gulp-image');
const CSS_PATH          = 'public/css/**/*.css';
const SCRIPTS_PATH      = 'public/scripts/**/*.js';
const IMAGES_PATH       = 'public/img/**/*';
const DIST_PATH         = 'public/dist';

gulp.task('images',()=>{
    return gulp.src(IMAGES_PATH)
    .pipe(image())
    .pipe(gulp.dest(path.join(DIST_PATH,'/img')));
});

gulp.task('scripts',()=>{
    return gulp.src(SCRIPTS_PATH)
    .pipe(plumber(()=>{
        console.log(`Scripts task error: ${err}`);
        this.emit('end');
    }))
    .pipe(uglifyES())
    .pipe(gulp.dest(path.join(DIST_PATH,'/js')))
    .pipe(livereload());
});

gulp.task('styles',()=>{
    return gulp.src(CSS_PATH)
    .pipe(plumber(()=>{
        console.log(`Styles task error: ${err}`);
        this.emit('end');
    }))
    .pipe(souremaps.init())
    .pipe(autoprefixer())
    .pipe(gulpConcat('styles.css'))
    .pipe(cleanCSS())
    .pipe(souremaps.write())
    .pipe(gulp.dest(path.join(DIST_PATH,'/css')))
    .pipe(livereload());
});

gulp.task('watch',()=>{
    gulp.watch(CSS_PATH,gulp.series(['styles']));
    gulp.watch(SCRIPTS_PATH,gulp.series(['scripts']));
});

gulp.task('test',gulp.series('scripts','styles'));

gulp.task('default',gulp.series(gulp.parallel('watch')),function(){});