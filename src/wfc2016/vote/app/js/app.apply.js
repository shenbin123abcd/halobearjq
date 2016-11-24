app.apply=(function(){
    "use strict";
    function init(){
        applyForm();
    }

    function applyForm(){
        $("#apply-form").on('submit',function (event) {
            event.preventDefault();
            hb.lib.weui.loading.show();
            app.service.apply(hb.util.deParam($( this ).serialize())).then(function (res) {
                hb.lib.weui.loading.hide();
                // console.log(res)
                hb.lib.weui.alert({
                    title:'恭喜你, 报名成功！',
                    content:res.info,
                    btn:'我知道了',
                }).then(function(){
                    $("#weixinModal").modal('show');
                });
            },function (res) {
                // console.log(res)
                hb.lib.weui.loading.hide();
                hb.lib.weui.alert({
                    title:'提示',
                    content:res,
                    btn:'我知道了',
                });
            })

        })
    }

    return{
        init:init,
    }

}());