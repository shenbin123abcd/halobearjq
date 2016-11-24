app.companyDetail=(function(){
    "use strict";
    function init(){
        getCaseList();
        $(window).load(function(){
            if(!$("#total-case-num").text()){
                $("#total-case-num").text(0);
            }
        })
    }
    function getCaseList(){
        var company_id=$("#company-case-list").data('id');
        app.service.getCompanyCaseList({
            company_id:company_id,
            from:'company'
        }).then(function (res) {
            var htmlStr=``;
            if(res.data.length>0){
                res.data.forEach(function (n, i) {
                    htmlStr+=`
                    <div class="case-list-item">
                        <a href="/vote/casedetail?id=${n.id}" class="item-img"><img class="img" src="${n.cover}" alt=""></a>
                        <div  class="item-ticket f-15"><span vote-num case="case-${n.id}" class="f-18 num-text-top">${n.num}</span>票</div>
                        <div class="item-desc clearfix">
                            <div class="item-desc-title f-15">《${n.title}》</div>
                            <div class="item-desc-text f-13">${n.area_title}赛区第${n.area_rank}名·全国第${n.all_rank}名</div>
                            <a vote-bt data-id="${n.id}" data-company-name="${n.team}" class="btn btn-color-main vote-btn">投票</a>
                        </div>
                    </div>`;
                });
                $("#total-case-num").text(res.data.length);
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