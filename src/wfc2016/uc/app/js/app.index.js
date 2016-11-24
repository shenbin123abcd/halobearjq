app.index=(function(){
    "use strict";

    function init(){
        initTaskList();
        showTicketDes();

    }

    function initTaskList() {
        // console.log(appData);

        $("#item-note").removeClass('item-lock').addClass('item-unlock')
        $("#item-coupon").removeClass('item-lock').addClass('item-unlock')

        if(appData.state.is_course) {
            $("#item-note").removeClass('item-unlock').addClass('item-finish')
        }
        if(!appData.state.is_complete) {
            $("#item-ticket").removeClass('item-lock').addClass('item-unlock')

        }
        if(appData.state.is_complete) {
            $("#item-ticket").removeClass('item-lock').addClass('item-finish')
            $("#item-mark").removeClass('item-lock').addClass('item-unlock')
            $("#item-props").removeClass('item-lock').addClass('item-unlock')
            // $("#item-coupon").removeClass('item-lock').addClass('item-unlock')
            if(appData.state.is_address) {
                $("#item-mark").removeClass('item-unlock').addClass('item-finish')
                $("#item-card").removeClass('item-lock').addClass('item-unlock')
                if(appData.state.is_card) {
                    $("#item-card").removeClass('item-unlock').addClass('item-finish')
                    // $("#item-note").removeClass('item-lock').addClass('item-unlock')
                    if(appData.state.is_course) {
                        // $("#item-note").removeClass('item-unlock').addClass('item-finish')
                    }
                }
            }
        }
        if(appData.state.is_bind) {
            $("#item-bind").removeClass('item-lock').addClass('item-finish').hide();
        }else {
            $("#item-bind").removeClass('item-lock').addClass('item-unlock');
        }

        if(appData.state.is_meal>0) {
            $("#item-meal").removeClass('item-lock').addClass('item-unlock')
        }
        if(appData.state.hotels>0) {
            $("#item-hotel").removeClass('item-lock').addClass('item-unlock')
        }

        let showRecordTime=new Date('2016/08/16 07:00:00').getTime();
        let nowTime=new Date().getTime();

        //console.log(showRecordTime)
        if(nowTime>showRecordTime){
            $("#item-note-2").removeClass('item-lock').addClass('item-unlock').show()
        }

        
    }

    function showTicketDes() {
        $("[bt-ticket-des]").on('click',function () {
            var targetId=$(this).data('targetId');
            // console.log(targetId)
            $('#'+targetId).modal('show');
        })

    }


    return{
        init:init,
    }

}());