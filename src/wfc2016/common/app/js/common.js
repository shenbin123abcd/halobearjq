(function(){
    "use strict";
    window.common=(function(){
        function init() {

        }
        function initBanner() {

            $('#wfc2016-ad-close').on('click',function (event) {
                event.preventDefault();
                $('#wfc2016-ad-wrapper').remove();
            })
            getNum();

            var deadLine=new Date('2016/07/13 00:00:00');
            var t=deadLine.getTime();
            var now=new Date();
            var nowT=now.getTime();

            if((nowT-t)>=0){
                // $('#wfc2016-ad-wrapper').remove();
            }else{
                // hb.interval(function () {
                //     countDown(deadLine);
                //
                // },1000,Math.floor((t-nowT)/1000),function () {
                //     $('#wfc2016-ad-wrapper').remove();
                // });
                //
                // setTimeout(function () {
                //     $("#wfc2016-ad-wrapper-line-2").show();
                // },1000)
            }

            
        }

        function getNum() {
            var num=window.localStorage.getItem('wfc2016_ticket_num');
            var cache_stamp=window.localStorage.getItem('wfc2016_ticket_num_time_stamp');
            var now_stamp=new Date().getTime();

            // console.log(num,cache_stamp,now_stamp)
            // console.log(now_stamp-cache_stamp)
            if(num){
                if((now_stamp-cache_stamp)<60000){
                    hb.fancyNumber("#wfc2016-ad-num",{
                        number:num,
                        preClass:'common-sprite-pnum',
                        staticClass:'common-sprite-num'
                    });
                    $("#wfc2016-ad-wrapper-line-1").show();

                    return
                }
            }

            $.ajax('/api/getTicketNum').done(function (res) {
                // $('#wfc2016-ad-num').text(res.data)
                var time_stamp=new Date().getTime();
                window.localStorage.setItem('wfc2016_ticket_num',res.data);
                window.localStorage.setItem('wfc2016_ticket_num_time_stamp',time_stamp);
                hb.fancyNumber("#wfc2016-ad-num",{
                    number:res.data,
                    preClass:'common-sprite-pnum',
                    staticClass:'common-sprite-num'
                });
                $("#wfc2016-ad-wrapper-line-1").show();
            })


        }

        function countDown(deadLine) {
            var deadLine=deadLine;
            var now=new Date();
            var t=deadLine.getTime()-now.getTime();


            var d=Math.floor(t/1000/60/60/24);
            var h=Math.floor(t/1000/60/60%24);
            var m=Math.floor(t/1000/60%60);
            var s=Math.floor(t/1000%60);


            if(d){
                hb.fancyNumber("#wfc2016-ad-time-left-d",{
                    number:d,
                    preClass:'common-sprite-num',
                    staticClass:'common-sprite-num'
                });
            }else{
                $("#wfc2016-ad-time-left-d").hide();
                $("#wfc2016-ad-d").hide();
                
                
                
            }


            if(d||h){
                hb.fancyNumber("#wfc2016-ad-time-left-h",{
                    number:h,
                    preClass:'common-sprite-num',
                    staticClass:'common-sprite-num'
                });
            }else{
                $("#wfc2016-ad-time-left-h").hide();
                $("#wfc2016-ad-h").hide();
            }


            if(d||h||m){
                hb.fancyNumber("#wfc2016-ad-time-left-m",{
                    number:m,
                    preClass:'common-sprite-num',
                    staticClass:'common-sprite-num'
                });
            }else{
                $("#wfc2016-ad-time-left-m").hide();
                $("#wfc2016-ad-m").hide();
            }


            if(d||h||m||s){
                hb.fancyNumber("#wfc2016-ad-time-left-s",{
                    number:s,
                    preClass:'common-sprite-num',
                    staticClass:'common-sprite-num'
                });
            }else{
                $("#wfc2016-ad-time-left-s").hide();
                $("#wfc2016-ad-s").hide();
            }





            // $("#wfc2016-ad-time-left-h").html(h)
            // $("#wfc2016-ad-time-left-m").html(m)
            // $("#wfc2016-ad-time-left-s").html(s)
            // console.log(deadLine,t,h,m,s)
            
        }
        return {
            init:init,
            initBanner:initBanner
        };
    }());

}());


