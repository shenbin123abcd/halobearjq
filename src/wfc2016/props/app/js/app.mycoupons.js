app.mycoupons=(function(){
    "use strict";

    function init(){
        setHtml();
    }

    function chooseColor(type){
        switch(type){
            case 1:
            case 14:
            case 27:
            case 40:
                return "#f95a5a";
                break;
            case 2:
            case 15:
            case 28:
            case 41:
                return "#ff8e55";
                break;
            case 3:
            case 16:
            case 29:
            case 42:
                return "#43d6ac";
                break;
            case 4:
            case 17:
            case 30:
            case 43:
                return "#e6b943";
                break;
            case 5:
            case 18:
            case 31:
            case 44:
                return '#fe4799';
                break;
            case 6:
            case 19:
            case 32:
            case 45:
                return "#a1519a";
                break;
            case 7:
            case 20:
            case 33:
            case 46:
                return "#f67521";
                break;
            case 8:
            case 21:
            case 34:
            case 47:
                return "#3ab8fa";
                break;
            case 9:
            case 22:
            case 35:
            case 48:
                return "#d269df";
                break;
            case 10:
            case 23:
            case 36:
            case 49:
                return "#b1d038";
                break;
            case 11:
            case 24:
            case 37:
            case 50:
                return "#6ac86e";
                break;
            case 12:
            case 25:
            case 38:
            case 51:
                return "#fd82b6";
                break;
            case 13:
            case 26:
            case 39:
            case 52:
                return "#9c96f6";
                break;
        }
    }

    function setColor(){
        $('.coupons-item').each(function(index){
            var type=$(this).data('type');
            //var type=parseInt(13*Math.random())+1;
            $(this).children('.item-left').children('.bg-pic').css('background',chooseColor(type));
            $(this).children('.item-left').children('.item-content').children('.content-price').css('color',chooseColor(type));
        })
    }

    function setHtml(){
        
        var appData=window.appData;
        // appData.coupon=null;

        if(!appData.coupon){
            let str=`
                    <div class="no-coupon-box">
                        <div class="tip"></div>
                        <div class="bt-box">
                           <a class="uc-bt uc-bt-main" href="/props" >
                            <img class="bt-img" src="images/bt-text-lijilingquan.png" >
                           </a>
                        </div>
                    </div>
                `

            $('#coupons-block').append(str);
            return;
        }
        var couponListHtml=``;
        appData.coupon.forEach(function (n,i) {

            if(n.record_id==99){
                couponListHtml+=`
                    <div class="coupons-item" data-type="${n.record_id}" id="record_id${n.record_id}">
                        <div class="item-left">
                            <img src="images/mycoupons-2.png"  style="background-color: #f95a5a;" alt="" class="bg-pic">
                            <img src="images/big-reward.png"   alt="" class="big-reward">
                            <div class="item-content">
                                <div class="f-24 price content-price-big" style="opacity: 0;">1</div>
                                <div class="f-11 text" style="opacity: 0;">抵用券</div>
                            </div>
                        </div>
                        <div class="item-right">
                            <div class="item-desc">
                                <span class="text f-13"><i class="haloIcon haloIcon-sign f-22"></i>${n.company}</span>
                                <span class="text f-13">${n.style}</span>
                            </div>
                            <div class="item-date f-12">
                                <i class="haloIcon haloIcon-clock f-22"></i>2016年08月16日-18日 幻熊服务台
                            </div>
                        </div>
                    </div>
                    `

            }else{
                let priceArr=n.price.split(' ');
                if(priceArr[1]=='元'){
                    n.priceStr=`¥ ${priceArr[0]}`;
                }else{
                    n.priceStr=`${priceArr[0]} ${priceArr[1]}`;
                }
                couponListHtml+=`
                    <div class="coupons-item" data-type="${n.record_id}" id="record_id${n.record_id}">
                        <div class="item-left">
                            <img src="images/mycoupons-2.png" alt="" class="bg-pic">
                            <div class="item-content">
                                <div class="f-24 price content-price">${n.priceStr}</div>
                                <div class="f-11 text">抵用券</div>
                            </div>
                        </div>
                        <div class="item-right">
                            <div class="item-desc">
                                <span class="text f-13"><i class="haloIcon haloIcon-sign f-22"></i>${n.company}${n.price.split(' ')[0]}${n.price.split(' ')[1]}优惠券</span>
                                <span class="text f-13">${n.style}</span>
                            </div>
                            <div class="item-date f-12">
                                <i class="haloIcon haloIcon-clock f-22"></i>2016年08月16日-18日 公共展览区
                            </div>
                        </div>
                    </div>
                    `
            }

        });

        $('#coupons-block').append(couponListHtml)
        
        
        
        
        $('.content-price').each(function(index){
            var val=$(this).text().split(' ');
            // console.log(val)
            if(val[0]=='¥'){
                var htmlStr=`
                    <div class="f-24 price content-price"><span class="f-15">¥ </span>${val[1]}</div>
                    <div class="f-11 text">抵用券</div>
                `
            }else{
                var htmlStr=`
                    <div class="f-24 price content-price">${val[0]}<span class="f-13">${val[1]}</span></div>
                    <div class="f-11 text">抵用券</div>
                `
            }
            $(this).parent('.item-content').empty().html(htmlStr);
            setColor();
            //scroll();
        })
    }

    function scroll(){
        var hash=window.location.hash;
        if(hash){
            var height=$(hash).offset().top
            $(window).scrollTop(height);
        }
    }





    return{
        init:init,
    }

}());