app.caseDetail=(function(){
    "use strict";
    function init(){
        seeMore();
        setTimeout(video,3000);
        getCaseList();
    }
    function seeMore(){
        $(window).on("load",function(){
            var height=parseInt($("#content-info").css("height"));
            //console.log(height)
            if(height<=205){
                $("#content-info").addClass('info-desc-all');
                $("#content-info").removeClass('info-desc-part');
            }else{
                $("#content-info").removeClass('info-desc-all');
                $("#content-info").addClass('info-desc-part');
                $(".seeMore-btn").show();
            };
            $("#seemore").on('click',function(){
                $("#content-info").animate({height:height},400,function(){
                    $(".case-detail-page .case-detail-content .detail-info-wrapper").css('border-bottom','1px dashed #cecece');

                });
                $("#content-info").removeClass('info-desc-part');
                $("#seemore").hide();
                $("#arrowTop").show();
                $(".case-detail-page .case-detail-content .detail-info-wrapper").css('border-bottom','none');

            });

            $("#arrowTop").on("click",function(){
                $("#content-info").animate({height:205},400,function(){
                    $("#content-info").addClass('info-desc-part');
                });
                $("#seemore").show();
                $("#arrowTop").hide();
            });
        });
    }
    function video(){
        var url = $('#video-box').data('video');
        var vid_youku = url
            .replace(/http:\/\/v\.youku\.com\/v_show\/id_([\w\-=]+)\.html\??.*/i, '$1');
        var vid_qq = url
            .replace(/http:\/\/v\.qq\.com\/page\/[\w]+\/[\w]+\/[\w]+\/([\w]+)\.html\??.*/i, "$1")
            .replace(/http:\/\/v\.qq\.com\/boke\/page\/[\w]+\/[\w]+\/[\w]+\/([\w]+)\.html/i, "$1")
            .replace(/http:\/\/v\.qq\.com\/cover\/[\w]+\/[\w]+\/([\w]+)\.html/i, "$1")
            .replace(/http:\/\/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, "$1");

        var playurl = '';

        if (vid_youku && vid_youku != url) {
            playurl = "http://player.youku.com/embed/" + vid_youku;
        }else if (vid_qq) {
            playurl = "http://v.qq.com/iframe/player.html?vid="+ vid_qq +"&tiny=0&auto=0";
        }

        if (playurl != '') {
            $('#video-box iframe').attr('src',playurl);
            $('#video-box').show();
        }
    }
    function getCaseList(){
        var company_id=$("#company-case-list").data('id');
        var case_id=hb.location.url('?id');
        app.service.getCompanyCaseList({
            company_id:company_id,
            from:'case',
            case_id:case_id,
            area:appData.area
        }).then(function (res) {
            var htmlStr=``;
            if(res.data.length>0){
                res.data.forEach(function (n, i) {
                    htmlStr+=`
                    <div class="case-list-item">
                        <a href="/vote/casedetail?id=${n.id}" class="item-img"><img class="img" src="${n.cover}" alt=""></a>
                        <div class="item-ticket f-15"><span vote-num case="case-${n.id}"  class="f-18 num-text-top">${n.num}</span>票</div>
                        <div class="item-desc clearfix">
                            <div class="desc-left">
                                <div class="item-desc-title f-15">《${n.title}》</div>
                                <div class="item-desc-text f-13">${n.area_title}赛区第${n.area_rank}名·全国第${n.all_rank}名</div>
                            </div>
                            <div class="desc-right" >
                                <a vote-bt data-id="${n.id}" data-company-name="${n.team}" class="btn btn-color-main vote-btn">投票</a>
                            </div>

                        </div>
                    </div>`;
                });
                $("#company-case-list").empty().append(htmlStr);
            }else{
                $("#case-list").remove();
            }

        })
        


    }

    return{
        init:init,
    }

}());