app.detail=(function(){
    "use strict";
    function init(){
        seeMore();
        weixinDialoginit();
        setTimeout(video,3000);
        // $("#weixin-modal").on('click',function(){
        //     $("#weixin").modal("show");
        // });
    }
    function video(){
        var url = $('#video-box').data('video')||'';
        var youku = url.match(/youku\.com\/v_show\/id_([\w\-?\_?\=?]+)\/?/);
        var playurl = '';

        if (youku) {
            playurl = "http://player.youku.com/embed/" + youku[1];
        }

        if (playurl != '') {
            $('#video-box iframe').attr('src',playurl);
            $('#video-box').show();
        }
    }

    function seeMore(){
        $(window).on("load",function(){
            var rawText=$("#remark").text();
            // console.log(rawText);
            var pArr=rawText.split(/\n/g);
            // console.log(pArr);
            pArr.forEach(function (n, i) {
                pArr[i]='<div class="p">'+n+'</div>'
            });
            // console.log(pArr);
            var content=pArr.join('');
            $("#content-info").html(content);

            var height=parseInt($("#content-info").css("height"));
            // console.log(height)
            if(height<=100){
                $("#content-info").addClass('info-desc-all');
                $("#content-info").removeClass('info-desc-part');
                $("#seemore").hide();
            }else{
                $("#content-info").removeClass('info-desc-all');
                $("#content-info").addClass('info-desc-part');
                $(".seeMore-btn").show();
                $("#seemore").on('click',function(){
                    $("#content-info").animate({height:height},400);
                    $("#content-info").removeClass('info-desc-part');
                    $("#seemore").remove();
                    $(".case-detail-content").css("border-bottom","none");
                });
            }
        });
    }
    function weixinDialoginit(){
        $("#weixin-modal").on('click',function () {
            if($("#wechat_image_url").attr('src')){
                $("#weixin").modal('show');
            }else{
                hb.lib.weui.alert({
                    title:'微信号',
                    content:$("#wechat-value").text(),
                    btn:'确定'
                })
            }
        })
    }
    return{
        init:init,
    }

}());