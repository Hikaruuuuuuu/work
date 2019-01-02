
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver'),
    fs = require('fs'),
    path = require('path'),
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