app.companyRank=(function(){
    "use strict";
    var loadingHtml=`<div class="loading-box"><i class="haloIcon haloIcon-spin haloIcon-spinner"></i></div>`;
    var $loadingHtml=$(loadingHtml);
    var myScroll;

    function init(){
        activeTab();
        loadMore();
    }
    function activeTab() {
        var searchPara=hb.location.url('?')||{};


        var myAScroll=hb.autoScroll("#area-nav",{
            spaceBetween:15,
            duration:600
        });

        $("#company-rank-list > a.item").eq(2).after(`<div class="item_bg"></div>`);
        $("#company-rank-list > a.item").eq(3).css('border-top',0);
        $("#pic-text-company").text($("#company-rank-list > a.item").eq(0).children('.info-box').children('.name').text());
        $("#pic-text-ticket").text($("#company-rank-list > a.item").eq(0).children('.point-box').children('.num-text-top').text()+'票');
        $("#inner-company-logo").attr({
            src:$("#company-rank-list > a.item").eq(0).children('.img-box').children('.img-wrapper').children('.img').attr('src')
        });

        var imgMap={
            '0':'companyRank/0.png',
            '1':'companyRank/1.png',
            '2':'companyRank/2.png',
            '3':'companyRank/3.png',
            '4':'companyRank/4.png',
            '5':'companyRank/5.png',
            '6':'companyRank/6.png',
            '7':'companyRank/7.png',
        }
        if(searchPara.aid){
            myAScroll.scrollTo('#area-'+searchPara.aid);
            $("#area-"+searchPara.aid).addClass('active');
            $("#left-pic-text").attr({
                src : `images/${imgMap[searchPara.aid]}`
            });
        }else{
            myAScroll.scrollTo('#area-all');
            $("#area-all").addClass('active');
            $("#left-pic-text").attr({
                src: `images/${imgMap[0]}`
            });
        }



        // alert($("#area-"+searchPara.aid).attr('class'))
        $("#area-nav a").on('click',function(){
            // console.log(myScroll)
            if(myScroll){
                myScroll.off();
            }
            $("#company-rank-list").empty().append($loadingHtml);
            $("#area-nav a").removeClass('active');

            // $(this).addClass('active');
            var title = $(this).children().text();
            var targetUrl=$(this).attr('href');





            
            
            var targetSearchStr=targetUrl.split('?')[1];
            var targetSearchPara=hb.util.deParam(targetSearchStr);

            // var url = hb.location.url();
            // var searchPara=hb.location.url('?')||{};
            // console.log(searchPara)
            // console.log(targetSearchPara);
            // console.log(window.location.href)
            var imgMap={
                '0':'companyRank/0.png',
                '1':'companyRank/1.png',
                '2':'companyRank/2.png',
                '3':'companyRank/3.png',
                '4':'companyRank/4.png',
                '5':'companyRank/5.png',
                '6':'companyRank/6.png',
                '7':'companyRank/7.png',
            }

            if(targetSearchPara.aid){
                $("#area-"+targetSearchPara.aid).addClass('active');
                $("#left-pic-text").attr({
                    src : `images/${imgMap[targetSearchPara.aid]}`
                });
            }else{
                $("#area-all").addClass('active');
                $("#left-pic-text").attr({
                    src : `images/${imgMap[0]}`
                });

            }
            generateList(targetSearchPara.aid);

            history.pushState({ aid: targetSearchPara.aid }, title,targetUrl);





            return false;
        });

        $(window).on('popstate',function(event){
            // console.log(history.state,hb.location.url('?'));
            if(!history.state){
                return
            }
            if(myScroll){
                myScroll.off();
            }
            $("#area-nav a").removeClass('active');
            $("#area-"+history.state.aid).addClass('active');
            $("#company-rank-list").empty().append($loadingHtml);
            generateList(history.state.aid);

        });
        


        function generateList(aid) {
            app.service.getCompanyList({
                page:1,
                aid:aid
            }).then(function (res){
                // console.log(window.location.href);
                window.appData.share.link=window.location.href;
                window.appData.share.content='「'+res.data[0].name+'」'+'暂居'+window.appDataAreaJson[hb.location.url('?aid')]+'赛区第一名，中国婚礼策划最高奖—2016金熊奖！';
                window.app.common.wechat();
                // console.log(window.appData.share.link,window.appData.share.content);
                $("#company-rank-list").empty();
                var htmlStr=``;
                var searchPara=hb.location.url('?')||{};
                res.data=res.data||[];
                res.data.forEach(function(n,i){
                    htmlStr+=`
                    <a class="item" href="/vote/companydetail?id=${n.id}">
                        <div class="num-box">${i+1}</div>
                        <div class="img-box" >
                            <div class="img-wrapper">
                                <img class="img" src="${n.logo}" >
                            </div>
                        </div>
                        <div class="info-box">
                            <div class="name">${n.name}</div>
                            <div class="area">${n.province}<span class="padding">|</span>${n.city}</div>
                        </div>
                        <div class="point-box">
                            <span class="f-16 num-text-top">${n.num}</span>票
                        </div>
                    </a>
                     `;
                });
                $("#company-rank-list").append(htmlStr);
                $("#company-rank-list > a.item").eq(2).after(`<div class="item_bg"></div>`);
                $("#company-rank-list > a.item").eq(3).css('border-top',0);
                $("#pic-text-company").text($("#company-rank-list > a.item").eq(0).children('.info-box').children('.name').text());
                $("#pic-text-ticket").text($("#company-rank-list > a.item").eq(0).children('.point-box').children('.num-text-top').text()+'票');
                $("#inner-company-logo").attr({
                    src:$("#company-rank-list > a.item").eq(0).children('.img-box').children('.img-wrapper').children('.img').attr('src')
                });
                loadMore();
            });
        }
        
    }
    function loadMore() {
        var loading=false;
        var page=2;
        // $(window).hb_scroll({
        //     bottom:100,
        //     reachBottom:loadNext
        // });
        myScroll=hb.scroll(window,{
            bottom:100,
            reachBottom:loadNext
        });
        function loadNext() {
            if(loading){
                return;
            }
            loading=true;
            var aid=hb.location.url('?aid');
            $("#company-rank-list").append(`<div id="loading-more"><i class="haloIcon haloIcon-spin haloIcon-spinner f-20"></i></div>`);
            app.service.getCompanyList({
                page:page,
                aid:aid
            }).then(function (res) {
                var htmlStr=``;
                // var fakeData=[{'id':1,'company':'aien1'},{'id':1,'company':'aien2'}];
                res.data=res.data||[];
                if(res.data.length==0){
                    $("#loading-more").remove();
                    htmlStr+=`<div class="all-complated-text f-11">已全部显示完</div>`;
                    $("#company-rank-list").append(htmlStr);
                    return
                }
                res.data.forEach(function(n,i){
                    htmlStr+=`
                    <a class="item" href="/vote/companydetail?id=${n.id}">
                        <div class="num-box">${i+1+(page-1)*20}</div>
                        <div class="img-box" >
                            <div class="img-wrapper">
                                <img class="img" src="${n.logo}"  >
                            </div>
                        </div>
                        <div class="info-box">
                            <div class="name">${n.name}</div>
                            <div class="area">${n.province}<span class="padding">|</span>${n.city}</div>
                        </div>
                        <div class="point-box">
                            <span>${n.num}</span>票
                        </div>
                    </a>
                     `;
                });
                $("#loading-more").remove();
                $("#company-rank-list").append(htmlStr);
                loading=false;
                page++;
            });
        }
    }




    return{
        init:init,
    }

}());