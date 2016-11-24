'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var browserSync = require('browser-sync').create();
var devip = require('dev-ip');
var merge = require('merge-stream');
var buffer = require('vinyl-buffer');
var tiny = require('gulp-tinypng-nokey');
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
        window.appConfig.staticUrl=window.location.protocol+'//'+window.location.hostname+':9070/app/public';
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

gulp.task('sass',['images'], function () {
    return gulp.src(['app/css/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compact'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'));
});

gulp.task('react',['images'], function () {
    var manifestJs = gulp.src("tmp/images/rev-manifest.json");
    return gulp.src(['app/js/*.jsx'])
        .pipe(sourcemaps.init())
        .pipe(plugins.revReplace({manifest: manifestJs}))
        .pipe(plugins.cdnizer({
            // defaultCDNBase: "/Public/Wfc2016/props",
            defaultCDNBase: "http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/props",
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            matchers: [
                /(<img\s.*?src=\{["'`])(.+?)(["'`]\}.*?>)/gi
            ],
            files: [
                'images/**/*',
            ]
        }))
        .pipe(plugins.babel({
            presets: ['react','es2015']
        }))
        .on('error', function(e) {
            console.error(e);
            this.emit('end');
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js'))
});

gulp.task('haloIcon', function () {
    return gulp.src('app/css/lib/ux_*/*iconfont.*')
        .pipe(plugins.flatten())
        .pipe(gulp.dest('../../../Public/Wfc2016/props/css'))
});


gulp.task('images',['css-s'], function () {
    return gulp.src(['app/images/**/*.{jpg,png,gif,svg}','!app/images/ico/*','!app/images/src/**/*'])
        // .pipe(plugins.imagemin())
        .pipe(plugins.rev())
        .pipe(gulp.dest('../../../Public/Wfc2016/props/images'))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest('tmp/images'))
});





gulp.task('build', ['sass','generateDistVersion','haloIcon','react'], function () {
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
            // defaultCDNBase: "/Public/Wfc2016/props",
            defaultCDNBase: "http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/props",
            allowRev: true,
            allowMin: true,
            matchers: [
                // /(wScratchPad\([\s\S]*bg[\s\S]*?["'`])(.+?)(["'`].*?)/gi,
                // /(wScratchPad\([\s\S]*fg[\s\S]*?["'`])(.+?)(["'`].*?)/gi,
                // /(css\([\s\S]*background[\s\S]*?["'`])(.+?)(["'`].*?)/gi,
                 /(<img[\s\S]*?data-original=["'])(.+?)(["'][\s\S]*?>)/gi,
                /(["'`])(.+?)(["'`])/gi,
            ],
            fallback: false,
            files: [
                'images/**/*',
            ]
        }))
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(gulp.dest('../../../Public/Wfc2016/props'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.revReplace({manifest: manifestCss}))
        .pipe(plugins.autoprefixer({
            browsers:  ['> 0%'],
            cascade: false
        }))
        .pipe(plugins.csso())
        .pipe(plugins.rev())
        .pipe(gulp.dest('../../../Public/Wfc2016/props'))
        .pipe(cssFilter.restore)
        .pipe(plugins.revReplace({
            replaceInExtensions: ['.js', '.css', '.html', '.ejs']
        }))
        .pipe(htmlFilter)
        .pipe(plugins.revReplace({manifest: manifestHtml}))
        .pipe(plugins.cdnizer({
            // defaultCDNBase: "/Public/Wfc2016/props",
            defaultCDNBase: "http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/props",
            allowRev: true,
            allowMin: true,
            matchers: [
                /(<img[\s\S]*?data-original=["'])(.+?)(["'][\s\S]*?>)/gi,
            ],
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                'js/**/*.js',
                'images/**/*.{jpg,png,mp3,mp4}',
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
        .pipe(gulp.dest('../../../Modules/Wfc2016/Tpl/Props'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        ui: false,
        //notify: false,
        port: 9070,

        server: {
            baseDir: "./",
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            },
        }
    });

});





gulp.task('copy:view', function () {
    var htmlFilter = plugins.filter('*.html',{restore: true});
    return gulp
        .src(['app/*.html'])
        .pipe(htmlFilter)
        .pipe(plugins.cdnizer({
            defaultCDNBase: "http://"+devip()[0]+":9070/app",
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            matchers: [
                /(<img[\s\S]*?data-original=["'])(.+?)(["'][\s\S]*?>)/gi,
            ],
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                {
                    file: 'js/**/*.js',
                    cdn: "http://"+devip()[0]+":9070/tmp/js/${ filename }"
                },
                // 'js/**/*.js',
                'images/**/*.{jpg,png,mp3,mp4,svg}',
            ]
        }))

        // .pipe(plugins.cdnizer({
        //     defaultCDNBase: "http://"+devip()[0]+":9070/",
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

        .pipe(gulp.dest('../../../Modules/Wfc2016/Tpl/Props'))

        ;
});

gulp.task('copy:js', function () {
    return gulp
        .src(['app/js/*.js','app/js/qiniu/*.js','!app/js/app.detail.js'])
        .pipe(plugins.cached('myjs'))
        .pipe(plugins.cdnizer({
            defaultCDNBase: "http://"+devip()[0]+":9070/app",
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            matchers: [
                // /(wScratchPad\([\s\S]*bg[\s\S]*?["'`])(.+?)(["'`].*?)/gi,
                // /(wScratchPad\([\s\S]*fg[\s\S]*?["'`])(.+?)(["'`].*?)/gi,
                // /(css\([\s\S]*background[\s\S]*?["'`])(.+?)(["'`].*?)/gi,
                 /(<img[\s\S]*?data-original=["'])(.+?)(["'][\s\S]*?>)/gi,
                /(["'`])(.+?)(["'`])/gi,
            ],
            fallback: false,
            files: [
                'images/**/*',
            ]
        }))
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .on('error', function(e) {
            console.error(e);
            this.emit('end');
        })
        .pipe(gulp.dest('tmp/js'))

        ;
});

gulp.task('copy:jsx', function () {
    return gulp.src(['app/js/*.jsx'])
        .pipe(plugins.cached('myreactjs:dev'))
        .pipe(plugins.cdnizer({
            defaultCDNBase: "http://"+devip()[0]+":9070/app",
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            matchers: [
                /(<img\s.*?src=\{["'`])(.+?)(["'`]\}.*?>)/gi,
            ],
            files: [
                'images/**/*',
            ]
        }))
        .pipe(sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['react','es2015']
        }))
        .on('error', function(e) {
            console.error(e);
            this.emit('end');
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('tmp/js'));
});



gulp.task('clean', require('del').bind(null, [ 
    '../../../Public/Wfc2016/props/*',
    '../../../Modules/Wfc2016/Tpl/Props/*',
    'tmp/*',
],{force:true}));



gulp.task('default', ['clean'], function() {
    //gulp.start('build');
    gulp.start('clearDistVersion');
});



gulp.task('dev', ['clean'], function() {
    gulp.start('watch:dev');
});



gulp.task("watch:dev", ['browser-sync','copy:view','sass','copy:js','copy:jsx'], function(){
    gulp.watch(['app/*.html'],function(event) {
        //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('copy:view');

    });
    gulp.watch(['app/js/*.js'],function(event) {
        //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('copy:js');

    });
    gulp.watch(['app/js/*.jsx'],function(event) {
        //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('copy:jsx');

    });
    

});

gulp.task('css-s', function () {
    var spriteData = gulp.src(['app/images/restnumber/*.png','app/images/hsz_sprites/*.png']).pipe(plugins.spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        // algorithm: 'diagonal',
        imgPath  : '../images/sprite.png',
        padding  : 1,
        cssVarMap: function (sprite) {
            sprite.name = 'props-s-' + sprite.name;
        }
    }));
    // Pipe image stream through image optimizer and onto disk

    var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        // .pipe(plugins.imagemin())
        //.pipe(tiny())
        .pipe(gulp.dest('app/images'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(gulp.dest('app/css'));
    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
    //return spriteData.pipe(gulp.dest('ieupdate/dist'))
});
