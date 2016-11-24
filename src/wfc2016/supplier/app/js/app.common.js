app.common=(function(){
    "use strict";
    function init(){
        app.search.initSearchForm();
        wechat();
        lazy();
    }

    
    function wechat() {
        if(Modernizr.weixin){
            window.app.wechat.init();
        }
    }
    function toTop() {
        $("html,body").animate({
            scrollTop:0
        },300);
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
                    <img class="img-msg" src="images/vote-success-box.png" alt="">
                    <div class="text-1">投票成功!</div>
                    <div class="text-name">${settings.content}</div>
                    <div class="text-2">只为更好的婚礼行业!</div>
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
        vote_alert_success:vote_alert_success,
    }
}());
