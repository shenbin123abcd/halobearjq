'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('css', function () {
    return gulp.src([
        'css/lib/bootstrap/dist/css/bootstrap.min.css',
        'css/lib/weui/dist/style/weui.min.css',
    ])
        .pipe(plugins.concat(`lib.css`))
        .pipe(plugins.csso())
        .pipe(plugins.rev())
        .pipe(gulp.dest('../../../Public/Wfc2016/customlib/css'));
});


gulp.task('clean', require('del').bind(null, [
    '../../../Public/Wfc2016/customlib/css/*',
],{force:true}));

gulp.task('default',['clean'], function(){
    gulp.start([
        'css'
    ]);
});
