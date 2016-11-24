app.cover=(function(){
    "use strict";

    function init(){
        initLoading();
        initLight();
        initImg();
        initNum();
    }



    function initLoading(){



        // bar.animate(1.0);  // Number from 0.0 to 1.0
        var fileArray=[
            'images/propscover/light-1.png',
            'images/propscover/light-2.png',
            'images/propscover/lightbox.png',
            'images/propscover/num-bg.png',
            'images/propscover/props-cover-bt-1.png',
            'images/propscover/props-cover-bt-2.png',
            'images/propscover/rest-bg.png',
        ];

        var id=hb.location.url('?id');

        switch(id){
            case '1000':
                fileArray=fileArray.concat(['images/propscover/props-bg-1000.jpg','images/propscover/title-1000.png']);
                break;
            case '1001':
                fileArray=fileArray.concat(['images/propscover/props-bg-1001.jpg','images/propscover/title-1001.png']);
                break;
            case '1002':
                fileArray=fileArray.concat(['images/propscover/props-bg-1002.jpg','images/propscover/title-1002.png']);
                break;
            case '1003':
                fileArray=fileArray.concat(['images/propscover/props-bg-1003.jpg','images/propscover/title-1003.png']);
                break;
            case '1004':
                fileArray=fileArray.concat(['images/propscover/props-bg-1004.jpg','images/propscover/title-1004.png']);
                break;
            case '1005':
                fileArray=fileArray.concat(['images/propscover/props-bg-1005.jpg','images/propscover/title-1005.png']);
                break;

        }
        // console.log(fileArray)

        
        // var queue = new createjs.LoadQueue(false);
        // queue.on("fileload", handleFileComplete);
        // queue.on("complete", handleComplete);
        // queue.on("progress", handleProgress);
        // queue.loadManifest(fileArray, false);
        // queue.load();
        // function handleFileComplete(event) {
        //     // console.log('handleFileComplete',event)
        //     // document.body.appendChild(event.result);
        // }
        // function handleComplete(event) {
        //     // console.log('handleComplete',event)
        //     $('html').addClass('html-props-cover');
        //     $('[cover-content]').show();
        //     $('#props-cover-loading').remove();
        //     // document.body.appendChild(event.result);
        // }
        //
        // function handleProgress(event) {
        //     // console.log('General progress', Math.round(event.loaded) * 100, event);
        //     // console.log('General progress', event.progress);
        //     // bar.set(event.progress)
        //     // console.log(event)
        //     // document.body.appendChild(event.result);
        // }

        var dArr=[];

        fileArray.forEach(function (n, i) {
            // console.log(n)

            dArr.push(loadImg(n).then(function (res) {
                // console.log(res)
            }));
        });
        
        // console.log(dArr)

        $.when.apply($, dArr).then(function () {
            // console.log( 'all' );
            showCover()

        },function () {
            showCover()
            // console.log( 'not all' );

        });
        // $.when( dArr ).done(function ( ) {
        //     console.log( 'all' );
        //     $('html').addClass('html-props-cover');
        //     $('[cover-content]').show();
        //     $('#props-cover-loading').remove();
        //
        // });
        // loadImg('http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/props/images/propscover/light-1.png').then(function (res) {
        //     console.log(1)
        // })

        function loadImg(url) {
            var deferred = $.Deferred();

            var img=new Image();
            img.src=url

            img.onload=function () {
                // console.log('loaded')
                deferred.resolve(true);
            };
            img.onerror=function () {
                console.log('error')
                deferred.reject(false);
            }

            return deferred.promise();
        }

        function showCover() {
            $('html').addClass('html-props-cover');
            $('[cover-content]').show();
            $('#props-cover-loading').remove();
        }

    }


    function initLight(){
        hb.loopClass("#props-light-box-wrapper",{
            speed:250,
        });
        hb.loopClass("#props-bt-box-wrapper",{
            speed:200,
        });
    }

    function initImg(){
        var id=hb.location.url('?id');
        // console.log(id)
        // console.log(appData)
        // console.log(hb.util.pad(23,3))
        // console.log(hb.util.pad(23,4))
        // console.log(hb.util.pad(23,5))
        // console.log(hb.util.pad(23,1))
        switch (true){
            case id==1000:
                $('html').addClass(`cover-${id}`);
                $('#props-title').addClass(`title-${id}`);
                break;
            case id==1001:
                $('html').addClass(`cover-${id}`);
                $('#props-title').addClass(`title-${id}`);
                break;
            case id==1002:
                $('html').addClass(`cover-${id}`);
                $('#props-title').addClass(`title-${id}`);
                break;
            case id==1003:
                $('html').addClass(`cover-${id}`);
                $('#props-title').addClass(`title-${id}`);
                break;
            case id==1004:
                $('html').addClass(`cover-${id}`);
                $('#props-title').addClass(`title-${id}`);
                break;
            case id==1005:
                $('html').addClass(`cover-${id}`);
                $('#props-title').addClass(`title-${id}`);
                break;
        }
    }
    function initNum(){
        // console.log(hb.util.pad(23,3))
        // console.log(hb.util.pad(23,4))
        // console.log(hb.util.pad(23,5))
        // console.log(hb.util.pad(23,1))

        // var val=$("#current-sale-price").data("num");
        var currentNum=600;
        var num=appData.num;
        // var num=20;
        // console.log(num)
        hb.fancyNumber("#num-box",{
            number:currentNum,
            preClass:'props-s-rest',
            staticClass:'props-s-rest',
            containerClass:'props-s-rest-box'
        });

        hb.interval(function () {
            var step=(currentNum-num)/30;
            currentNum-=step;
            // console.log(currentNum)
            // console.log(Math.floor(currentNum));
            hb.fancyNumber("#num-box",{
                number:hb.util.pad(Math.floor(currentNum),3),
                preClass:'props-s-rest',
                staticClass:'props-s-rest',
                containerClass:'props-s-rest-box'
            });
        },10,30,function () {

            hb.fancyNumber("#num-box",{
                number:hb.util.pad(num,3),
                preClass:'props-s-rest',
                staticClass:'props-s-rest',
                containerClass:'props-s-rest-box'
            });

        });

    }




    return{
        init:init,
    }

}());