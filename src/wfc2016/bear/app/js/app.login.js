;app.login=(function(){
    "use strict";
    function init() {
        formInit();
    }

    function formInit() {
        $('#login-form').submit(function(event) {
            event.preventDefault();
            var phone = $.trim($('#phone').val())
            var pwd = $('#pwd').val();

            if (!phone) {
                hb.lib.weui.alert('请填写手机号');
                return false;
            }

            if (!/^1[34578]\d{9}$/.test(phone)) {
                hb.lib.weui.alert('手机号填写错误');
                return false;
            }

            if (pwd.length == 0) {
                hb.lib.weui.alert('请填写密码');
                return false;
            }

            $.ajax({
                url: '/bear/login',
                type: 'POST',
                dataType: 'JSON',
                data: {phone: phone,pwd: pwd},
                success: function(res){
                    if (res.status) {
                        window.location.href=res.data;
                    }else{
                        hb.lib.weui.alert(res.info);
                    }
                },
                error:function () {
                    hb.lib.weui.alert('网络繁忙请稍候再试');
                }
            });
        });
    }
    return {
        init:init,
    };
}());


