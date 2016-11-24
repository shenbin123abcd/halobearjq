app.vote=(function(){
    "use strict";
    var appData;
    function init() {
        PAGE.init();
    }



    var VOTE = {
        obj: {},
        data: {id: 0, type: 1, code: ''},
        submit_status: 0,
        works_parse: {},
        url: encodeURIComponent(window.location.href),
        init: function(){
            var _this = this;
            appData=window.appData||{};
            _this.data.code = appData.code;
            $('body').on('click', '[vote-bt]', function() {
                _this.obj = $(this);
                _this.data.id = $(this).data('id');
                _this.data.companyName = $(this).data('companyName');
                // app.common.vote_alert_success(_this.data.companyName);
                _this.action();
            });
        },
        action: function(){
            // 检查时间
            if (hb.location.url('?halo') !== 'test2015') {
                if(new Date('2016/07/18 19:50:00').getTime() > new Date().getTime()){
                    hb.lib.weui.confirm({
                        content:'<div style="text-align: center;">投票将于07月18日 20:00开始，<br>敬请期待</div>',
                        rightBtn:'报名参赛'
                    }).then(function () {
                        window.location.href='/vote/apply';
                    });
                    return false;
                }else if (new Date('2016/07/20 20:00:00').getTime() < new Date().getTime()) {
                    hb.lib.weui.alert('投票已结束，08月16日南京见！');
                    return false;
                }
            }
            var works_id = localStorage.getItem('works_vote_id');
            var day = new Date().getDate();

            this.works_parse = works_id === null ? {} : JSON.parse(works_id);

            if ($.type(this.works_parse[this.data.id]) !== 'undefined' && this.works_parse[this.data.id] === day) {
                hb.lib.weui.alert('每天只能为每个作品投票一次哦！');
                return;
            }

            if (Modernizr.weixin){
                this.wechat();
            }else{
                hb.lib.weui.alert('请使用微信进行投票！');
                return false;
            }

        },
        wechat: function(){
            if (!hb.Cookies.get('wfc2016_vote_id')) {
                window.location.href = '/vote/wechat?url=' + this.url;
                return false;
            }
            this.data.type = 1;
            this.submit();
        },
        submit: function(){
            var _this = this;
            var obj = $('[vote-num][case="case-'+this.data.id+'"]');
            
            hb.lib.weui.loading.show();
            $.ajax({
                url: '/vote/worksAct',
                type: 'post',
                dataType: 'json',
                data: this.data,
                success: function(res){
                    if (res.status == 1) {
                        _this.works_parse[_this.data.id] = new Date().getDate();
                        localStorage.setItem('works_vote_id',JSON.stringify(_this.works_parse));


                        var num = parseInt($(obj.get()[0]).text());

                        obj.text(++num);
                        _this.obj.addClass('disabled').text('已投票');

                        // hb.lib.weui.alert(res.info);

                        app.common.vote_alert_success(_this.data.companyName);


                    }else if (res.status == -1) {
                        // 微信未授权
                        window.location.href = '/vote/wechat?url=' + _this.url;
                    }else{
                        _this.obj.text('投票');
                        hb.lib.weui.alert(res.info);
                    }
                    hb.lib.weui.loading.hide();
                },
                error:function () {
                    hb.lib.weui.loading.hide();
                    hb.lib.weui.alert('网络繁忙请稍候再试');
                }
            });
        }
    };

    var PAGE = {
        init: function(){

            //
            // if(Modernizr.weixin){
            //     window.app.wechat.init();
            // }

            VOTE.init();
            this.setVote();
        },
        setVote: function(){
            var works_id = localStorage.getItem('works_vote_id');

            if (works_id == null) {
                return false;
            }

            works_id = JSON.parse(works_id);

            if (works_id.length == 0) {
                return false;
            }

            $.each(works_id, function(index, val) {
                if (new Date().getDate() === val) {
                    $('[vote-bt][data-id='+ index +']').addClass('disabled').text('已投票');
                }
            });
        }
    };


    return{
        init:init,
    }
}());
