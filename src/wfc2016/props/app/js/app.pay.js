app.pay=(function(){
    "use strict";
    function init() {

    }
    
    var wechat = {
        init: function(){

        },
        order_id: '',
        config:{
            appId: '',
            nonceStr: '',
            package: '',
            signType: '',
            timeStamp: '',
            paySign: ''
        },
        config_4:{
            appId: '',
            nonceStr: '',
            package: '',
            signType: '',
            timeStamp: '',
            paySign: ''
        },
        config_6:{
            appId: '',
            nonceStr: '',
            package: '',
            signType: '',
            timeStamp: '',
            paySign: ''
        },
        config_8:{
            appId: '',
            nonceStr: '',
            package: '',
            signType: '',
            timeStamp: '',
            paySign: ''
        },
        config_9:{
            appId: '',
            nonceStr: '',
            package: '',
            signType: '',
            timeStamp: '',
            paySign: ''
        },
        config_10:{
            appId: '',
            nonceStr: '',
            package: '',
            signType: '',
            timeStamp: '',
            paySign: ''
        },
        config_11:{
            appId: '',
            nonceStr: '',
            package: '',
            signType: '',
            timeStamp: '',
            paySign: ''
        },
        getConfig: function(){
            var _this=this;

            return $.ajax({
                url: '/wechatpay/getSign',
                type: 'GET',
                dataType: 'json',
                // data: {id: hb.location.url("?id")} // 门票编号
                // data: {} // 门票编号
                data: _this.opts.data // 门票编号
            });
        },
        //调用微信JS api 支付
        jsApiCall: function(){
            console.log(this.jsApiCall)
            console.log(this)
            var _this = this;
            if(_this.opts.data.type){
                if(_this.opts.data.type==4){
                    if (this.config_4.appId == '') {
                        this.getConfig().then(function(ret){
                            if (ret.status == 1) {
                                _this.config_4 = ret.data.config;
                                _this.order_id = ret.data.order_id;
                                _this.startPay();
                            }else if(ret.status == -1){
                                // 未登录
                                window.location.href='/weiTicket/wechat';
                            }else{
                                hb.lib.weui.alert(ret.info);
                            }
                        }, function(){
                            hb.lib.weui.alert('网络繁忙，请稍候再试！');
                        });
                    }else{
                        _this.startPay();
                    }
                }
                if(_this.opts.data.type==6){
                    if (this.config_6.appId == '') {
                        this.getConfig().then(function(ret){
                            if (ret.status == 1) {
                                _this.config_6 = ret.data.config;
                                _this.order_id = ret.data.order_id;
                                _this.startPay();
                            }else if(ret.status == -1){
                                // 未登录
                                window.location.href='/weiTicket/wechat';
                            }else{
                                hb.lib.weui.alert(ret.info);
                            }
                        }, function(){
                            hb.lib.weui.alert('网络繁忙，请稍候再试！');
                        });
                    }else{
                        _this.startPay();
                    }
                }
                if(_this.opts.data.type==8){
                    if (this.config_8.appId == '') {
                        this.getConfig().then(function(ret){
                            if (ret.status == 1) {
                                _this.config_8 = ret.data.config;
                                _this.order_id = ret.data.order_id;
                                _this.startPay();
                            }else if(ret.status == -1){
                                // 未登录
                                window.location.href='/weiTicket/wechat';
                            }else{
                                hb.lib.weui.alert(ret.info);
                            }
                        }, function(){
                            hb.lib.weui.alert('网络繁忙，请稍候再试！');
                        });
                    }else{
                        _this.startPay();
                    }
                }
                if(_this.opts.data.type==9){
                    if (this.config_9.appId == '') {
                        this.getConfig().then(function(ret){
                            if (ret.status == 1) {
                                _this.config_9 = ret.data.config;
                                _this.order_id = ret.data.order_id;
                                _this.startPay();
                            }else if(ret.status == -1){
                                // 未登录
                                window.location.href='/weiTicket/wechat';
                            }else{
                                hb.lib.weui.alert(ret.info);
                            }
                        }, function(){
                            hb.lib.weui.alert('网络繁忙，请稍候再试！');
                        });
                    }else{
                        _this.startPay();
                    }
                }
                if(_this.opts.data.type==10){
                    if (this.config_10.appId == '') {
                        this.getConfig().then(function(ret){
                            if (ret.status == 1) {
                                _this.config_10 = ret.data.config;
                                _this.order_id = ret.data.order_id;
                                _this.startPay();
                            }else if(ret.status == -1){
                                // 未登录
                                window.location.href='/weiTicket/wechat';
                            }else{
                                hb.lib.weui.alert(ret.info);
                            }
                        }, function(){
                            hb.lib.weui.alert('网络繁忙，请稍候再试！');
                        });
                    }else{
                        _this.startPay();
                    }
                }
                if(_this.opts.data.type==11){
                    if (this.config_11.appId == '') {
                        this.getConfig().then(function(ret){
                            if (ret.status == 1) {
                                _this.config_11 = ret.data.config;
                                _this.order_id = ret.data.order_id;
                                _this.startPay();
                            }else if(ret.status == -1){
                                // 未登录
                                window.location.href='/weiTicket/wechat';
                            }else{
                                hb.lib.weui.alert(ret.info);
                            }
                        }, function(){
                            hb.lib.weui.alert('网络繁忙，请稍候再试！');
                        });
                    }else{
                        _this.startPay();
                    }
                }
            }else{
                if (this.config.appId == '') {
                    this.getConfig().then(function(ret){
                        if (ret.status == 1) {
                            _this.config = ret.data.config;
                            _this.order_id = ret.data.order_id;
                            _this.startPay();
                        }else if(ret.status == -1){
                            // 未登录
                            window.location.href='/weiTicket/wechat';
                        }else{
                            hb.lib.weui.alert(ret.info);
                        }
                    }, function(){
                        hb.lib.weui.alert('网络繁忙，请稍候再试！');
                    });
                }else{
                    _this.startPay();
                }
            }

        },
        startPay: function(){
            var _this = this;
            var opts=_this.opts;
            if(_this.opts.data.type) {
                if (_this.opts.data.type == 4) {
                    invoke(_this.config_4);
                }
                if (_this.opts.data.type == 6) {
                    invoke(_this.config_6);
                }
                if (_this.opts.data.type == 8) {
                    invoke(_this.config_8);
                }
                if (_this.opts.data.type == 9) {
                    invoke(_this.config_9);
                }
                if (_this.opts.data.type == 10) {
                    invoke(_this.config_10);
                }
                if (_this.opts.data.type == 11) {
                    invoke(_this.config_11);
                }
            }else{
                invoke(_this.config);
            }



            function invoke(config) {
                WeixinJSBridge.invoke('getBrandWCPayRequest', config,
                    function(res){
                        console.log(res);
                        console.log(res.err_msg);
                        WeixinJSBridge.log(res.err_msg);
                        // alert(res.err_code+res.err_desc+res.err_msg);

                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                            // 支付完成 重置配置
                            // _this.config = {appId: '',nonceStr: '',package: '',signType: '',timeStamp: '',paySign: ''}
                            // alert('支付完成');
                            opts.onSuccess();
                        }else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                            // 支付取消
                            // alert('支付取消');
                            opts.onCancel();
                        }else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                            // 支付失败
                            // alert('支付失败');
                            opts.onFail(res.err_desc);
                        }
                    }
                );
            }

        },
        // 唤起支付
        opts:{},
        callpay: function (opts){
            var _this=this;
            var opts=opts||{};
            opts.onSuccess=opts.onSuccess||function () {};
            opts.onCancel=opts.onCancel||function () {};
            opts.onFail=opts.onFail||function () {};
            opts.data=opts.data||{};
            this.opts=opts;
            // console.log(this.jsApiCall)


            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', function () {
                        _this.jsApiCall();
                    }, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', function () {
                        _this.jsApiCall();
                    });
                    document.attachEvent('onWeixinJSBridgeReady', function () {
                        _this.jsApiCall();
                    });
                }
            }else{
                this.jsApiCall();
            }


        }
    }
    return{
        init:init,
        wechat:wechat,
    }
}());
