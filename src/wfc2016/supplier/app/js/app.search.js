app.search=(function(){
    "use strict";
    function init(){
        hotSearch();
        searchFormSubmit();
        // loadMore();
    }
    function initSearchForm(){
        var htmlStr=`
            <div class="page-search search-dialog">
                <div class="page-search-title clearfix">
                    <form class="clearfix" action="/supplier/search" id="search_form">
                        <div class="form-group clearfix search-form">
                            <i class="haloIcon haloIcon-glass-3 f-18"></i>
                            <input type="text" name="name" class="form-control input f-14" placeholder="请输入公司名" id="search_input">
                        </div>
                        <a class="form-btn btn f-14" type="button" id="cancel"  onclick="window.history.go(-1)">取消</a>
                    </form>
                </div>
                <div class="page-search-hot">
                    <div class="title f-14">热门搜索</div>
                    <div class="tip-block clearfix" id="hot-tip-content"><div id="loading-more" style="margin-left:15px;"><i class="haloIcon haloIcon-spin haloIcon-spinner f-20"></i></div></div>
                </div>
                <div class="page-search-history">
                    <div class="title f-14">历史搜索</div>
                    <div class="tip-block" id="history-tip-content"><div id="loading-more"><i class="haloIcon haloIcon-spin haloIcon-spinner f-20"></i></div></div>
                    <div class="page-search-clear">
                        <button class="btn clear-history-btn" id="history-clear">清空历史记录</button>
                    </div>
                </div>
            </div>
        `;
        var $html=$(htmlStr);
        $(window).on("load hashchange",function(){
            var hash=hb.location.url('hash');
            var domain=hb.location.url('domain');
            // var historylist=hb.Cookies.getJSON('halo_supplier_history')||[];
            //console.log(historylist)

            if(hash=='tosearch'){
                $("html").css({
                    height:'100%',
                    overflow:'hidden',
                });
                $("body").children().not( ".modal,#remark" ).hide();
                $("body").append($html);
                searchFormSubmit();


                hotSearch();

                $("#history-clear").on("click",function(){
                    hb.Cookies.remove('halo_supplier_history');
                    $(".page-search-history").animate({
                        height:0
                    },400,function(){
                        $(".page-search-history").empty().html('');
                    });
                })

            }else{
                $("body").children().not( ".modal,#remark" ).show();
                $("html").css({
                    height:'',
                    overflow:'',
                });
                $html.remove();
            }


        });
    }

    function loadMore() {
        var loading=false;
        var page=2;

        hb.scroll(window,{
            bottom:100,
            reachBottom:loadNext
        });
        function loadNext() {
            if(loading){
                return;
            }
            loading=true;
            $("#search-load-more").append(`<div id="loading-more"><i class="haloIcon haloIcon-spin haloIcon-spinner f-20"></i></div>`);
            app.service.getCompanyList({
                page:page,
                name:$("#search_input").val()
            }).then(function (res) {
                var htmlStr=``;
                var fakeData=[{'id':1,'company':'aien1'},{'id':1,'company':'aien2'}];
                res.data=res.data||[];
                if(res.data.length==0){
                    $("#loading-more").remove();
                    return;
                }
                res.data.forEach(function(n,i){
                    htmlStr+=`
                    <div class="item">
                        <a class="img-box" href="/supplier/detail?id=${n.id}">
                            <img class="img" src="${n.logo}"  >
                        </a>
                        <div class="info-box">
                            <div class="name">${n.name}</div>
                            <div class="area">${n.province}|${n.city}</div>
                        </div>
                        <div class="point-box">
                            <span>${n.num}</span>票
                        </div>
                    </div>
                     `;
                });
                $("#loading-more").remove();
                $("#search-load-more").append(htmlStr);
                loading=false;
                page++;
            });
        }
    }
    function hotSearch() {
        $.ajax({
            url:'/supplier/hot',
            dataType:"json",
            success:function(res){
                if(res.status==1){
                    var fake_data_hot=['艾恩婚礼','TwinsWedding','银禧婚礼','Ollyva奥丽花婚典','汇爱婚礼策划','诺丁山','婚礼主义','花海阁婚礼策划体验中心'];
                    var data_hot=res.data||[];
                    var str_hot='';
                    data_hot.forEach(function(n,i){
                        str_hot+=`<a href="/supplier/search?name=${n}" class="tip-item">${n}</a>`;
                    });
                    $("#hot-tip-content").empty().html(str_hot);
                }
            },
            error:function(error){

            },
        });
    }
    function uniqueArray(data){
        data = data || [];
        var a = {};
        for (var i=0; i<data.length; i++) {
            var v = data[i];
            if (typeof(a[v]) == 'undefined'){
                a[v] = 1;
            }
        };
        data.length=0;
        for (var i in a){
            data[data.length] = i;
        }
        return data;
    }
    function makeUniqueArray(data,item){
        data = data || [];
        var index;
        data.forEach(function (n, i) {
            if(item==n){
                index=i;
            }
        });
        if(index){
            data.splice(index,1);
        }
        data.unshift(item);
        return data;
    }
    function searchFormSubmit(){
        var historylist=hb.Cookies.getJSON('halo_supplier_history')||[];
        // console.log($("#search_input").val())
        var data_history=[];
        var str_history='';
        $("#search_form").on("submit",function(event){
            if(!$("#search_input").val()){
                return false;
            }
            event.preventDefault();
            // historylist.unshift($("#search_input").val());
            // console.log(historylist);
            makeUniqueArray(historylist,$("#search_input").val());
            // console.log(historylist);
            if(historylist.length>6){
                historylist.pop();
            }
            // console.log(historylist)
            hb.Cookies.set('halo_supplier_history',historylist, { expires: 9999 });
            $(this).off('submit').submit();
        });

        if(historylist.length>0){
            data_history=historylist;
            data_history.forEach(function(n,i){
                str_history+=`<a href="/supplier/search?name=${n}" class="tip-item f-15"><i class="haloIcon haloIcon-time f-22"></i><span class="text">${n}</span></a>`;
            });
            $("#history-tip-content").empty().html(str_history);
        }else{
            $(".page-search-history").hide();
        }
    }
    return{
        init:init,
        initSearchForm:initSearchForm,
    }

}());