app.draw=(function(){
    "use strict";
    function init(){
        //prizeList();
        //draw();
        //lottery();
        wipe();
        shareToFriend();
        playAgain();
    }
    function prizeList(){
        var fakeList=['','','','','','','','','','','','','','','','','','','','','','','','','','',''];
        var htmlStr='';
        fakeList.forEach(function(n,i){
            htmlStr+=`
                <div class="prize-item">
                    <div class="item item-company">花田喜事喜事喜asd</div>
                    <div class="item item-phone">15989279611</div>
                    <div class="item item-desc">获得机票一张</div>
                </div>
            `
        });
        $("#prize-container").empty().html(htmlStr);
    }
    function draw(){
        $("#draw-btn").on('click',function(e) {
            e.preventDefault();
            $("#draw-hidden").hide();
            $("#draw-container").css('padding',0);
            $("#draw-container").wScratchPad({
                size:15,
                bg: 'images/draw-success.png',
                fg: 'images/draw-block.png',
                scratchDown: function (e, percent) {
                    console.log(percent);
                }
            })
        })
    }
    function lottery(){
        $("#draw-btn").on('click',function(e) {
            e.preventDefault();

            if($("#show-num").text($("#show-num").text())<=0){
                $(".modal-dialog > .modal-content").hide();
                $("#no-chance").show();
                $("#drawModal").modal('show');
            }else{
                $("#draw-hidden").hide();
                $("#draw-container").css('padding',0);
                var lottery = new Lottery('draw-container', 'http://10.0.1.185:9010/app/images/draw-block.png', 'image',200,100,drawPercent);
                lottery.init("http://10.0.1.185:9010/app/images/draw-success.png","image");
            }
            function drawPercent(percent) {
                console.log(percent);
            }

        })
    }
    function toTop() {
        $("html,body").animate({
            scrollTop:0
        },300);
    }
    function wipe(){
        $("#draw-btn").on('click',function(e) {
            e.preventDefault();
            app.service.drawPost().then(function(res){
                //console.log($("#show-num").text($("#show-num").text())
                if($("#show-num").text()<=0){
                    $(".modal-dialog > .modal-content").hide();
                    $("#no-chance").show();
                    $("#drawModal").modal('show');
                }else {
                    if(res==0){
                        $(".modal-dialog").children().hide();
                        $("#fail").show();
                    }else{
                        $(".modal-dialog").children().hide();
                        $("#share-to-friend").show();
                    }
                    toTop();
                    $("#draw-hidden").hide();
                    $("#draw-container").css('padding', 0);
                    $("#draw-container").css({
                        'background': `url(images/coupon/${res}.png)`,
                        'background-size': 'cover',
                    });
                    var wipe = new Wipe({
                        el: '#draw-container',
                        fg: '#333',
                        size: 15,
                        debug: false,
                        autoWipe: false,
                        data: null,
                        onswiping: function (percent) {
                            //console.log(percent)
                            if(percent<=15){
                                toTop();
                            }
                            else if(percent > 15) {
                                //console.log(percent)
                                $("#show-num").text($("#show-num").text() - 1);
                                $("#draw-container > canvas").hide();
                                setTimeout($("#drawModal").modal('show'),800);
                            }
                        }
                    });
                }
            },function(error){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:error,
                    btn:'确定',
                })
            })
        })
    }

    var guide=(function(url){
        var imgUrl=url;
        var loadingHtmlStr=`
            <div style="position: fixed;z-index: 99999;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.8);">
                <img style='position: absolute;width: 185px;top: 5px;right: 20px;' src="images/weixin-guide.png">
            </div>
        `;
        var $loadingHtml=$(loadingHtmlStr);

        var show=function(){
            $("body").append($loadingHtml);
            $loadingHtml.on('click touchmove',function(){
                $loadingHtml.remove();
            });
        };

        var hide=function(){
            $loadingHtml.remove();
        };

        return{
            show:show,
            hide:hide
        }
    }());

    function shareToFriend(){
        $("[share-to-weixin]").on('click',function(event){
            event.preventDefault();
            $("#drawModal").modal('hide');
            setTimeout(app.common.guideShare.show,800);
        })
    }
    function playAgain(){
        var htmlStr=``;
        $("[again-draw]").on('click',function(event){
            event.preventDefault();
            $("#drawModal").modal('hide');
            $("#draw-container").empty();
            $("#draw-container").css({
                'background':'url(images/draw-block.png)',
                'background-size':'cover',
                'padding':'.4rem',
            });
            htmlStr=`
                 <div id="draw-hidden">
                    <div class="draw-text">刮峰会机票 &nbsp;火车票</div>
                    <div class="draw-btn btn" id="draw-btn">点我刮奖</div>
                 </div>
            `;
            $("#draw-container").append(htmlStr);
            setTimeout(wipe,800);
        })
    }
    function draeShare(){
        $(window).load(function(){
            $(".modal-dialog").children().hide();
            $("#draw-share").show();
            function modalShow(){
                $("#drawModal").modal('show');
            }
            setTimeout(modalShow,600);
        });
    }
    return{
        init:init,
        draeShare:draeShare,
    }
}());