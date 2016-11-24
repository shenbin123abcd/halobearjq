app.index=(function(){
	'use strict';
	function init(){
		province();
		countAnimate();
	};
	function province(){
        $(window).on('load',function(){
            var data=['上海省','北京省','天津省','重庆省'];
            $('.companyList-item .item-area').each(function(index){
                var val=$(".companyList-item .item-area").eq(index).text();
                $(".companyList-item .item-area").eq(index).text(checkSame(val));
            });
            function checkSame(val){
                var newVal=val || '';
                data.forEach(function(n,i){
                    if(n==val){
                        newVal=val.substring(0,val.length-1)+'市';
                    }
                });
                return newVal;
            }
        })
    };
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
}())