app.index=(function(){
    "use strict";

    function init(){
        timeOut.init();
        prizeList();
        pay();
        modalClose();
        festivalShow();
        showReserve();
        hotelChoose();
        hotelPay();
        //clickGo();
    }

    function showReserve(){
        var record=window.record;
        $.each(record, function (k, v) {
            $(".festival-list-item").find('.person_name_'+k).text(v);
        })
        /*$('.list-item').find('.count_num').each(function(index){
            var num=$('.list-item').find('.count_num').eq(index).text()
            if(num==0){
                $(".list-item").eq(index).on('click',function(e){
                    e.preventDefault();

                })
            }
        })*/
    }

    function festivalShow(){
        var data1=[
            {
                'img':'propspic/19.png',
                'name':'镂丝金杯',
                'desc':'38cm*85cm',
                'price_before':'115',
                'price_now':'59',
            },
            {
                'img':'propspic/20.png',
                'name':'水晶灯',
                'desc':'54cm*80cm',
                'price_before':'130',
                'price_now':'49',
            },
            {
                'img':'propspic/21.png',
                'name':'十头金色龙珠',
                'desc':'65cm-185cm',
                'price_before':'260',
                'price_now':'99',
            },
            {
                'img':'propspic/22.png',
                'name':'钻石路引三件套',
                'desc':'110cm',
                'price_before':'180',
                'price_now':'100',
            },
            {
                'img':'propspic/23.png',
                'name':'星星拱门',
                'desc':'320cm*330cm',
                'price_before':'1760',
                'price_now':'980',
            },
            {
                'img':'propspic/24.png',
                'name':'云梯',
                'desc':'100cm*250cm',
                'price_before':'1080',
                'price_now':'750',
            }
        ];
        var data2=[
            {
                'img':'propspic/4.png',
                'name':'韩式镂空发光路引',
                'desc':'26cm*75cm',
                'price_before':'138',
                'price_now':'69',
            },
            {
                'img':'propspic/5.png',
                'name':'金色球形花器',
                'desc':'20cm*60cm',
                'price_before':'258',
                'price_now':'189',
            },
            {
                'img':'propspic/6.png',
                'name':'凤纹镂空花瓶',
                'desc':'30cm*60cm',
                'price_before':'98',
                'price_now':'59',
            }
        ];
        var data3=[
            {
                'img':'propspic/7.png',
                'name':'蓝色花瓶',
                'desc':'蓝色',
                'price_before':'280',
                'price_now':'180',
            },
            {
                'img':'propspic/8.png',
                'name':'造型相框',
                'desc':'灰色*黄色*青色',
                'price_before':'100',
                'price_now':'75',
            },
            {
                'img':'propspic/9.png',
                'name':'原木花瓶',
                'desc':'灰色',
                'price_before':'360',
                'price_now':'290',
            }
        ];
        var data4=[
            {
                'img':'propspic/10.png',
                'name':'艾菲尔铁塔',
                'desc':'320cm',
                'price_before':'3000',
                'price_now':'2380',
            },
            {
                'img':'propspic/11.png',
                'name':'灯泡爱情门',
                'desc':'200cm*200cm',
                'price_before':'2300',
                'price_now':'1380',
            },
            {
                'img':'propspic/12.png',
                'name':'皇冠灯泡门',
                'desc':'320cm*350cm',
                'price_before':'2600',
                'price_now':'1880',
            }
        ];
        var data5=[
            {
                'img':'propspic/13.png',
                'name':'七件幸福光圈',
                'desc':'120cm',
                'price_before':'1200',
                'price_now':'880',
            },
            {
                'img':'propspic/14.png',
                'name':'皇冠',
                'desc':'190cm*135cm',
                'price_before':'2600',
                'price_now':'1680',
            },
            {
                'img':'propspic/15.png',
                'name':'森系花墙',
                'desc':'100cm*300cm',
                'price_before':'3180',
                'price_now':'2180',
            }
        ];
        var data6=[
            {
                'img':'propspic/16.png',
                'name':'木质可折叠装饰柜',
                'desc':'45cm*75cm',
                'price_before':'380',
                'price_now':'320',
            },
            {
                'img':'propspic/17.png',
                'name':'粗磨边钢化玻璃',
                'desc':'122cm*93cm',
                'price_before':'140',
                'price_now':'100',
            },
            {
                'img':'propspic/18.png',
                'name':'铁艺栅栏',
                'desc':'60cm*80cm',
                'price_before':'130',
                'price_now':'109',
            }
        ];
        renderItem(data1,'#list-item-content-1');
        renderItem(data2,'#list-item-content-2');
        renderItem(data3,'#list-item-content-3');
        renderItem(data4,'#list-item-content-4');
        renderItem(data5,'#list-item-content-5');
        renderItem(data6,'#list-item-content-6');
    }

    function pay(){
        $("[props-pay-btn]").on('click',function(){
            var type=$(this).data('type');
            var todayDate=changeTimeStyle();
            if($(this).find('.count_num').text()>0){
                app.pay.wechat.callpay({
                    data:{
                        type:type,
                    },
                    onSuccess:function (res) {
                        if(type==6){
                            window.location.href="/props/hotelregister#type=6";
                        }else if(type==8){
                            window.location.href="/props/hotelregister#type=8";
                        }else if(type==9){
                            window.location.href="/props/hotelregister#type=9";
                        }
                        //showPaySuccess(res)
                    },
                    onFail:function (res) {
                        hb.lib.weui.alert(res);
                    },
                });
            }
        })
    }

    function hotelPay(){
        $("[hotel-props-pay-btn]").on('click',function(){
            var type=$(this).data('type');
            //alert(type);
            app.pay.wechat.callpay({
                data:{
                    type:type,
                },
                onSuccess:function (res) {
                    $('#hotel-modal').modal('hide');
                    if(type==6){
                        window.location.href="/props/hotelregister#type=6";
                    }else if(type==10){
                        window.location.href="/props/hotelregister#type=10";
                    }else if(type==9){
                        window.location.href="/props/hotelregister#type=9";
                    }else if(type==11){
                        window.location.href="/props/hotelregister#type=11";
                    }
                    //showPaySuccess(res)
                },
                onFail:function (res) {
                    $('#hotel-modal').modal('hide');
                    hb.lib.weui.alert(res);
                },
            });
        })
    }

    function hotelChoose(){
        $("[hotel-click-btn]").on('click',function(){
            var type=$(this).data('type');
            var todayDate=changeTimeStyle();
            $("#hotel-modal-content").children().hide();
            if($(this).find(".count_num").text()>0){
                if($(this).data('type')=="kuaijie"){
                    $("#hotel-body-kuaijie").show();
                }else{
                    $("#hotel-body-sixing").show();
                }
                $('#hotel-modal').modal('show');
            }
        })
    }
    function getPrizeRecord(){
        var deferred=$.Deferred();
        //console.log(data);
        sendXhr();
        function sendXhr(){
            $.ajax({
                type:'POST',
                url:'/props/getPrizeRecord',
                success: function(res) {
                    if(res.status==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(error) {
                    deferred.reject('网络繁忙请稍候再试');
                }
            })
        }
        return deferred.promise();
    }

    function prizeList(){
        getPrizeRecord().then(function(res){
            //var todayDate='2016-07-25';
            var todayDate=changeTimeStyle();
            var htmlStr1="";
            var htmlStr2='';
            var htmlStr3='';
            var imgMap={
                '1':'unclaimed.png',
                '2':'overtime.png',
                '3':'received.png',
                '4':'last-prize.png',
            }
            res.forEach(function(n,i){
                if(n.date){
                    var month=n.date.split('-')[1];
                    var day=n.date.split('-')[2];
                    var priceNum=n.price.split(' ')[0];
                    var priceText=n.price.split(' ')[1];
                    if(n.date>=todayDate){
                        htmlStr1=`
                            <div class="list-item" data-time="${n.date}">
                                <div class="item-content unclaimed">
                                    <div class="item-date f-12"><span>${month}</span>月<span>${day}</span>日</div>
                                    <div class="received-wrapper">
                                        <img class="item-img lazy" data-original="images/${imgMap[1]}" alt="">
                                    </div>
                                    <div style="display: none;" class="all-content">
                                        <span class="content_company">${n.company}</span>
                                        <span class="content_requirement">${n.style}</span>
                                        <span class="content_price">${n.price}</span>
                                    </div>
                                    <div class="get-btn btn f-11 take_btn" get-coupons-btn data-time="${n.date}">领 取</div>
                                </div>
                                <div class="item-content received" style="display:none;" go-btn>
                                    <div class="item-date f-12"><span>${month}</span>月<span>${day}</span>日</div>
                                    <div class="received-wrapper">
                                        <img class="item-img lazy" data-original="images/${imgMap[3]}" alt="">
                                        <div class="text-price f-8"><span class="f-16" style="padding-right:1px;">${priceNum}</span>${priceText}</div>
                                    </div>
                                    <a class="get-btn btn f-11" href="/props/mycoupons#record_id">我的卡券</a>
                                </div>
                            </div>
                        `
                    }else if(n.date<todayDate){
                        htmlStr1=`
                            <div class="list-item" data-time="${n.date}">
                                <div class="item-content unclaimed" style="display: none;">
                                    <div class="item-date f-12"><span>${month}</span>月<span>${day}</span>日</div>
                                    <div class="received-wrapper">
                                        <img class="item-img lazy" data-original="images/${imgMap[1]}" alt="">
                                    </div>
                                    <div style="display: none;" class="all-content">
                                        <span class="content_company">${n.company}</span>
                                        <span class="content_requirement">${n.style}</span>
                                        <span class="content_price">${n.price}</span>
                                    </div>
                                    <div class="get-btn btn f-11 take_btn" get-coupons-btn data-time="${n.date}">领 取</div>
                                </div>
                                <div class="item-content overtime">
                                    <div class="item-date f-12"><span>${month}</span>月<span>${day}</span>日</div>
                                    <div class="received-wrapper">
                                        <img class="item-img lazy" data-original="images/${imgMap[2]}" alt="">
                                    </div>
                                    <div class="get-btn btn f-11">过 期</div>
                                </div>
                            </div>
                        `
                    }
                }else if(n.create_date){
                    var month=n.create_date.split('-')[1];
                    var day=n.create_date.split('-')[2];
                    var priceNum=n.price.split(' ')[0];
                    var priceText=n.price.split(' ')[1];
                    htmlStr1=`
                        <div class="list-item" data-time="${n.create_date}">
                            <div class="item-content unclaimed" style="display:none;">
                                <div class="item-date f-12"><span>${month}</span>月<span>${day}</span>日</div>
                                <div class="received-wrapper">
                                    <img class="item-img lazy" data-original="images/${imgMap[1]}" alt="">
                                </div>
                                <div style="display: none;" class="all-content">
                                    <span class="content_company">${n.company}</span>
                                    <span class="content_requirement">${n.style}</span>
                                    <span class="content_price">${n.price}</span>
                                </div>
                                <div class="get-btn btn f-11 take_btn" get-coupons-btn data-time="${n.date}">领 取</div>
                            </div>
                            <div class="item-content received" go-btn>
                                <div class="item-date f-12"><span>${month}</span>月<span>${day}</span>日</div>
                                <div class="received-wrapper">
                                    <img class="item-img lazy" data-original="images/${imgMap[3]}" alt="">
                                    <div class="text-price f-8"><span class="f-16" style="padding-right:1px;">${priceNum}</span>${priceText}</div>
                                </div>
                                <a class="get-btn btn f-11" href="/props/mycoupons#record_id${n.record_id}">我的卡券</a>
                            </div>
                        </div>
                    `;
                }
                htmlStr2+=htmlStr1;
            });
            $("#sign-list").empty().html(htmlStr2).append(`<div class="last-prize" id='last_prize'><img class="lazy" data-original="images/${imgMap[4]}" alt=""></div>`);
            lazy();
            getCoupons();
            lastPrize();
            clickGo();
        },function(res){
            hb.lib.weui.alert({
                title:'温馨提示',
                content:res,
                btn:'确定',
            })
        })
    }

    function renderItem(data,id){
        var htmlStr='';
        data.forEach(function(n,i){
            htmlStr+=`
                <div class="content-item">
                    <div class="item-wrapper">
                        <div class='img-wrapper'>
                            <img class="lazy" data-original="images/${n.img}" alt="">
                        </div>
                        <div class="props-name f-12" id="props-name">${n.name}</div>
                        <div class="props-info f-9" id="props-info">${n.desc}</div>
                        <div class="price-before f-9">原价：<span id="price-before">${n.price_before}元</span></div>
                        <div class="price-now f-12"><span class="price-text f-9">现场价</span><span style="padding-left:2px;color:#f65624;vertical-align: middle;">${n.price_now}元</span></div>
                    </div>
                </div>
            `
        });
        $(id).empty().html(htmlStr);
        lazy();
    }

    function lazy() {
        $("img.lazy").lazyload({
            placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            effect: "fadeIn",
            failure_limit : 100,
            threshold: 200,
        });
    }

    function modalClose(){
        $("#collect_btn").on('click',function(event){
            event.preventDefault();
            $('#success-modal').modal('hide');
        })
        $("#center_btn").on('click',function(event){
            event.preventDefault();
            $('#last-prize-modal').modal('hide');
        })
    }

    function lastPrize(){
        $("#last_prize").on('click',function(e){
            e.preventDefault();
            var lastDate='2016-08-14';
            var todayDate=changeTimeStyle();
            if(todayDate<lastDate){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:"此优惠券时间未到，不能领取！",
                    btn:'确定',
                });
            }else{
                $.ajax({
                    type:'GET',
                    url:'/props/getLast',
                    success: function(res){
                        if(res.status==1){
                            $('#last-prize-modal').modal('show');
                        }else{
                            hb.lib.weui.alert({
                                title:'温馨提示',
                                content:res.info,
                                btn:'确定',
                            })
                        }
                    },
                    error: function(error) {
                        hb.lib.weui.alert({
                            title:'温馨提示',
                            content:'网络繁忙稍后再试！',
                            btn:'确定',
                        })
                    }
                });
            }
        })
    }

    function checkPrice(data){
        var htmlStr='';
        $("#modal-price").empty();
        if(data.split(' ')[1]=='折'){
            $("#modal-price").removeClass('sign').addClass('text');
            htmlStr=`<span class="f-56">${data.split(' ')[0]}</span><span class="f-32 zhe">折</span>`;
        }else if(data.split(' ')[1]=='元'){
            $("#modal-price").removeClass('text').addClass('sign');
            htmlStr=`<span class="f-28">¥ </span><span class="f-40">${data.split(' ')[0]}</span>`;
        }
        $("#modal-price").html(htmlStr);
    }

    function getPrize(){
        var deferred=$.Deferred();
        //console.log(data);
        sendXhr();
        function sendXhr(){
            $.ajax({
                type:'POST',
                url:'/props/getPrize',
                success: function(res) {
                    if(res.status==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(error) {
                    deferred.reject('网络繁忙请稍候再试');
                }
            })
        }
        return deferred.promise();
    }

    function getCoupons(){
        var todayDate=changeTimeStyle();
        var modalShow=function(){
            $('#success-modal').modal('show');
        };
        $("#sign-list .list-item .item-content .take_btn").each(function(index){
            $("#sign-list .list-item .item-content .take_btn").eq(index).on('click',function(event){
                event.preventDefault();
                //console.log(index);
                var noClickDate=$(this).data('time');
                //console.log(noClickDate,todayData);
                if(noClickDate==todayDate){
                    getPrize().then(function(res){
                        var href="/props/mycoupons#record_id"+res.id;
                        var $receivedHtml=$("#sign-list .list-item").eq(index).children('.received');
                        $("#sign-list .list-item").eq(index).children().hide();
                        $receivedHtml.find('.text-price').empty().html(`<span class="f-16" style="padding-right: 1px;">${res.price.split(' ')[0]}</span>${res.price.split(' ')[1]} `);
                        $receivedHtml.find('.get-btn').attr('href',href);
                        //$("#sign-list .list-item .item-content").eq(index).attr('href',href);
                        var company=res.company || "";
                        var requirement=res.style || "";
                        var price=res.price || '';
                        $("#modal-company").text(company);
                        checkPrice(price);
                        $("#company-r").html('购买'+company+" "+requirement);
                        $receivedHtml.fadeIn(400,function(){
                            setTimeout(modalShow,200);
                        });
                        clickGo();
                    },function(res){
                        hb.lib.weui.alert({
                            title:'温馨提示',
                            content:res,
                            btn:'确定',
                        })
                    })
                }else{
                    hb.lib.weui.alert({
                        title:'温馨提示',
                        content:"此优惠券时间未到，不能领取！",
                        btn:'确定',
                    })
                }

            })
        });
    }

    function clickGo(){
        $('[go-btn]').on('click',function(event){
            event.preventDefault();
            var href=$(this).find('.get-btn').attr('href');
            //console.log(href);
            window.location.href=href;
        })
    }

    function changeTimeStyle(){
        var todayDate;
        var today=new Date();
        var Y=today.getFullYear();
        var M=check(today.getMonth()+1);
        var D=check(today.getDate());
        return todayDate=Y+'-'+M+'-'+D;
        //return todayDate='2016-07-25';
    }

    function check(i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    var timeOut={
        play:function(){
            var _this=this;
            var time='2016/07/20 23:59:59';
            var ts = new Date(time).getTime()/1000 - Math.round(new Date().getTime()/1000);
            var dd = parseInt(ts / 86400, 10);
            var hh = parseInt(ts / 3600, 10);
            var mm = parseInt(ts / 60 % 60, 10);
            var ss = parseInt(ts % 60, 10);
            dd = _this.checkTime(dd);
            hh = _this.checkTime(hh);
            mm = _this.checkTime(mm);
            ss = _this.checkTime(ss);

            //$("#day").text(dd);
            $("#hour").text(hh);
            $("#minute").text(mm);
            $("#seconds").text(ss);
            setTimeout("app.index.timeOut.play()",1000);
        },
        checkTime:function(i){
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        init:function(){
            if(changeTimeStyle()<'2016-07-21'){
                var _this=this;
                _this.play();
            }else{
                $("#hour").text('00');
                $("#minute").text('00');
                $("#seconds").text('00');
            }

        }
    };

    return{
        init:init,
        timeOut:timeOut,
    }

}());