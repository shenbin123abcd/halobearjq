app.common=(function(){
    "use strict";
    function init(){
        app.wechat.init();
        ucShareThis();
    }


    function debugCookie(str) {
        if(appConfig.debug){
            hb.Cookies.set('halobear',str);
            let hbCookie=hb.Cookies.get('halobear');
            alert(hbCookie)
        }
    }
    // debugCookie('OWM4NU94Z1B1NlArc3RYQ2xFTk1ZekZmbnBzelVpV0d0SVlLZkQxMjZKeTd2UTZuRXhaZFFkMHZINlhzaVZtYVRteTYxUkNDVkVWaW5ROE1kbzgyOFFBM0Q4b0g1Y09XWVE=');

    function ticketProgress() {
        var nanobarVal = $("#sale-progress").data('num');
        var options = {
            classname: 'sale-progress-inner',
            id: 'sale-progress-inner',
            target: document.getElementById('sale-progress'),
            onProgress: function (res) {
                // console.log(res)
                $("#pointer").css({
                    left:res+'%',
                }).text(nanobarVal+'元')
            },
            onFinish:function () {

            }
        };
        var nanobar = new Nanobar( options );
        // move bar
        nanobar.go( nanobarVal/30*100 ); // size bar 76%
        $("#pointer").show();
        if(nanobarVal==0){
            $("#pointer").css({
                'margin-left':-20,
            })
        }

    }

    function ucShareThis() {
        $("[uc-share-this]").on('click',function () {
            hb.lib.weui.guideShare.show();
        })
    }

    return{
        init:init,
        ticketProgress:ticketProgress,
    }
}());
