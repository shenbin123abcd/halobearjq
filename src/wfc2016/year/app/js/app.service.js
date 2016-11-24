app.service=(function(){
    "use strict";
    function proveInfo(){
        var deferred=$.Deferred();
        if(is_ticket==1){
            deferred.resolve('验证成功');
        }else{
            deferred.reject('验证不成功');
        }
        return deferred.promise();
    }

    function getComment(data){
        var deferred=$.Deferred();
        //deferred.resolve({status:1,data:resData});
        sendXhr()
        function sendXhr(){
            $.ajax({
                url: "/year/getComment",
                data: data,
                type:'POST',
                dataType:"json",
                success:function(res){
                    if(res.status==1){
                        deferred.resolve(res.data);
                    }
                },
                error:function(res){
                    deferred.reject("网络繁忙稍后再试");
                }
            })
        }
        return deferred.promise();
    }

    //发手机验证码
    function getPhoneMessage(data){
        var deferred=$.Deferred();
        switch(true){
            case !data.phone:
                deferred.reject('请输入手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                deferred.reject('手机号码格式不正确！');
                break;
            default:
                sendXhr()
                //deferred.resolve('发送验证码成功');
        }

        function sendXhr(){
            $.ajax({
                url: "/uc/getCode",
                data: data,
                type:'POST',
                dataType:"json",
                success:function(res){
                    if(res.status==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error:function(res){
                    deferred.reject("网络繁忙稍后再试");
                }
            })
        }
        return deferred.promise();
    }

    //提交门票等消息
    function sendProveMessage(data){
        var deferred=$.Deferred();
        switch(true){
            case !data.idnum:
                deferred.reject('请输入门票序列号');
                break;
            case !data.phone:
                deferred.reject('请输入手机号');
                break;
            case !hb.validation.checkPhone(data.phone):
                deferred.reject('手机号码格式不正确！');
                break;
            case !data.code:
                deferred.reject('请输入验证码');
                break;
            default:
                sendXhr()
                //deferred.resolve({status:0});
        }
        function sendXhr(){
            $.ajax({
                url: "/year",
                data: data,
                type:'POST',
                dataType:"json",
                success:function(res){
                    if(res.status==1){
                        deferred.resolve(res.status);
                    }else if(res.status==0){
                        deferred.reject(res.info);
                    }else if(res.status==-1){
                        deferred.resolve(res.status);
                    }
                },
                error:function(res){
                    deferred.reject("网络繁忙稍后再试");
                }
            })
        }
        return deferred.promise();
    }

    function yearVote(data){
        var deferred = $.Deferred();
        //deferred.resolve({status:1,data:data});
        sendXhr();
        function sendXhr(){
            $.ajax({
                url: "/year/worksAct",
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
            });
        }
        return deferred.promise();
    }

    //评论
    function sendComment(data){
        var deferred = $.Deferred();
        switch (true){
            case !data.content:
                deferred.reject('评论不能为空');
                break;
            case data.content.length>15:
                deferred.reject('评论不能超过15个字');
                break;
            default:
                sendXhr();
                //deferred.resolve(data);
        }
        function sendXhr(){
            $.ajax({
                url: "/year/comment",
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

    //分享后+1
    function afterShare(data){
        var deferred=$.Deferred();
        sendXhr();
        function sendXhr(){
            $.ajax({
                url: "/year/setShare",
                data: data,
                type:'POST',
                dataType:"json",
                success:function(res){
                    if(res.status==1){
                        deferred.resolve(res.status);
                    }else if(res.status==0){
                        deferred.reject(res.info);
                    }
                },
                error:function(res){
                    deferred.reject("网络繁忙稍后再试");
                }
            })
        }
        return deferred.promise();
    }
    return{
        proveInfo:proveInfo,
        getPhoneMessage:getPhoneMessage,
        sendProveMessage:sendProveMessage,
        sendComment:sendComment,
        yearVote:yearVote,
        getComment:getComment,
        afterShare:afterShare,
    }

}());