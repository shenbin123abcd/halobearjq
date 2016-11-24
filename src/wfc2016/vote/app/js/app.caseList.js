app.caseList=(function(){
    "use strict";
    function init(){
        activeTab();
        // loadMore();
    }
    function activeTab() {
        var searchPara=hb.location.url('?')||{};
        switch (searchPara.type){
            case 'vote':
                $("#type-vote").addClass('active');
                break;
            case 'views':
                $("#type-views").addClass('active');
                break;
            default:
                $("#type-new").addClass('active');
                break;
        }

    }


    function loadMore() {
        var loading=false;

        hb.scroll(window,{
            bottom:100,
            reachBottom:loadNext
        });
        function loadNext() {
            if(loading){
                return;
            }
            loading=true;
            $("#list_next").append(`<div class="clearfix" id="loading-more"><i class="haloIcon haloIcon-spin haloIcon-spinner f-20"></i></div>`);
            app.service.getFakeData().then(function (res) {
                var htmlStr=``;
                var data=[{'id':1,'cover':'http://7xjtaq.com2.z0.glb.qiniucdn.com/Works_2016/201605/18/Ftx-DSCCVUMvObELvQWWHmYEnMVV.png!w750x400','title':'aas','team':'asas','num':2},{'id':1,'cover':'http://7xjtaq.com2.z0.glb.qiniucdn.com/Works_2016/201605/18/Ftx-DSCCVUMvObELvQWWHmYEnMVV.png!w750x400','title':'aas','team':'asas','num':3}]
                data.forEach(function(n,i){
                    htmlStr+=`
                    <li class="item clearfix">
                        <div class="item-pic">
                            <a class="block" href="/vote/casedetail?id=${n.id}"><img class="img" src="${n.cover}" ></a>
                            <div class="ticket f-12"><span class="f-14 num-text-top">${n.num}</span>票</div>
                        </div>
                        <div class="item-title f-13">
                            <a class="item-title-a" href="/vote/casedetail?id=${n.id}">《${n.title}》</a>
                        </div>
                        <div class="item-text f-12">
                            <a class="item-text-a" href="/vote/companydetail?id=${n.id}">${n.team}</a>
                        </div>
                    </li>
                     `;
                });
                $("#loading-more").remove();
                $("#list_next").append(htmlStr);
                loading=false;
            });
        }
    }


    return{
        init:init,
    }
}());