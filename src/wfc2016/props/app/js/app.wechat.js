app.wechat=(function(){
    "use strict";
    function init() {
        wechat.init();
    }
    var id=hb.Cookies.get('wechat_ticket_id');

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
            title: '「千万补贴 底价来袭」2016中国婚礼行业高峰论坛',
            content: '「千万补贴 底价来袭」2016中国婚礼产业博览会|婚庆道具采购狂欢节|08月16-18日中国南京',
            link: 'http://wfc.halobear.com/props/index',
            logo: 'http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/props/images/propscover/weichat-share.png'
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
