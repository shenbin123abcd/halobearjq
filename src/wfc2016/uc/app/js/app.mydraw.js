app.mydraw=(function(){
    "use strict";
    function init(){
        hashChange();
       // myDrawlist();
        //showPic();
        showHeight();
        showTicketDetail();
    }
    function hashChange(){
        $(window).on('load hashchange',function(){
            var hash=hb.location.url('hash');
            if(hash){
                $('body').children().hide();
                if(hash=="toTicket"){
                    $("#toTicket").show();
                }else if(hash=="toPay"){
                    $("#toPay").show();
                }else{
                    $("#ticketDetail").show();
                    $(".ticketDetail-item").hide();
                    $("#"+hash).show();
                }
            }else{
                var height=hb.Cookies.getJSON('myDraw_history')||0;
                $('body').children().hide();
                $("#myDraw").show();
                $(window).scrollTop(height);
            }
        })
    }

    function myDrawlist(){
        var htmlStr=``;
        var fakeData=['','','','','','','','',];
        fakeData.forEach(function(n,i){
            htmlStr+=`
                <a class="item" href="#ticketDetail">
                    <div class="item-avatar">
                        <img src="images/ico-card.png" alt="">
                    </div>
                    <div class="item-desc">
                        <div>2016中国婚礼行业高峰论坛</div>
                        <div>单程机票一张</div>
                    </div>
                </a>
            `;
        });
        $("#draw-list").empty().html(htmlStr);
    }

    function showTicketDetail(){
        $("#draw-list > a.item").each(function(index){
            $("#draw-list > a.item").eq(index).on('click',function(){
                $("#ticketDetail").children().hide();
                $("#ticketDetail>.ticketDetail-item").eq(index).show();
            })
        })
        $("[a-click]").each(function(index){
            $("[a-click]").eq(index).on('click',function(){
                var id=$(this).data('infoid');
                if(id==1 || id==2 || id==3){
                    window.location.href="#toTicket"
                }else{
                    window.location.href="#toPay"
                }
            })
        })
    }


    function showHeight() {
        $("#draw-list > a.item").each(function (index) {
            $("#draw-list > a.item").eq(index).on('click', function () {
                var heightVal=$(window).scrollTop();
                hb.Cookies.set('myDraw_history',heightVal, { expires: 9999 });
            })
        });
    }

    return{
        init:init,
    }

}());