;(function(){
    "use strict";

    function loopClass(dom,options){
        var options=options||{};
        var defaults={
            loopClassName:'loop-active',
            loopNumber:5,
            speed:1000,
            onPinchEnd:function(){
                //console.log('f')
            },
            onPanMove:function(){
                //console.log('f')
            },
            onPanEnd:function(){
                //console.log('f')
            },
        };
        this.settings = $.extend( {}, defaults, options );

        if(typeof dom=='string'){
            this.element=document.querySelector(dom);
        }else{
            this.element=dom;
        }
        this.$element=$(this.element);
        this.init();
        //console.log($el,el);
    }

    loopClass.prototype.init=function(){
        var _this=this;
        var $element=_this.$element;
        var settings=_this.settings;
        var $items=$element.find('[hb-loop-item]');
        settings.loopNumber=$items.length;


        var loopIndex=0;
        function go () {
            //console.log(loopIndex,settings.loopNumber)
            $items.eq(loopIndex-1).removeClass(settings.loopClassName);
            $items.eq(loopIndex).addClass(settings.loopClassName);
            loopIndex++;
            if(loopIndex==settings.loopNumber){
                loopIndex=0
            }

            setTimeout(go,settings.speed);
        }
        go()
    };






    //function uniform(){
    //    stop = setTimeout(uniform,v);
    //    if(t == time/50){
    //        clearTimeout(stop);
    //        t = 0.0;
    //        speedDown();
    //    }else{
    //        t++;
    //    }
    //    runner(ix);
    //}




    hb.loopClass=function(dom,options){
        return new loopClass(dom,options);
    };
}());