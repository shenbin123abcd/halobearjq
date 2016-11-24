app.common=(function(){
    "use strict";
    function init(){
        // documentReady()
        //app.search.initSearchForm();
        //topShow();
        // iosKeyboard();
        //lazy();
        wechat();
    }
    function debugCookie(str) {
        if(appConfig.debug){
            hb.Cookies.set('halobear',str,{expires:1});
            hb.Cookies.set('wfc2016_year_id',{expires:1});
            let hbCookie=hb.Cookies.get('halobear');
            //alert(hbCookie)
        }
    }
    //debugCookie('Y2Y2YXZXazhGc1FkTjFIWUlUOEZPK3BZL3RmVmoxVTZHSy9vR1JpSlRpemZMWUkyeTYrYXovYTJXN21FR2FIN0VVVTdGYlZDUEVRL1Z3YUFpTTRDdk5nalBsbnlleFRLSnc=');

    function toTop() {
        $("html,body").animate({
            scrollTop:0
        },300);
    }
    function topShow(){
        $(window).scroll(function(){
            if($(window).scrollTop()>200){
                $("#top").fadeIn(300);
            }else{
                $("#top").fadeOut(300);
            }
        });
    }
    function iosKeyboard(){
        var $input=$("input[type='text'],input[type='password'],input[type='number'],input[type='email'],textarea");
        $input.on('focus',function () {
            $("html").addClass('keyboard-show');
        });
        $input.on('blur',function () {
            $("html").removeClass('keyboard-show');
        });

    }
    function lazy() {
        //console.log($("img.lazy"))
        $("img.lazy").lazyload({
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAPDw8AAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
            effect: "fadeIn",
            failure_limit : 100,
            threshold: 200,
        });
    }
    function wechat() {
        if(Modernizr.weixin){
            window.app.wechat.init();
        }
    }
    function documentReady() {
        $("html").addClass('document-ready');

    }

    // var vote_alert_success=(function(){
    //     var name=name;
    //     var loadingHtmlStr=``;
    //
    //
    //     var $loadingHtml=$(loadingHtmlStr);
    //
    //
    //
    //     var show=function(name){
    //         loadingHtmlStr=`
    //         <div style="position: fixed;z-index: 99999;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.8);">
    //             <div class="vote-success-msg-wrapper">
    //                 <img src="images/" alt="">
    //             </div>
    //         </div>
    //     `;
    //         $("body").append($loadingHtml);
    //         $loadingHtml.on('click',function(){
    //             $loadingHtml.remove();
    //         });
    //     };
    //
    //     var hide=function(){
    //         $loadingHtml.remove();
    //     };
    //     return{
    //         show:show,
    //         hide:hide
    //     }
    // }());


    var vote_alert_success=function(options){

        var defaults = {
            title:'提示',
            content:'提示内容',
            btn:'确定',
        };
        if(typeof options=="string"){
            defaults = $.extend(defaults,{
                content:options
            });
        }else{

        }
        var settings = $.extend( {},defaults, options );

        var alertHtmlStr=`
            <div style="position: fixed;z-index: 99999;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.8);" style="display: none;">
                <div class="vote-success-msg-wrapper">
                    <img class="img-msg" src="images/vote-success-photo.png" alt="">
                    <div class="text-1">投票成功!</div>
                    <div class="text-name">${settings.content}</div>
                    <div class="text-2">为您实现完美婚礼!</div>
                    <img class="img-close" src="images/alert_vote_success_close.png" alt="">
                </div>
            </div>
        `;
        var $alertHtml=$(alertHtmlStr);

        $("body").append($alertHtml);

        $alertHtml.show().find('.vote-success-msg-wrapper').addClass('animated zoomIn');
        $alertHtml.on('click',function(){
            $alertHtml.remove();
        });
    };


    return{
        init:init,
        toTop:toTop,
        wechat:wechat,
        vote_alert_success:vote_alert_success,
    }
}());
