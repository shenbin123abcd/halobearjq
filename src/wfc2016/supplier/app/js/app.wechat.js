app.wechat=(function(){
    "use strict";
    function init() {
        wechat.init();
    }

    var wechat = {
        init: function() {
            var _this = this;
            var appData=window.appData||{};
            if (typeof(appData.share) !== 'undefined') {
                this.data.title = appData.share.title||this.data.title;
                this.data.content = appData.share.content||this.data.content;
                this.data.link = appData.share.link||this.data.link;
                this.data.logo = appData.share.logo||this.data.logo;
            }
            $.getScript('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function(data, textStatus) {
                if (textStatus == 'success') {
                    _this.act();
                }
            });
        },
        data:{
            title: '2016中国最佳婚礼服务商评选',
            content: '「让强者更强」2016中国最佳婚礼服务商网络评选，与中国最优秀的婚嫁产业实践者共创行业未来！',
            link: 'http://wfc.halobear.com/supplier/',
            logo: 'http://7ktq5x.com1.z0.glb.clouddn.com/vote_wechat_sup.png'
        },
        act: function() {
            var _this = this;
            $.ajax({
                url: '/vote/getWechat',
                type: 'get',
                data: {
                    url: encodeURIComponent(window.location.href.split('#')[0])
                },
                dataType: 'json',
                success: function(ret) {
                    wx.config($.extend({
                        // debug:1,
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
                    }, ret));
                    wx.ready(function() {
                        wx.onMenuShareTimeline({
                            title: _this.data.content,
                            desc: "",
                            link:  _this.data.link,
                            imgUrl:  _this.data.logo,
                            dataUrl: '',
                            success: function(res) {},
                            cancel: function() {}
                        });
                        wx.onMenuShareAppMessage({
                            title: _this.data.title,
                            desc:  _this.data.content,
                            link:  _this.data.link,
                            imgUrl:  _this.data.logo,
                            dataUrl: '',
                            success: function(res) {},
                            cancel: function() {}
                        });
                        wx.onMenuShareQQ({
                            title: _this.data.title,
                            desc:  _this.data.content,
                            link:  _this.data.link,
                            imgUrl:  _this.data.logo,
                            dataUrl: '',
                            success: function(res) {},
                            cancel: function() {}
                        });
                    });
                }
            });
        },
        shareCount: function(){

        }
    };




    return{
        init:init,
    }
}());
