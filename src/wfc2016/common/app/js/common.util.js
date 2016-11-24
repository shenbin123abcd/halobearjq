;common.util = function () {
    "use strict";
    function init() {

    }

    function alert_goBuyTicket(options){
        var deferred = $.Deferred();
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
<div class="wfc2016-modal-dialog wfc2016-modal-dialog--ticket-ok" style="display: none;" >
    <div class="bg" remove-modal></div>
    <div class="dialog">
        <div class="ticket-ok"></div>
        <div class="text-on-sale"></div>
        <div class="text" >
            <div class="line" >您还未购买2016中国婚礼行业高峰论坛门票，</div>
            <div class="line">请先购买门票后来选座。</div>
        </div>
        <div class="bt-box" >
            <a href="/uc" class="wfc2016-bt wfc2016-bt-main wfc2016-bt--ticket-ok"  ><img class="bt-img" src="images/go-buy.png" ></a>
        </div>
    </div>
</div>
        `;

        var $alertHtml=$(alertHtmlStr);
        $("body").append($alertHtml);
        $alertHtml.show().find('.dialog').addClass('animated zoomIn');
        var $confirmBt=$alertHtml.find("[remove-modal]");
        $confirmBt.on('click',function(){
            $alertHtml.remove();
            deferred.resolve(true);
        });

        return deferred.promise();
    };

    function alert_seatRound2(options){
        var deferred = $.Deferred();
        var defaults = {
            title:'提示',
            content:'提示内容',
            btn:'确定',
            deadLine:new Date('2016/08/01 20:00:00').getTime(),
        };

        if(typeof options=="string"){
            defaults = $.extend(defaults,{
                content:options
            });
        }else{

        }

        var settings = $.extend( {},defaults, options );

        var currentTime=new Date().getTime();

        if(currentTime<settings.deadLine){
            var msg='8月1日晚上8点最后一轮抢座开始，'
        }else{
            var msg='最后一轮抢座已开始，'
        }

        
        var alertHtmlStr=`
<div class="wfc2016-modal-dialog wfc2016-modal-dialog--ticket-ok-2" style="display: none;" >
    <div class="bg" remove-modal></div>
    <div class="dialog">
        <div class="ticket-ok-2"></div>
        <div class="text-on-sale"></div>
        <div class="text" >
            <div class="line" >${msg}</div>
            <div class="line">不要错过哦~</div>
        </div>
        <div class="bt-box" >
            <span remove-modal class="wfc2016-bt wfc2016-bt-main wfc2016-bt--ticket-ok-2"  ><img class="bt-img" src="images/text-wzdl.png" ></span>
        </div>
    </div>
</div>
        `;

        var $alertHtml=$(alertHtmlStr);
        $("body").append($alertHtml);
        $alertHtml.show().find('.dialog').addClass('animated zoomIn');
        var $confirmBt=$alertHtml.find("[remove-modal]");
        $confirmBt.on('click',function(){
            $alertHtml.remove();
            deferred.resolve(true);
        });

        return deferred.promise();
    };

    function alert_seat_end(options){
        var deferred = $.Deferred();
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



        var msg='您好，选座已结束'


        var alertHtmlStr=`
<div class="wfc2016-modal-dialog wfc2016-modal-dialog--ticket-ok-2" style="display: none;" >
    <div class="bg" remove-modal></div>
    <div class="dialog">
        <div class="ticket-ok-2"></div>
        <div class="text-on-sale"></div>
        <div class="text" >
            <div class="line" >${msg}</div>
        </div>
        <div class="bt-box" >
            <span remove-modal class="wfc2016-bt wfc2016-bt-main wfc2016-bt--ticket-ok-2"  ><img class="bt-img" src="images/text-wzdl.png" ></span>
        </div>
    </div>
</div>
        `;

        var $alertHtml=$(alertHtmlStr);
        $("body").append($alertHtml);
        $alertHtml.show().find('.dialog').addClass('animated zoomIn');
        var $confirmBt=$alertHtml.find("[remove-modal]");
        $confirmBt.on('click',function(){
            $alertHtml.remove();
            deferred.resolve(true);
        });

        return deferred.promise();
    };




    return {
        init: init,
        alert_goBuyTicket: alert_goBuyTicket,
        alert_seatRound2: alert_seatRound2,
        alert_seat_end: alert_seat_end,
    };
}();