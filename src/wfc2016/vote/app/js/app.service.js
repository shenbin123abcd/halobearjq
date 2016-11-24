app.service=(function(){
    "use strict";
    function getFakeData(){
        var deferred = $.Deferred();
        sendXhr();
        function sendXhr(){
            $.ajax({
                method: "GET",
                url: "http://localhost:1234",
                data: {},
                success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.iRet==1){
                        deferred.resolve(res.data);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //var res=jqXHR.responseJSON;
                    //console.log(res);
                    //console.log(jqXHR);
                    //if(res.iRet==-1){
                    //    deferred.reject(res);
                    //}else{
                    deferred.reject('网络繁忙请稍候再试');
                    //}
                }
            })
            ;
        };
        return deferred.promise();
    }
    function getCompanyCaseList(data){
        var deferred = $.Deferred();
        sendXhr();
        function sendXhr(){
            $.ajax({
                method: "GET",
                url: "/vote/getCompanyWorks",
                data: data,
                success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.status==1){
                        deferred.resolve(res);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //var res=jqXHR.responseJSON;
                    //console.log(res);
                    //console.log(jqXHR);
                    //if(res.iRet==-1){
                    //    deferred.reject(res);
                    //}else{
                    deferred.reject('网络繁忙请稍候再试');
                    //}
                }
            })
            ;
        };
        return deferred.promise();
    }
    function getCompanyList(data){
        var deferred = $.Deferred();
        sendXhr();
        function sendXhr(){
            $.ajax({
                method: "GET",
                url: "/vote/companyrank",
                data: data,
                success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.status==1){
                        deferred.resolve(res);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //var res=jqXHR.responseJSON;
                    //console.log(res);
                    //console.log(jqXHR);
                    //if(res.iRet==-1){
                    //    deferred.reject(res);
                    //}else{
                    deferred.reject('网络繁忙请稍候再试');
                    //}
                }
            })
            ;
        };
        return deferred.promise();
    }
    function apply(data){
        var deferred = $.Deferred();
        // console.log(data)
        switch (true){
            case !data.name:
                deferred.reject('请输入姓名');
                break;
            case !data.company:
                deferred.reject('请输入公司名');
                break;
            case !data.phone:
                deferred.reject('请输入手机号码');
                break;
            case !hb.validation.checkPhone(data.phone):
                deferred.reject('手机号码格式不正确');
                break;
            case !data.wechat:
                deferred.reject('请输入微信号');
                break;


            default:
                sendXhr();
        }

        function sendXhr(){
            $.ajax({
                method: "POST",
                url: "/vote/apply",
                data: data,
                success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.status==1){
                        deferred.resolve(res);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //var res=jqXHR.responseJSON;
                    //console.log(res);
                    //console.log(jqXHR);
                    //if(res.iRet==-1){
                    //    deferred.reject(res);
                    //}else{
                    deferred.reject('网络繁忙请稍候再试');
                    //}
                }
            })
            ;
        };
        return deferred.promise();
    }

    function sendTicketAddress(data){
        var deferred = $.Deferred();
        sendXhr();
        function sendXhr(){
            $.ajax({
                url: "/userinfo/userinfoPost",
                data: data,success: function(res, textStatus, errorThrown) {
                    //console.log(res);
                    if(res.status==1){
                        deferred.resolve(res);
                    }else{
                        deferred.reject(res.info);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //var res=jqXHR.responseJSON;
                    //console.log(res);
                    //console.log(jqXHR);
                    //if(res.iRet==-1){
                    //    deferred.reject(res);
                    //}else{
                    deferred.reject('网络繁忙请稍候再试');
                    //}
                }
            })
        }
    }
    return {
        getFakeData:getFakeData,
        getCompanyCaseList:getCompanyCaseList,
        getCompanyList:getCompanyList,
        apply:apply,
    };
}());