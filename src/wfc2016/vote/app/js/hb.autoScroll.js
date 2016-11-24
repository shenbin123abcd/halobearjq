//hb_auto_scroll

(function($){
    function autoScroll(dom,options){
        var options=options||{};
        var defaults={
            spaceBetween:15,
            duration:600,
        };
        var settings = $.extend( {}, defaults, options );



        var $container = $(dom);

        var $item = $container.children();
        $item.css({
            margin:"0 15px"
        });
        $item.first().css({
            "margin-left":"0"
        });
        $item.last().css({
            "margin-right":"0"
        });
        var _this=this;
        var cW = $container.outerWidth();
        $item.on('click',function(){
            scrollTo(this);
        });


        this.scrollTo=function(dom){
            scrollTo(dom);
        };

        function scrollTo(dom){
            //console.log($container.get()[0].scrollWidth);
            //console.log($(this).position().left);
            var itemPL=$(dom).position().left;
            var containerSl=$container.scrollLeft();

            var itemW=$(dom).outerWidth();

            var containerW=$container.outerWidth();
            //console.log(containerW)
            //var d=$container.scrollLeft();

            //$container.animate({scrollLeft: itemPL+containerSl-containerW/2+itemW/2}, 800);
            $container.animate({scrollLeft: itemPL+settings.spaceBetween+containerSl-containerW/2+itemW/2}, settings.duration);
        }




    }

    hb.autoScroll=function(dom,options){
        return new autoScroll(dom,options);
    };

})(jQuery);