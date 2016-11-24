;app.common=(function(){
    "use strict";
    function init(){
        app.wechat.init();
     
    }


    function debugCookie(str) {
        if(appConfig.debug){
            hb.Cookies.set('halobear',str,{expires: 7});
            let hbCookie=hb.Cookies.get('halobear');
            alert(hbCookie)
        }
    }

    // debugCookie('OWM4NU94Z1B1NlArc3RYQ2xFTk1ZekZmbnBzelVpV0d0SVlLZkQxMjZKeTd2UTZuRXhaZFFkMHZINlhzaVZtYVRteTYxUkNDVkVWaW5ROE1kbzgyOFFBM0Q4b0g1Y09XWVE=');
    //debugCookie('Y2Y2YXZXazhGc1FkTjFIWUlUOEZPK3BZL3RmVmoxVTZHSy9vR1JpSlRpemZMWUkyeTYrYXovYTJXN21FR2FIN0VVVTdGYlZDUEVRL1Z3YUFpTTRDdk5nalBsbnlleFRLSnc=');


    



    return{
        init:init,
    }
}());

