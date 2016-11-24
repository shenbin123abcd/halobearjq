    'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var browserSync = require('browser-sync').create();
var devip = require('dev-ip');
//console.log(devip());
gulp.task('generateDistVersion', function () {
    var version=(new Date().getTime());
    fs.writeFileSync('app/js/appConfig.dist.js',
        `
(function(){
    "use strict";

    window.appConfig={};
    window.appConfig.debug=false;
    window.appConfig.version='1.0.0';

    if(window.appConfig.debug){
        window.appConfig.bust='?v='+(new Date().getTime());
        window.appConfig.staticUrl=window.location.protocol+'//'+window.location.hostname+':9011/app/public';
    }else{
        window.appConfig.bust='?v='+${version};
        window.appConfig.staticUrl='';
    }
}());
    `
    );
});
gulp.task('clearDistVersion',['build'], function () {
    fs.writeFileSync('app/js/appConfig.dist.js','');
});

gulp.task('sass', function () {
    return gulp.src(['app/css/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compact'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'));
});





gulp.task('images', function () {
    return gulp.src(['app/images/**/*.{png,gif,jpg,svg,mp3,mp4}','!app/images/src/**/*'])
        // .pipe(plugins.imagemin())
        .pipe(plugins.rev())
        .pipe(gulp.dest('../../../Public/Wfc2016/year/images'))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest('tmp/images'))
});


gulp.task('haloIcon', function () {
    return gulp.src('app/css/lib/ux_*/*iconfont.*')
        .pipe(plugins.flatten())
        .pipe(gulp.dest('../../../Public/Wfc2016/year/css'))
});


gulp.task('build', ['sass','images','generateDistVersion','haloIcon'], function () {
    var htmlFilter = plugins.filter('*.html',{restore: true});
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    var manifestHtml = gulp.src("tmp/images/rev-manifest.json");
    var manifestCss = gulp.src("tmp/images/rev-manifest.json");
    var manifestJs = gulp.src("tmp/images/rev-manifest.json");
    return gulp.src(['app/*.html'])
        .pipe(plugins.useref())
        .pipe(jsFilter)
        .pipe(plugins.revReplace({manifest: manifestJs}))
        .pipe(plugins.cdnizer({
            //defaultCDNBase: "/Public/Wfc2016/year",
            defaultCDNBase: "http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/year",
            allowRev: true,
            allowMin: true,
            matchers: [
                /(["'`])(.+?)(["'`])/gi,
            ],
            fallback: false,
            files: [
                'images/**/*',
                'images/',
            ]
        }))
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(gulp.dest('../../../Public/Wfc2016/year'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.revReplace({manifest: manifestCss}))
        .pipe(plugins.autoprefixer({
            browsers:  ['> 0%'],
            cascade: false
        }))
        .pipe(plugins.csso())
        .pipe(plugins.rev())
        .pipe(gulp.dest('../../../Public/Wfc2016/year'))
        .pipe(cssFilter.restore)
        .pipe(plugins.revReplace({
            replaceInExtensions: ['.js', '.css', '.html', '.ejs']
        }))
        .pipe(htmlFilter)
        .pipe(plugins.revReplace({manifest: manifestHtml}))
        .pipe(plugins.cdnizer({
             //defaultCDNBase: "/Public/Wfc2016/year",
            defaultCDNBase: "http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/year",
            allowRev: true,
            allowMin: true,
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                'js/**/*.js',
                'images/**/*',
            ]
        }))
        .pipe(plugins.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[\s\S]*?\?>/, /<include[\s\S]*?\/>/,/<else\/>/ ],
            minifyJS: false,
            minifyCSS: false,
        }))
        .pipe(gulp.dest('../../../Modules/Wfc2016/Tpl/Year'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        ui: false,
        //notify: false,
        port: 9011,

        server: {
            baseDir: "./",
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            },
        }
    });

});



gulp.task('copy:dev:style',['sass'], function () {
    return gulp
        .src('app/public/css/**/*.{css,map}')
        .pipe(gulp.dest('publicTest/css'));
});


gulp.task('copy:view', function () {
    var htmlFilter = plugins.filter('*.html',{restore: true});
    return gulp
        .src(['app/*.html'])
        .pipe(htmlFilter)
        .pipe(plugins.cdnizer({
            defaultCDNBase: "http://"+devip()[0]+":9011/app",
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                {
                    file: 'js/**/*.js',
                    cdn: "http://"+devip()[0]+":9011/tmp/js/${ filename }"
                },
                'images/**/*.{jpg,png,mp3,mp4}',
            ]
        }))
        // .pipe(plugins.cdnizer({
        //     defaultCDNBase: "http://"+devip()[0]+":9000/",
        //     //defaultCDNBase: "../",
        //     allowRev: true,
        //     allowMin: true,
        //     relativeRoot: 'app/public',
        //     files: [
        //         // Thi
        //         // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
        //         'node_modules/**/*.css',
        //         'node_modules/**/*.js',
        //         'bower_components/**/*.css',
        //         'bower_components/**/*.js',
        //         //'public/images/**/*.{jpg,png,mp3,mp4}',
        //     ]
        // }))

        .pipe(gulp.dest('../../../Modules/Wfc2016/Tpl/Year'))

        ;
});

    gulp.task('copy:js', function () {
        return gulp
            .src(['app/js/*.js'])
            .pipe(plugins.cached('myjs'))
            .pipe(plugins.cdnizer({
                defaultCDNBase: "http://"+devip()[0]+":9011/app",
                //defaultCDNBase: "../",
                allowRev: true,
                allowMin: true,
                matchers: [
                    /(["'`])(.+?)(["'`])/gi,
                ],
                fallback: false,
                files: [
                    'images/**/*',
                    'images/',
                ]
            }))
            .pipe(plugins.babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('tmp/js'))

            ;
    });


gulp.task('clean', require('del').bind(null, [ 
    '../../../Public/Wfc2016/year/*',
    '../../../Modules/Wfc2016/Tpl/Year/*',
],{force:true}));



gulp.task('default', ['clean'], function() {
    //gulp.start('build');
    gulp.start('clearDistVersion');
});



gulp.task('dev', ['clean'], function() {
    gulp.start('watch:dev');
});



gulp.task("watch:dev", ['browser-sync','copy:view','sass','copy:js'], function(){
    gulp.watch(['app/*.html'],function(event) {
        //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('copy:view');

    });
    gulp.watch(['app/js/*.js'],function(event) {
        //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('copy:js');

    });

});



