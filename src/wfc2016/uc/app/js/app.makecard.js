app.makecard=(function(){
    "use strict";

    function init(){
        formSubmit();
        messageSubmit();
    }
    function infoPost(data){
        var deferred=$.Deferred();
        switch(true){
            case !data.phone:
                deferred.reject('请填写手机号');
                break;
            case !data.idnum:
                deferred.reject('请填写门票序号');
                break;
            case !data.code:
                deferred.reject('请填写手机验证码');
                break;
            case !hb.validation.checkPhone(data.phone):
                deferred.reject('手机号码格式不正确！');
                break;
            default:
                sendXhr();
        }
        function sendXhr(){
            $.ajax({
                type:'POST',
                url:'/uc/bind',
                data:data,
                dataType:'json',
                success: function(res) {
                    if(res.status==1){
                        deferred.resolve(res)
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(error) {
                    deferred.reject('网络繁忙稍后再试');
                }
            })
        }
        return deferred.promise();
    }

    function messagePost(data){
        var deferred=$.Deferred();
        switch(true){
            case !data.phone:
                deferred.reject('请填写手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                deferred.reject('手机号码格式不正确！');
                break;
            default:
                sendXhr();
        }
        function sendXhr(){
            $.ajax({
                type:'POST',
                url:'/uc/getCode',
                data:data,
                dataType:'json',
                success: function(res) {
                    if(res.status==1){
                        deferred.resolve(res)
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(error) {
                    deferred.reject('网络繁忙稍后再试');
                }
            })
        }
        return deferred.promise();
    }

    function formSubmit(){
        $("#form_submit").on('click',function(){
            var data={
                phone:$.trim($("#phone").val()),
                idnum:$.trim($("#idnum").val()),
                code:$.trim($("#code").val()),
            }
            infoPost(data).then(function(res){
                window.location.href="/uc/address#cardContainer";
            },function(error){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:error,
                    btn:'确定',
                })
            })

        })
    }

    function messageSubmit(){
        $("#phone_code").on('click',function(){
            var data={
                phone:$.trim($("#phone").val()),
            }
            messagePost(data).then(function(res){
                var count = 60;
                $("#phone_code").prop( "disabled", true ).text(count+'秒').addClass("noClick");
                hb.interval(function(){
                    count--;
                    $("#phone_code").prop( "disabled", true ).text(count+'秒').addClass("noClick");
                },1000,60,function(){
                    $("#phone_code").prop( "disabled", false ).text('重新发送').removeClass("noClick");
                });
            },function(error){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:error,
                    btn:'确定',
                })
            })
        })
    }

    return{
        init:init,
    }

}());