app.ticket=(function(){
    "use strict";

    function init(){
        // initProgress();
        // payTicket();
    }
    
    function initProgress() {
        $("#ticket-friend-list-wrapper").find("[friend-num-bar]").each(function () {
            var num=$(this).data('num');
            $(this).css({
                width:num/980*100+'%'
            })
            
        });
    }

    function payTicket() {
        $("#pay-ticket").on('click',function () {
            $("#go-pay").show();
            // $("html,body").css({
            //     height:"100%",
            //     overflow:"hidden"
            // })

        });
        $("#go-pay .bg").on('click',function () {
            $("#go-pay").hide();
            // $("html,body").css({
            //     height:"",
            //     overflow:""
            // })
        });
        $("#go-pay-bt").on('click',function () {
            app.pay.wechat.callpay({
                onSuccess:function (res) {
                    showPaySuccess(res)
                },
                onFail:function (res) {
                    hb.lib.weui.alert(res);
                },
            });
        })


        function showPaySuccess(order_id) {
            $("html,body").css({
                height:"100%"
            });
            $("body").children('div').hide();
            $("#go-pay-success").show().on('submit',function (event) {
                event.preventDefault();
                hb.lib.weui.loading.show();
                $.ajax({
                    method: "POST",
                    url: "/uc/orderRemark",
                    data: {
                        order_id:order_id,
                        content:$("#my-remark").val()||$("#my-remark").attr('placeholder'),
                    },
                    success: function(res, textStatus, errorThrown) {
                        hb.lib.weui.loading.hide();
                        if(res.status==1){
                            hb.lib.weui.toast(res.info);
                            $("html,body").css({
                                height:""
                            });
                            $("body").children('div.page-wrapper').show();
                            $("#go-pay-success").hide()
                        }else{
                            hb.lib.weui.alert(res.info);
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        hb.lib.weui.loading.hide();
                        hb.lib.weui.alert('网络繁忙请稍候再试');

                    }
                })
            });
            
        }
        // showPaySuccess()
    }


    return{
        init:init,
    }

}());