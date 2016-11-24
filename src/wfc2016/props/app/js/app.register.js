app.register=(function(){
    "use strict";

    function init(){
        changeTitle();
        registerSubmit();
    }

    function service(data){
        var deferred=$.Deferred();
        switch(true){
            case !data.username:
                deferred.reject('请输入姓名');
                break;
            case !data.sex:
                deferred.reject('请选择性别');
                break;
            case !data.phone:
                deferred.reject('请输入手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                deferred.reject('手机号码格式不正确！');
                break;
            default:
                sendXhr();
                //console.log(data);
        }
        function sendXhr(){
            $.ajax({
                url: "/props/hotelRegister",
                data: data,
                type:'POST',
                dataType:"json",
                success: function(res) {
                    if(res.status==1){
                        deferred.resolve(res);
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

    function registerSubmit(){
        $("#form_submit").on('click',function(e){
            e.preventDefault();
            service({
                username:$.trim($("#name").val()),
                phone:$.trim($("#phone").val()),
                remark:$.trim($("#info").val()),
                sex:$('#sex').val(),
            }).then(function(res){
                // console.log(res);
                window.location.href='/uc/hotels';
            },function(res){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:res,
                    btn:'确定',
                })
            })
        });
    }
    function changeTitle(){
        $(window).on('load hashchange',function(){
            var hash=window.location.hash;
            var type=hash.split('=')[1];
            if(type==6){
                $("#register_title").text('快捷酒店四晚住宿登记');
            }else if(type==8){
                $("#register_title").text('五星级酒店四晚住宿登记');
            }else if(type==9){
                $("#register_title").text('四星级酒店四晚住宿登记');
            }
            $("#register_title").data('type',type);
        });
    }


    return{
        init:init,
    }

}());