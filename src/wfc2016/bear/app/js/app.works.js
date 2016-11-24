;app.works=(function(){
    "use strict";
    function init() {
        works.init();
        initLogout();
        // hb.lib.weui.loading.show();
    }

    // function initInput() {
    //     $("[works-control]").each(function () {
    //         $(this).on('focus',function () {
    //             $(this).nextAll().add($(this)).removeClass('complete').addClass('fill');
    //
    //         });
    //         $(this).on('blur',function () {
    //             var val = parseInt($(this).val());
    //             var max = $(this).attr('max');
    //
    //             if ((val > max || val < 1) || (isNaN(val) && $(this).val() != '')) {
    //                 hb.lib.weui.alert('分数填写错误，请填写1-'+ max +'分').then(()=> {
    //                     $(this).val('').focus();
    //                 });
    //                 return
    //             }
    //             if(!$(this).val()){
    //                 $(this).nextAll().add($(this)).removeClass('fill');
    //                 $(this).nextAll('[works-score]').empty();
    //             }else{
    //                 $(this).nextAll().add($(this)).addClass('complete');
    //                 $(this).nextAll('[works-score]').html(`<span class="num">${val}</span><span class="fen">分</span>`);
    //             }
    //         });
    //     });
    // }

    var works = {
        data: {id: 0,step1: 0, step2: 0, step3: 0, step4: 0, step5: 0},
        c_data: {title:null,team:null},
        test2: null,
        submit_status: 0,
        init: function(){
            var _this = this;
            // $('input').blur(function() {
            //     var val = parseInt($(this).val()), max = $(this).attr('max');
            //     if ((val > max || val < 1) || (isNaN(val) && $(this).val() != '')) {
            //         alert('分数填写错误，请填写1-'+ max +'分');
            //         $(this).val('').focus();
            //     }else if(val > 0 && val < max+1){
            //         _this.data[$(this).data('type')] = val;
            //     }
            // });

            $("[works-control]").each(function () {
                $(this).on('focus',function () {
                    $(this).nextAll().add($(this)).removeClass('complete').addClass('fill');

                });
                $(this).on('blur',function () {
                    var val = parseInt($(this).val());
                    var max = $(this).attr('max');

                    if ((val > max || val < 1) || (isNaN(val) && $(this).val() != '')) {
                        hb.lib.weui.alert('分数填写错误，请填写1-'+ max +'分').then(()=> {
                            $(this).val('').focus();
                        });
                        return
                    }
                    if(!$(this).val()){
                        $(this).nextAll().add($(this)).removeClass('fill');
                        $(this).nextAll('[works-score]').empty();
                    }else{
                        $(this).nextAll().add($(this)).addClass('complete');
                        $(this).nextAll('[works-score]').html(`<span class="num">${val}</span><span class="fen">分</span>`);
                        _this.data[$(this).data('type')] = val;
                    }
                });
            });

            _this.getStatus();
            setInterval(function(){
                _this.getStatus();
            }, 5000);

            _this.act();
        },
        cutdown: function(callback){
            // callback();

            // $('.cutdown').show();
            // $('.over').hide();
            //
            // $('.cutdown span').text('5');
            //
            //
            // $('.dialog-box').removeClass('zoomOutDown').show().addClass('zoomInUp');
            $('#pause-wrapper').hide();
            var _this=this;
            $('#progress-wrapper').show().removeClass('zoomOutDown').show().addClass('zoomInUp');
            // $("#progress-wrapper").show();
            // console.log(_this.test2);
            if(!_this.test2){
                // console.log($('.newtest2').data('circles'));
                $('.newtest2').circles({
                    showProgress: 1,
                    initialPos:0,
                    targetPos:6,
                    reverse:true,
                    scale: 6,
                    speed: 14,
                    onFinishMoving:function(pos){
                        console.log('done ',pos);
                        callback();
                        $(".newtest2").empty();
                        $("#progress-wrapper").hide();
                        _this.test2=null;
                        $('.newtest2').removeData('circles');

                    }
                });
                // console.log($('.newtest2').data('circles'))
            }
            _this.test2 = $('.newtest2').data('circles');


            // var time = 6;
            // var setint = setInterval(function(){
            //     time--;
            //     console.log(time)
            //     if (time == 0) {
            //         clearInterval(setint);
            //         // $('.dialog-box').removeClass('zoomInUp').addClass('zoomOutDown');
            //
            //         $(".newtest2").empty();
            //         $("#progress-wrapper").hide();
            //         _this.test2=null;
            //         $('.newtest2').removeData('circles');
            //         setTimeout(function(){
            //             callback();
            //         },1000);
            //     }else{
            //         // $('.cutdown span').text(time);
            //         _this.test2.moveProgress(6-time);
            //     }
            // },1000);
        },
        status: {},
        getStatus: function(){
            var _this = this;
            $.ajax({
                url: '/bear/getStatus',
                type: 'GET',
                dataType: 'json',
                success: function(res){
                    if (res.status == 1 && (typeof(_this.status[res.data.id]) == 'undefined' || _this.data.id == 0)) {
                        $('[works-control]').val('').nextAll().addBack().removeClass('complete fill');
                        $('[works-score]').html('');
                        _this.submit_status = 0;
                        _this.data.id = res.data.id;
                        _this.c_data.title = res.data.title.replace(/\r\n|\n/g,'').replace(/&amp;/g,'&');
                        _this.c_data.team = res.data.team.replace(/\r\n|\n/g,'').replace(/&amp;/g,'&');
                        _this.status[res.data.id] = 1;
                        _this.cutdown(function(){
                            $.typer.options.typeSpeed = 150;
                            $('h5').typeTo('《'+_this.c_data.title+'》');
                            setTimeout(function(){
                                $('h6').typeTo(_this.c_data.team);
                            },2000);
                        });
                    }else if(res.status == 1&&_this.data.id!=res.data.id){
                        _this.submit_status = 0;
                        _this.data.id = res.data.id;
                        _this.c_data.title = res.data.title.replace(/\r\n|\n/g,'').replace(/&amp;/g,'&');
                        _this.c_data.team = res.data.team.replace(/\r\n|\n/g,'').replace(/&amp;/g,'&');
                        _this.status[res.data.id] = 1;

                        //console.log($('h5').data())
                        //console.log($('h6').data())


                        //$('h5').text('《'+_this.data.title+'》');
                        //setTimeout(function(){
                        //
                        //    $('h6').typeTo(_this.data.team);
                        //},5000);

                        //if(_this.data.id != res.data.id){
                        //    $.typer.options.typeSpeed = 150;
                        //    $('h5').typeTo('《'+_this.c_data.title+'》');
                        //    setTimeout(function(){
                        //        $('h6').typeTo(_this.c_data.team);
                        //    },2000);
                        //}


                       //if($('h5').html()!='《'+_this.c_data.title+'》'){
                       //    $('h5').typeTo('《'+_this.c_data.title+'》');
                       //}
                       //if($('h6').html()!=_this.c_data.team){
                       //    setTimeout(function(){
                       //        $('h6').typeTo(_this.c_data.team);
                       //    },2000);
                       //}
                       // $.typer.options.typeSpeed = 150;
                       // $('h5').typeTo('《'+_this.data.title+'》');
                       // setTimeout(function(){
                       //     $('h6').typeTo(_this.data.team);
                       // },2000);
                    }else if(res.status == 0){
                        _this.data.id = 0;
                        _this.submit_status = 1;

                        $(".newtest2").empty();
                        $("#progress-wrapper").hide();
                        _this.test2=null;
                        $('.newtest2').removeData('circles');

                        // $('.cutdown').hide();
                        // $('.over').show();
                        $('#pause-wrapper').show().addClass('zoomInUp');
                        // $('#pause-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        //     $('#pause-wrapper').removeClass('zoomInUp')
                        // });
                        // $('.dialog-box').removeClass('zoomOutDown').fadeIn();
                        $('.tips-text').text('');
                    }
                }
            })
                .fail(function() {
                    hb.lib.weui.alert('网络繁忙，请刷新页面重试').then(()=> {
                        window.location.reload();
                    });
                    // alert('网络繁忙，请刷新页面重试');
                });
        },
        act: function(){
            var _this = this;
            $('.submit-btn').click(function() {
                var _self = $(this);
                if (_this.submit_status) {
                    return false;
                }else if (_this.data.id == 0) {
                    hb.lib.weui.alert('打分尚未开始');
                    return false;
                }else if (_this.data.step1 == 0) {
                    hb.lib.weui.alert('请为宴会设计打分').then(()=> {
                        $("[works-control][data-type='step1']").focus();
                    });

                    return false;
                }else if (_this.data.step2 == 0) {
                    hb.lib.weui.alert('请为感性人文打分').then(()=> {
                        $("[works-control][data-type='step2']").focus();
                    });

                    return false;
                }else if (_this.data.step3 == 0) {
                    hb.lib.weui.alert('请为主题创意打分').then(()=> {
                        $("[works-control][data-type='step3']").focus();
                    });
                    return false;
                }else if (_this.data.step4 == 0) {
                    hb.lib.weui.alert('请为视觉审美打分').then(()=> {
                        $("[works-control][data-type='step4']").focus();
                    });
                    return false;
                }else if (_this.data.step5 == 0) {
                    hb.lib.weui.alert('请为现场表现打分').then(()=> {
                        $("[works-control][data-type='step5']").focus();
                    });
                    return false;
                }

                _this.submit_status = 1;
                // _self.html('分数提交中<span class="ani_dot">...</span>');
                hb.lib.weui.loading.show();
                $.ajax({
                    url: '/bear/scoreAct',
                    type: 'POST',
                    dataType: 'json',
                    data: _this.data,
                    success: function(res){
                        // _self.html('提交分数');
                        hb.lib.weui.loading.hide();
                        if (res.status == 1) {
                            $('.tips-text').text(res.info).removeClass('danger').addClass('success tips-animation');
                            // $('input[type=number]').val('');
                            $('[works-control]').val('').nextAll().addBack().removeClass('complete fill');
                            $('[works-score]').html('');

                            _this.data.step1 = _this.data.step2 = _this.data.step3 = _this.data.step4 = _this.data.step5 = 0;
                        }else{

                            $('.tips-text').text(res.info).removeClass('success').addClass('danger tips-animation');
                            // $('.tips-text').text(res.info).removeClass('btn-success').addClass('btn-danger tips-animation');
                        }
                        _this.submit_status = 0;
                        setTimeout(function(){
                            $('.tips-text').removeClass('tips-animation');
                        },3000);
                    }
                })
                    .fail(function() {
                        hb.lib.weui.loading.hide();
                        _this.submit_status = 0;
                        // alert('网络连接失败，请刷新页面重试');
                        hb.lib.weui.alert('网络连接失败，请刷新页面重试').then(()=> {
                            window.location.reload();
                        });
                    });
            });
        }
    };
    function initLogout() {
        $('[works-logout]').each(function () {
            // console.log(this);
            var myElement=this;
            var myOptions={
                recognizers: [
                    [Hammer.Press,{
                        pointers:2,
                        threshold:500,
                        time:1000,
                    }],
                ]
            };

            var hammertime = new Hammer(myElement, myOptions);
            hammertime.on('press', function(ev) {
                console.log(ev);
                ev.preventDefault();
                hb.lib.weui.confirm('您确定要退出吗?').then(function (res) {
                    hb.Cookies.remove('wfc2016_bear_auth');
                    window.location.href='/bear/login';
                })
            });
        });

    }


    return {
        init:init,
        works:works,
    };
}());

