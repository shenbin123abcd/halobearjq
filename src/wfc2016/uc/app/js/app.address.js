app.address=(function(){
    "use strict";
    function init(){
        hashChange();
        addressSubmit();
        formSelect();
        placeholder();
        cardInfoSubmit();
        reEdit()
    }
    function hashChange(){
        $(window).on('load hashchange',function(){
            var hash=hb.location.url('hash');
            if(hash){
                $('body').children().not('#loadingToast').hide();
                if(hash=="addressSuccess"){
                    $("#address-success").show();
                    $(".html-2").removeClass('no-liner').removeClass('white').addClass('liner').addClass('height');
                    $("[title]").html('填写门票快递地址');
                }else if(hash=="cardContainer"){
                    $("#card-container").show();
                    $(".html-2").removeClass('liner').removeClass('white').addClass('no-liner').addClass('height');
                    $("[title]").html('峰会个人胸卡信息');
                    uploaderAvatar();

                    $("#card-form input").each(function(index){
                        if($(this).val()==""){
                            $("[placeholderl]").eq(index).show();
                        }else{
                            $("[placeholderl]").eq(index).hide();
                        }
                    });
                    //if($("#card_name").val()){
                    //    $("[placeholderl]").hide();
                    //}else{
                    //    $("[placeholderl]").show();
                    //}
                }else if(hash=="cardInterview"){
                    $("#card-interview").show();
                    $(".html-2").removeClass('liner').removeClass('no-liner').addClass('white').addClass('height');
                    $("[title]").html('峰会个人胸卡信息');
                }else if(hash=='InterviewSuccess'){
                    $("#card-interview-success").show();
                    $(".html-2").removeClass('no-liner').removeClass('white').addClass('liner').addClass('height');
                    $("[title]").html('峰会个人胸卡信息');
                }
            }else{
                $('body').children().not('#loadingToast').hide();
                $("#address-container").show();
                $(".html-2").removeClass('no-liner').removeClass('white').addClass('liner').removeClass('height');
                $("[title]").html('填写门票快递地址');

            }
        })
    };
    function formSelect(){
        var province=`<option></option>`;
        app.service.findProvince().then(function(res){
            $.each(res, function(index, val) {
                province += '<option value="'+ val.region_id +'">'+ val.region_name +'</option>';
            });
            $('#province').html(province);
        },function(error){
            hb.lib.weui.alert({
                title:'温馨提示',
                content:error,
                btn:'确定',
            })
        });

        $("#province").on('change',function(){
            var id=$(this).val();
            var text=$(this).find("option:selected").text();
            var city=`<option></option>`;
            var region=`<option></option>`;
            var height=45;
            if(id==2 || id==19 || id==793 || id==2241){
                /*$("#maybeNoCity").animate({
                    'height':0,
                    'padding':0
                },400,function(){
                    $("#maybeNoCity").data('city','none').hide();
                });*/
                city=`<option>${$('#province').find("option:selected").text()}</option>`;
                $('#city').html(city);
                $("#maybeNoCity").data('city','none');
                app.service.findRegion({
                    'city':id
                }).then(function(res){
                    //console.log(res);
                    $.each(res, function(index, val) {
                        region += '<option value="'+ val.region_id +'">'+ val.region_name +'</option>';
                    });
                    $('#region').html(region);
                },function(error){
                    hb.lib.weui.alert({
                        title:'温馨提示',
                        content:error,
                        btn:'确定',
                    })
                })
            }else if(id==3226 || id==3227){
                city=`<option>${$('#province').find("option:selected").text()}</option>`;
                region=`<option>${$('#province').find("option:selected").text()}</option>`;
                $('#city').html(city);
                $("#region").html(region);
                $("#maybeNoRegion").data('region','none');
                $("#maybeNoCity").data('city','none');
            }else{
               /* $("#maybeNoCity").data('city','yes').show();
                $("#maybeNoCity").animate({
                    'height':height
                },400);
                $('#region').find("option:selected").text('请选择');*/
                $("#maybeNoCity").data('city','yes');
                $("#maybeNoRegion").data('region','yes');
                app.service.findCity({
                    'city':id
                }).then(function(res){
                    $.each(res, function(index, val) {
                        city += '<option value="'+ val.region_id +'">'+ val.region_name +'</option>';
                    });
                    $('#city').html(city);

                },function(error){
                    hb.lib.weui.alert({
                        title:'温馨提示',
                        content:error,
                        btn:'确定',
                    })
                })
            }
        })

        $("#city").on('change',function(){
            var id=$(this).val();
            var region=`<option></option>`;
            app.service.findRegion({
                'city':id
            }).then(function(res){
                //console.log(res);
                $.each(res, function(index, val) {
                    region += '<option value="'+ val.region_id +'">'+ val.region_name +'</option>';
                });
                $('#region').html(region);
            },function(error){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:error,
                    btn:'确定',
                })
            })
        })
    };
    function addressSubmit(){
        $("#form-submit").on('click',function(event){
            var href=(window.location.href).split('#')[0]+'#addressSuccess';
            var cityStr="";
            var regionStr='';
            event.preventDefault();
            if($("#maybeNoCity").data('city')=='none'){
                cityStr=$('#province').val();
            }else{
                cityStr=$('#city').val();
            }
            if($("#maybeNoRegion").data('region')=='none'){
                regionStr=$('#province').val();
            }else{
                regionStr=$('#region').val();
            }
            app.service.sendTicketAddress({
                'company_name':$.trim($("#company_name").val()),
                'name':$.trim($("#name").val()),
                'phone':$("#phone").val(),
                'idnum':$.trim($("#idnum").val()),
                'province':$('#province').val(),
                'city':cityStr,
                'region':regionStr,
                'address':$.trim($("#address").val()),
                'method':$('#method').find("option:selected").text(),
            }).then(function(res){
                //console.log(res)
                window.location.href=href;
            },function(res){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:res,
                    btn:'确定',
                })
            })
        })
    }

    // 检查头像
    function checkAvatar($src){
        return $.ajax({
            url: $src + '?tusdk-face/landmark'
        });
    }
    function uploaderAvatar(){
        var href=(window.location.href).split('#')[0]+'#cardInterview';
        var header_img="";

        app.service.qiniu('uploader-avatar-btn',function(up, file, info){
            var res = JSON.parse(info);
            var src = config.baseurl + res.key;
			
			header_img=src;
			$("#uploader-avatar-btn >img").addClass('edit-width').prop("src",src);
			app.service.loading.hide();

            // 检查头像是否合法
            /*checkAvatar(src).then(function(result){
                if (result.ret == 200){
                    //$('#uploader-avatar-btn').hide();
                    //$("#upload-avatar").show();
                    if(result.data.count==1){
                        header_img=src;
                        $("#uploader-avatar-btn >img").addClass('edit-width').prop("src",src);
                        app.service.loading.hide();
                        //$("#avatar>.moxie-shim.moxie-shim-html5").remove();
                    }else{
                        app.service.loading.hide();
                        hb.lib.weui.alert({
                            title:'温馨提示',
                            content:`上传的图片可能有${result.data.count}个头像，请重新上传！`,
                            btn:'确定',
                        });
                    }
                }else{
                    app.service.loading.hide();
                    hb.lib.weui.alert({
                        title:'温馨提示',
                        content:"我们检测到您上传的不是头像照，请重新上传！",
                        btn:'确定',
                    })
                }

            }, function (error) {
                //alert('error');
            });*/

        },function(){

        });

        $("#toInterview").on('click',function(event){
            event.preventDefault();
            $(".weui_dialog_alert").remove();
            app.service.toInterview({
                'card_name':$.trim($("#card_name").val()),
                'card_company':$.trim($("#card_company").val()),
                'position':$.trim($("#position").val()),
                'head_img':header_img,
            }).then(function(data){
                window.location.href=href;
                //console.log(data);
                $("#interview-img").prop('src',data.head_img);
                $("#interview-name").text(data.card_name);
                $("#interview-position").text(data.position);
                $("#interview-company").text(data.card_company);
            },function(error){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:error,
                    btn:'确定',
                }).then(function(){
                    if(!$.trim($("#position").val())){
                        $("#position").focus();
                    }
                })
            })
        })
    }
    function cardInfoSubmit(){
        var href=(window.location.href).split('#')[0]+'#InterviewSuccess';
        $("#interview-ok").on('click',function(){
            app.service.sendCardInfo({
                'head_img':$("#interview-img").prop('src'),
                'position':$.trim($("#interview-position").text()),
                'name':$.trim($("#interview-name").text()),
                'company_name':$.trim($("#interview-company").text()),
            }).then(function(res){
                window.location.href=href;
            },function(error){
                hb.lib.weui.alert({
                    title:'温馨提示',
                    content:error,
                    btn:'确定',
                })
            })
        })
    }
    function placeholder(){
        $(".card-container-block input").each(function(index){
            $(".card-container-block input").eq(index).on('input',function(){
                if($(this).val()==""){
                    $("[placeholderl]").eq(index).show();
                }else{
                    $("[placeholderl]").eq(index).hide();
                }
            })
        })
    }
    function reEdit(){
        $("#interview-cancel").on('click',function(event){
            //event.preventDefault();
            //$("[placeholder]").hide();
            $("#avatar>.moxie-shim.moxie-shim-html5").remove();
            $('#uploader-avatar-btn').show();
            $('#upload-avatar').hide();
            $("#uploader-avatar-btn img").prop('src',$("#interview-img").prop('src')).addClass('edit-width');
        })
    }
    return{
        init:init,
    }

}());