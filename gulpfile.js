const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const watch = require('gulp-watch')

const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')


// задача компиляции scss
gulp.task('scss', function (callback) { // ф-я возвращает
    return gulp.src('./app/scss/main.scss') // берем файл по указанному пути 
        .pipe(sourcemaps.init())
        .pipe(sass()) // преобразуем в плагине sass
        .pipe(autoprefixer({
            // overrideBrowserlist: ['last 4 version']
            overrideBrowserslist: ['last 16 versions']
        })) //вызываем autoprefixer
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/css/')) // записываем его по пути ...
    callback()
})

//задача наблюдения для файлов страницы
gulp.task('watch', function () {
    watch(['./app/*.html', './app/css/**/*.css'], gulp.parallel(browserSync.reload))
    //слежение за  SCSS и компиляция их в CSS с задержкой в 1 секунду через setTimeout() - чтобы файл scss успел сохраниться на диск до компиляции и не вылетал на ошибку
    watch('./app/scss/**/*.scss', function () {
        setTimeout(gulp.parallel('scss'))
    }, 1000)
});



// Static server задаче для старта сервера из папки app
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('default', gulp.parallel('server', 'watch', 'scss'));