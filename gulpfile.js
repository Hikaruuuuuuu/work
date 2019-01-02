
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver'),
    fs = require('fs'),
    path = require('path'),
    //babel = require('gulp-babel'),
    url = require('url');

// 启动web服务 src
gulp.task('serversrc', function(){
    return serverRun('src')
})

// 启动web服务 dist
gulp.task('serverdist', function(){
    return serverRun('dist')
})

function serverRun(serverPath){
    return gulp.src(serverPath)
        .pipe(server({
            port: 8000,
            open: true,
            livereload: true,  //自动刷新
            middleware: function(req, res, next){
                var pathname = url.parse(req.url).pathname;
                if(pathname == '/favicon.ico'){
                    return res.end()
                }

                pathname = pathname == '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, serverPath, pathname)))
            }
        }))
}

//编译sass 压缩css
gulp.task('sass', function(){
    return gulp.src('./src/scss/*.scss')  // 切记return
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})

// 编译js 压缩并合并js
gulp.task('uglify', function(){
    return gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))  // 编译
        .pipe(concat('all.js'))  // 合并
        .pipe(uglify())  // 压缩
        .pipe(gulp.dest('./src/jsmin'))
})


//监听 js css 
gulp.task('watch', function(){
    gulp.watch('./src/js/*.js', gulp.series('uglify'))
    gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})
