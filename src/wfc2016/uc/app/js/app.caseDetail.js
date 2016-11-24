;app.caseDetail=(function(){
    "use strict";
    function init(){
        goPay();
        initForm();
        //$("#dialogModal").modal({
        //    backdrop: 'static'
        //});
        //app.regionSelect.init();
        //$("#dialogModal").modal('show');
        //app.regionSelect.init();
    }


    
    function goPay() {
        $("[pay-bt]").on('click',function () {
            var id=$(this).data('id');
            var type=$(this).data('type');
            var data={
                id:id,
                type:type,
            }
            if(type==98){
                app.pay2.callPay('payBasic').callpay({
                    data:data,
                    onSuccess:function (res) {
                        hb.lib.weui.alert('支付成功').then((res)=>{
                            if(window.appData.is_address==1){
                                window.location.href='/uc/caseRecord'
                            }else{
                                addAddress();
                            }
                        });
                    },
                    onFail:function (res) {
                        hb.lib.weui.alert(res);
                    },
                });
            }
            if(type==99){
                app.pay2.callPay('payAdvance').callpay({
                    data:data,
                    onSuccess:function (res) {
                        hb.lib.weui.alert('支付成功').then((res)=>{
                            if(window.appData.is_address==1){
                                window.location.href='/uc/caseRecord'
                            }else{
                                addAddress();
                            }
                        });
                    },
                    onFail:function (res) {
                        hb.lib.weui.alert(res);
                    },
                });
            }
        })
    }

    function addAddress(){
        $("#dialogModal").modal({
            backdrop: 'static'
        });
        app.regionSelect.init();
    }
    function initForm(){
        $('#submit-address').on('submit',function(event){
            event.preventDefault();
            hb.util.loading.show();
            app.service.addAddress({
                'name':$.trim($("#name").val()),
                'phone':$("#phone").val(),
                'province':$('#province').val(),
                'city':$('#city').val(),
                'region':$('#region').val(),
                'address':$.trim($("#address").val()),
            }).then(function(res){
                hb.util.loading.hide();
                hb.lib.weui.alert('添加地址成功').then((res)=>{
                    window.location.href='/uc/caseRecord'
                });
            },function(res){
                hb.util.loading.hide();
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:res,
                    btn:'确定',
                })
            })
        });
    }



    return{
        init:init,
    }
}());


