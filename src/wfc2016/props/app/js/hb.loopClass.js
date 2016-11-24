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

        //for go good

        var now;
        var then = Date.now();
        var delta;

        if (!window.requestAnimationFrame){
            go();
        }else{
            goGood();
        }
        function goGood() {

            requestAnimationFrame(goGood);
            now = Date.now();
            delta = now - then;

            if (delta > settings.speed) {
                // 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。
                // 例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。
                // 这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
                then = now - (delta % settings.speed);


                $items.eq(loopIndex-1).removeClass(settings.loopClassName);
                $items.eq(loopIndex).addClass(settings.loopClassName);
                loopIndex++;
                if(loopIndex==settings.loopNumber){
                    loopIndex=0
                }


            }
        }


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