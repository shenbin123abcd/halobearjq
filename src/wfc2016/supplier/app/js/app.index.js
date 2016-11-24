app.index=(function(){
    "use strict";
    var currentPage;
    var list;
    function init(){
        currentPage=2;
        getList();
        countAnimate();
    }

    function getList(){

        $("#index-cat-wrapper .item").on('click',function () {
            currentPage=1;
            if($(this).hasClass('active')){
                return
            }
            $("#show-more-wrapper").show();
            var cid=$(this).data('cid');
            var cate=$(this).data('cate');
            $("#index-cat").text(cate);
            var para={};
            $("#index-cat-wrapper .item.active").removeClass('active');
            $(this).addClass('active');


            // console.log(cid);
            if(cid){
                para.cid=cid;
            }
            $("#data-list").empty().append(`<div class="loading-box" id="loading-more"><i class="haloIcon haloIcon-spin haloIcon-spinner f-20"></i></div>`);

            app.service.getSupplierList(para).then(function(res) {
                var htmlStr=``;
                res.list=res.list||[];
                $("#total").text(res.total);

                if(res.list.length==0){
                    htmlStr+=`<div>该分类下无数据</div>`
                }
                list=res.list;
                var showList=list.slice(0,20);
                $("#data-list").empty();
                render(showList);
                currentPage++;

            })
        });

        $("#show-more").on('click',function () {
            if(list){

                var showList=list.slice(0+(currentPage-1)*20,20+(currentPage-1)*20);
                // console.log(currentPage,showList,list);
                if(showList.length==0){
                    $("#show-more-wrapper").hide();
                    return;
                }

                render(showList);
                currentPage++;
            }else{
                $("#data-list").append(`<div class="loading-box" id="loading-more"><i class="haloIcon haloIcon-spin haloIcon-spinner f-20"></i></div>`);
                app.service.getSupplierList({}).then(function(res) {
                    $("#total").text(res.total);
                    $("#loading-more").remove();
                    res.list=res.list||[];
                    list=res.list;
                    var showList=list.slice(20,40);
                    render(showList);
                    currentPage++;
                })
            }




        });



        function render(data) {

            var htmlStr=``;
            data.forEach(function(n,i){
                htmlStr+=`
                    <a href="/supplier/detail?id=${n.id}" class="list-item clearfix">
                        <div class="item-pic">
                            <div  class="img"><img src="images/sidai.png">
                                    <div class="rank-number">No.${i+1}</div>
                            </div>
                            <span class="avatar"><img src="${n.logo_url}"></span>
                            <span onclick="event.preventDefault()" class="vote-btn f-12" vote-bt data-id="${n.id}" data-company-name="${n.title}"  >投票</span>
                        </div>
                        <div class="item-desc">
                            <div class="desc-top clearfix">
                                <div href="/supplier/detail?id=${n.id}" class="f-15 title"><div>${n.title}</div></div>
                                <span class="f-14 ticket"><span vote-num case="case-${n.id}">${n.num}</span>票</span>
                            </div>
                            <div class="desc-rank f-12">
                                总排名第${n.sort}名
                            </div>
                            <div class="desc-text f-12">
                                ${n.remark}
                            </div>
                        </div>
                    </a>
                `;
            });
            $("#data-list").append(htmlStr);
            app.vote.setVote();
        }

    }

    function countAnimate(){
        var num=$(".meng").data('count');
        var staticNum=8;
        var array=num.toString().split('');
        var position="";
        $('.meng').empty();
        array.forEach(function(n,i){
            $('.meng').append(`<div class="item" data-position="${n}"></div>`)
        });
        if(array.length<staticNum){
            for(var i=0;i<staticNum-array.length;++i){
                $('.meng>.item').first().before(`<div class="item"></div>`);
            }
        }
        function showAnimate(){
            var num="";
            var position="";
            $(".meng>.item").each(function(index){
                num=$(".meng>.item").eq(index).data('position');
                position=parseInt(num)*(-25);
                $(".meng>.item").eq(index).animate({
                    "background-positionY" :position
                },{
                    "duration": random(),
                })
            })
        };
        function random(){
            var num=Math.random()*1000;
            //console.log(num)
        }
        $(window).load(function(){
            if($(".meng>.item")){
                setTimeout(showAnimate,500);
            }
        })
    };
    return{
        init:init,
    }

}());