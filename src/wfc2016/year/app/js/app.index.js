app.index=(function(){
		'use strict';
        var initUrl='';
	    var beforeSlide="";
		var afterSlide='';
	    var currentPage='';
		var currentIndex='';
		function init(){
			location();
			renderList();
			renderComment();
			setTimeout(initModal,600);
			modalClose();
		}

		function location(){
			var wid=hb.location.url("?wid");
			var title=$(".slick-current .item-desc .text-desc.name .person-name").text();
			var company=$(".slick-current .text-desc-company").text();
			var logo=$(".slick-current .item-img img").attr('src');
			if(wid){
				if(wid==1){
					window.appData.share.content='我是'+window.nickname+'，我支持江苏省婚庆行业协会的常真，与六千位中国婚礼人实名制评选2016中国婚礼行业年度人物！';
					window.appData.share.logo='http://7ktq5x.com1.z0.glb.clouddn.com/Wfc2016/year/images/person/img1.png?imageView/2/w/200/h/200/q/85';
					window.appData.share.link=window.location.href;
					app.common.wechat();
				}
			}else{
				app.common.init();
			}

			//console.log(window.appData.share);
		}

		function lazy() {
			//console.log($("img.lazy"))
			$("img.lazy").lazyload({
				placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAPDw8AAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
				effect: "fadeIn",
				failure_limit : 100,
				threshold: 200,
			});
		}

		function initModal(){
			var status=localStorage.getItem('year_vote_status');
			var clickStatus=1;
			if(status!=1 || window.is_ticket!=1){
				$(".modal-content").children().hide();
				$("#prove").show();
				$("#step1").show();
				$('#dialogModal').modal('show');
				//验证参会实名信息
				$("#prove-info-btn").on('click',function(e){
					e.preventDefault();
					app.service.proveInfo().then(function(res){
						$(".prove-body").children().hide();
						localStorage.setItem('year_vote_status',JSON.stringify(1));
						$("#prove-success").fadeIn(400,function(){
							setTimeout(function(){
								$('#dialogModal').modal('hide');
							},800)
						});

					},function(res){
						$(".prove-body").children().hide();
						$("#step2").fadeIn(400);
					})
				});
			}
			//发送验证码
			if(clickStatus==1){
				$("#send-message-btn").on('click',function(e){
					e.preventDefault();
					clickStatus=0;
					//$('#send-message-btn').prop( "disabled", true );
					//$('#send-message-btn').removeClass('can-click').addClass('no-click');
					app.service.getPhoneMessage({
						phone:$.trim($("#phone").val())
					}).then(function(res){
						clickStatus=1;
						var time = 60;
						var setint = setInterval(function(){
							time--;
							if (time == 0) {
								window.clearInterval(setint);
								$('#send-message-btn').prop( "disabled", false);
								$('#send-message-btn').removeClass('no-click').addClass('can-click');
								$('#send-message-btn').text('重新发送');
							}else{
								$('#send-message-btn').prop( "disabled", true );
								$('#send-message-btn').removeClass('can-click').addClass('no-click');
								$('#send-message-btn').text(time+' 秒');
							}
						},1000);
					},function(res){
						hb.lib.weui.alert({
							title:'温馨提示',
							content:res,
							btn:'确定',
						});
						clickStatus=1;
					})
				});
			}
			$("#send-info-btn").on('click',function(e){
				e.preventDefault();
				app.service.sendProveMessage({
					idnum:$.trim($('#idnum').val()),
					phone:$.trim($("#phone").val()),
					code:$.trim($('#code').val()),
				}).then(function(res){
					if(res==1){
						localStorage.setItem('year_vote_status',JSON.stringify(1));
						$(".prove-body").children().hide();
						$("#prove-success").fadeIn(400,function(){
							setTimeout(function(){
								$('#dialogModal').modal('hide');
							},800)
						});
					}else if(res==-1){
						$(".prove-body").children().hide();
						$("#prove-error").fadeIn(400);
					}

				},function(res){
					hb.lib.weui.alert({
						title:'温馨提示',
						content:res,
						btn:'确定',
					})
				})
			});
			$("#buy-ticket-btn").on('click',function(e){
				e.preventDefault();
				//$('#dialogModal').modal('hide');
				window.location.href='/uc';
			})
		}

		function initVoteShow(){
			var works_id = localStorage.getItem('year_vote_id');
			if (works_id == null) {
				return false;
			}
			works_id = JSON.parse(works_id);
			if (works_id.length == 0) {
				return false;
			}
			$.each(works_id, function(index, val) {
				var obj='#click-icon-'+index;
				var showObj='#click-icon-'+index+' >.has-loved';
				//console.log(obj)
				if (new Date().getDate() === val) {
					$(obj).children().hide();
					$(showObj).show();
				}
			});
		}

		function renderList(){
			var data=window.user_list;
			var htmlStr='';
			var imgMap={
				0:'person/img1.png',
				1:'person/img2.png',
				2:'person/img3.png',
				3:'person/img4.png',
				4:'person/img5.png',
				5:'person/img6.png',
				6:'person/img7.png',
				7:'person/img8.png',
				8:'person/img9.png',
				9:'person/img10.png',
				10:'person/img11.png',
				11:'person/img12.png',
				12:'person/img13.png',
				13:'person/img14.png',
				14:'person/img16.png',
				15:'person/img17.png',
				16:'person/img18.png',
				17:'person/img19.png',
				18:'person/img20.png',
			}

			data.forEach(function(n,i){
				htmlStr+=`
					<div class="item" data-wid="${n.id}">
						<div class="item-img"><img data-lazy="images/${imgMap[i]}" alt=""></div>
						<div class="item-desc">
							<div class="top clearfix">
								<div class="name f-16 text-desc"><span class='person-name'>${n.name}</span><span text-desc-tag class="f-10 text-desc-tag" style='color:#fff;display: none;' data-type="${n.type}">入围</span></div>
								<div class="icon top-icon" id="click-icon-${n.id}">
									<img class="no-love vote-btn animated pulse infinite" src="images/nonelove.png" alt="" no-love vote-btn data-voteid="${n.id}">
									<img src="images/loved.png" alt="" has-loved style="display:none;" class="has-loved">
								</div>
							</div>
							<div class="bottom">
								<div class="text text-desc f-14">
									${n.position}<span class="padding">|</span><span class="text-desc-company">${n.company}</span>
								</div>
								<div class="desc text-desc f-12" style="text-align: justify;">
									${n.remark}
								</div>
							</div>
							<div class="icon-block f-12" id=icon-block-${n.id}>
								<span class="love"><span class="haloIcon haloIcon-love f-13"></span><span love-num click-love-${n.id} class="click-love-${n.id}">${n.num}</span></span>
								<span class="share"><span class="haloIcon haloIcon-share f-13"></span><span share-num click-share-${n.id} class="click-share-${n.id}">${n.share}</span></span>
							</div>
							<div class="bg-pic"><img src="images/desc-bg.png" alt=""></div>
						</div>
					</div>
				`;
			});
			//.find('.text-desc').animate({'opacity':0},50)
			$("#slider-block").empty().html(htmlStr);
			$("[text-desc-tag]").each(function(index){
				if($(this).data('type')==1){
					$(this).show();
				}else{
					$(this).hide();
				}
			})
            //initUrl=window.location.href.split('?')[1].split('=')[1];
			initVoteShow();
			setTimeout(function(){
				$(".slick-current.slick-center").find('.name.text-desc').css('color','#ff52a0');
				$(".slick-current.slick-center").find('.no-love').css('background','linear-gradient(rgb(245, 81, 151), rgb(255, 125, 95))');
				$(".slick-current.slick-center").find('.has-loved').css('background','linear-gradient(rgb(245, 81, 151), rgb(255, 125, 95))');
				$(".slick-current.slick-center .bg-pic").css('background','#fff1f8');
				$(".slick-current.slick-center .text-desc-tag").css({
					'background':'#ff52a0',
					'box-shadow':'0 3px 4px rgba(255,82,160,.28)'
				});
				$("#comment-slick ").find('.item-inner').css('box-shadow','rgba(255, 82, 160, 0.2) 0px 3px 6px');
				//$("#avatar-box .avatar-item").eq(2).addClass('current').append(`<div class="avatar-item-wrapper"><div class="avatar-item-circle"></div><div class="avatar-item-height"></div></div>`);
				//$("#avatar-box .avatar-item").eq(2).addClass('current');
				//initUrl=window.location.href.split('?')[1].split('=')[1];
			},50);
			//setTimeout(slick,200);
			//setInterval(voteAnimate,600);
			slick();
			voteAction();
			//checkLength();

			//modalClose();
		}

		function voteAnimate(){
			if($(".no-love.vote-btn").data('animate')==1){
				$(".no-love.vote-btn").data('animate','2').addClass('animate');
			}else{
				$(".no-love.vote-btn").data('animate','1').removeClass('animate');
			}
		}

		function renderComment(id){
			var htmlStr='';
			var commentStr='';
			var getId=id;
			var showNum="";
			var html1='';
			var html2='';

			app.service.getComment({
				wid:getId || window.user_list[0].id
			}).then(function(res){
				if(res.length==1){
					res.pop();
				}else if(res.length==2){
					showNum=1;
				}else if(res.length==3){
					showNum=1;
				}else if(res.length==4 || res.length==5){
					showNum=3;
				}else{
					showNum=5;
				}
				res.forEach(function(n,i){
					htmlStr+=`
					<li class="avatar-item" data-comment-id=${i}>
						<div class="item-inner">
							<img id="comment-avatar-${i}" data-lazy="${n.avatar||'http://7ktq5x.com1.z0.glb.clouddn.com/no_avatar.png?imageView2/1/w/200/h/200'}" alt="">
						</div>
					</li>
				`;
					if(n.content){
						html1+=`
							<div class="name f-11" id="comment-name${i}" data-index="${i}">
								<span class="company" id='comment-company-${i}'>${n.nickname || '婚礼人'}：</span>
								<span class="comment f-11" id='comment-text-${i}'>${n.content}</span>
							</div>
						`;
					}else{
						html2+=`
							<div class="name f-11" id="comment-name${i}" data-index="${i}">
								<span class="company" id='comment-company-${i}'>${n.nickname || '婚礼人'}：</span>
								<span class="comment f-11" id='comment-text-${i}'>点了一个赞</span>
							</div>
						`;
					}
					commentStr=(html1+html2);

				});
				$("#total-page").text(res.length);
				$(".avatar-box").empty().html(htmlStr).fadeIn(400);
				$('.comment-box-list').html(commentStr).children().hide();
				$('#comment-name0').show();
				$("#avatar-box .item-inner").css('box-shadow','rgba(255, 82, 160, 0.2) 0px 3px 6px');
				localStorage.setItem('year_comment_data',JSON.stringify(res));
				//$("#avatar-box .avatar-item").eq(6).addClass('current');
				//$("#avatar-box .avatar-item").eq(6).find('.avatar-item-wrapper').show();
				//showComment();
				slick2(showNum);
			},function(res){
				hb.lib.weui.alert({
					title:'温馨提示',
					content:res,
					btn:'确定',
				})
			})
		}

		function slick2(num){
				$("#avatar-box").slick({
					dots: false,
					infinite: true,
					centerMode: true,
					slidesToShow: num,
					slidesToScroll: 5,
					accessibility:false,
					draggable:false,
					mobileFirst:true,
					arrows: false,
					lazyLoad:'ondemand',
					centerPadding:'0px',
					focusOnSelect: true,
				});
				/*if($('#total-page').text()==0){
					$('#current-page').text(0)
				}*/
				$('#avatar-box').on('afterChange', function (event, slick, currentSlide, nextSlide) {
					var obj="comment-name"+currentSlide;
					$('#comment-box-list').children().hide();
					$('#'+obj).show().addClass('current-index');
					$('#current-page').text(currentSlide+1);
				})
		}

		function slick(){
			var buttonText=[];
			var wid=hb.location.url("?wid") || 1;
			var current='';
            var isOnpopstate='';
            var nowUrl=window.location.href;

			window.user_list.forEach(function(n,i){
				if(wid==n.id){
					current=i;
				}
			})
			window.user_list.forEach(function(n,i){
				buttonText.push(`${n.name}`);
			})
            $("#slider-block").slick({
                dots: true,
                infinite: true,
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                accessibility:true,
                draggable:false,
                mobileFirst:true,
                arrows: false,
                lazyLoad:'ondemand',
                centerPadding:'30px',
                focusOnSelect: false,
                easing:'linear',
                vertical:false,
                //fade:true,
            })
            $('#slider-block').slick('slickGoTo',current);
            $('.slick-dots').attr("id","slick-dots");
            $('.slick-dots li').each(function(i){
                $('.slick-dots li').eq(i).text('');
                $('.slick-dots li').eq(i).append(`<div class="slick-dots-style">${buttonText[i]}</div>`);
                $('.slick-dots li').addClass('btn');
                $('.slick-dots li .slick-dots-style').eq(0).css({
                    'box-shadow': 'rgba(255, 82, 160, 0.2) 0px 3px 10px',
                    'color': 'rgb(255, 82, 160)',
                })
            })


            $('.center').on('beforeChange', function (event, slick, currentSlide, nextSlide){
				beforeSlide=currentSlide;
				if(beforeSlide!=afterSlide){
					$(".slick-dots li .slick-dots-style").css('box-shadow','none');
					$(".slick-slide").find('.bg-pic').animate({'opacity':1},200);
					$(".slick-current").find('.name.text-desc').css('color','#666666');
					$(".slick-current").find('.no-love').css('background','#fff');
					$(".slick-current").find('.bg-pic').css('background','#fff');
					//console.log('before',currentSlide);
				}
            })

            $('.center').on('afterChange', function (event, slick, currentSlide, nextSlide) {
				//console.log('after',currentSlide);
				afterSlide=currentSlide;
				currentPage=currentSlide;
                var wid=$('#slider-block .slick-current').data('wid');
                var currentSlide = parseInt(currentSlide);
                var targetUrl=window.location.href.split("?")[0];
                var title=$(".slick-current .item-desc .text-desc.name .person-name").text();
				var company=$(".slick-current .text-desc-company").text();
                var url=window.location.href.split('?')[0];
                var logo=$(".slick-current .item-img img").attr('src');
				currentIndex=currentSlide;
                //$(".avatar-box").children().remove();
				if(beforeSlide!=afterSlide){
					$(".comment-block").hide();
					$("#avatar-box").slick('unslick');
					renderComment(wid);
					/*if($('#total-page').text()==0){
						$('#current-page').text(0)
					}*/
					$(".comment-block").fadeIn(600,function(){
						$(".comment-block .name").css({
							'background':changeColor(currentSlide).bgComment,
							'box-shadow':changeColor(currentSlide).CommentShadow
						});
						$(".comment-block .company").css('color',changeColor(currentSlide).fontColor);
						$("#avatar-box .item-inner").css('box-shadow',changeColor(currentSlide).avatarShadow);
					});
					//$(".slick-slide").eq(currentSlide + 1).find('.bg-pic').animate({'opacity':0},200);
					$(".slick-dots li .slick-dots-style").css('color', changeColor(currentSlide).fontColor);
					$(".html-index-year").css('background',changeColor(currentSlide).bgColor);
					$("#slider-block .slick-current.slick-center .bg-pic").css('background',changeColor(currentSlide).picBg);
					$(".slick-slide").find('.item-desc').css('box-shadow',changeColor(currentSlide).boxShadow);
					$(".slick-dots li .slick-dots-style").css('box-shadow','none');
					$('.slick-dots .slick-active .slick-dots-style').css('box-shadow',changeColor(currentSlide).liShadow);

					$(".slick-slide").eq(currentSlide + 2).find('.name').css('color',changeColor(currentSlide).fontColor);
					$('.comment-title').css('color',changeColor(currentSlide).modalTitle);
					$(".comment-header").css('background',changeColor(currentSlide).moadlBg);
					$('.send-btn').css('background-image',changeColor(currentSlide).modalBtn);

					$("#slider-block .slick-current.slick-center .text-desc-tag").css({
						'background':changeColor(currentSlide).fontColor,
						'box-shadow':changeColor(currentSlide).tagShadow,
					});
					$("#slider-block .slick-current.slick-center .vote-btn").css({'background':changeColor(currentSlide).loveBtn});
					$('#slider-block .slick-current.slick-center .has-loved').css({'background':changeColor(currentSlide).loveBtn});
					$("[bg-pic]").attr('src','images/'+changeColor(currentSlide).modalPic);

					$('.comment-num').css('color',changeColor(currentSlide).fontColor);
					$(".avatar-item-circle ,.avatar-item-height").css('box-shadow',changeColor(currentSlide).avatarShadow);
					var num=parseInt($(".slick-current.slick-center").data('slick-index'));

					autoScroll(num,'.slick-dots',73,400);
					//beforeChangeTitle=window.location.href.split('?')[1].split('=')[1];

					var searchStr=hb.location.url('query');
					var oldWid=hb.location.url('?wid');

					if(searchStr){
						if(typeof oldWid=='undefined'){
							var newSearchStr=searchStr+'&wid='+wid;
						}else{
							var newSearchStr=searchStr.replace('wid='+oldWid,'wid='+wid);
						}
					}else{
						var newSearchStr='wid='+wid;
					}

					//console.log(newSearchStr)

					history.pushState({wid:wid},title,'/year?'+newSearchStr);
					$('#slider-block').slick('slickGoTo',current);
					$('#current-page').text(1);
					window.appData.share.content='我是'+window.nickname+'，我支持'+ company.replace(/\n|\r\n/g,'') +'的'+title.replace(/\n|\r\n/g,'') + '，与六千位中国婚礼人实名制评选2016中国婚礼行业年度人物！';
					window.appData.share.logo= logo+'?imageView/2/w/200/h/200/q/85';
					window.appData.share.link=window.location.href;
					//console.log(window.appData.share);
					//console.log(title);
					app.common.wechat();
				}
            });
		}

		$(window).on('popstate',function(event){
            /*var index="";
            var wid=initUrl;
            console.log(wid);
            window.user_list.forEach(function(n,i){
                if(n.id==wid){
                    index=i;
                }
            })*/
            $('#slider-block').slick('slickGoTo',1);
		});

		/*function changeComment(id){
			var wid=id;
			app.service.getComment({
				wid:wid,
			}).then(function(res){
				//console.log(res);
				$("#avatar-box").slick('unslick');
				if(res.length>0){
					$(".comment-block").show();
					res.forEach(function(n,i){
						//$("#avatar-box .avatar-item").addClass('current');
						$(`#comment-company-${i}`).text('').text(n.nickname);
						$(`#comment-text-${i}`).text('').text(n.content);
						$(`#comment-avatar-${i}`).attr('src',`${n.avatar}`)
					});
					slick2();
				}else{
					$(".comment-block").hide();
				}
				//setTimeout(,400);
			},function(res){
				hb.lib.weui.alert({
					title:'温馨提示',
					content:res,
					btn:'确定',
				})
			})
		}*/

		function autoScroll(num,obj,width,speed){
			if(num>2){
				var length=parseInt(num-2);
				var num=parseInt(length*width);
				$(obj).animate({
					'scrollLeft':num,
				},speed);
			}else{
				$(obj).animate({
					'scrollLeft':0,
				},speed);
			}
		}

		function voteAction(){
			var id='';
			var works_parse={};
			var obj={};
			//var wid=window.location.href.split('?')[1].split('=')[1];
			//var voteBtn=$('.slick-current .item-desc .vote-btn');
			var voteBtn=$('[vote-btn]');
			var commentData=JSON.parse(localStorage.getItem('year_comment_data'));
			voteBtn.on('click',function(e){
				if(new Date('2016-07-09 20:00:00').getTime() > new Date().getTime()){
					hb.lib.weui.alert({
						title:'温馨提示',
						content:'评选尚未开始,敬请期待',
						btn:'确定',
					})
				}else if(new Date('2016-08-12 20:00:00').getTime() < new Date().getTime()){
					hb.lib.weui.alert({
						title:'温馨提示',
						content:'评选已经结束',
						btn:'确定',
					})
				}else{
					if (Modernizr.weixin){
						$('#comment-text').val('');
						$('.comment-header .num-length').text(15);
						e.preventDefault();
						id=$(this).data('voteid');
						app.service.yearVote({
							type:1,
							id:id,
							code:window.appData.code,
						}).then(function(res){
							if(res.status==1){
								//console.log(res);
								var objNum='[click-love-'+id+']';
								//var objPic='[click-icon-'+id+']';
								var obj='#click-icon-'+id;
								var obj2='#click-icon-'+id+' >.has-loved';
								//console.log($(objNum)[0].innerText);
								var num=parseInt($(objNum)[0].innerText)+1;
								$(objNum).html(num);
								$(obj).children().hide();
								$(obj2).show();
								var oldStorage=JSON.parse(localStorage.getItem('year_vote_id'));
								$.each(oldStorage, function(index, val) {
									works_parse[index]=val;
								});
								works_parse[id] = new Date().getDate();
								localStorage.setItem('year_vote_id',JSON.stringify(works_parse));
								$('#dialogModal').modal('show');
								$(".modal-content").children().hide();
								$("#comment-box").show();
							}else if(res.status==-1){
								// 微信未授权
								//window.location.href = '/vote/wechat?url=' + _this.url;
							}else{
								hb.lib.weui.alert({
									title:'温馨提示',
									content:res,
									btn:'确定',
								})
							}

						},function(res){
							hb.lib.weui.alert({
								title:'温馨提示',
								content:res,
								btn:'确定',
							})
						});
					}else{
						hb.lib.weui.alert({
							title:'温馨提示',
							content:'请使用微信进行评选！',
							btn:'确定',
						});

					}

				}
			});

			$("[has-loved]").on('click',function(){
				if(Modernizr.weixin){
					hb.lib.weui.alert({
						title:'温馨提示',
						content:'每天只能为一个嘉宾点赞一次哦！',
						btn:'确定',
					})
				}else{
					hb.lib.weui.alert({
						title:'温馨提示',
						content:'请使用微信进行评选！',
						btn:'确定',
					})
				}
			});

			$("#send-comment-btn").on('click',function(e){
				e.preventDefault();
				app.service.sendComment({
					wid:id,
					content:$.trim($("#comment-text").val()),
				}).then(function(res){
					//console.log(res);
					$('#dialogModal').modal('hide');
					$(".comment-block").show();
					//$("#avatar-box").slick('slickGetOption');
					var length=$("#total-page").text();
					length=parseInt(length);
					var newIndex=length+1;
					var newTotal=length+1;
					var commentStr='';
					var commentContent=$.trim($("#comment-text").val());
					var html1='';
					var html2='';
					var obj='#comment-name'+length;
					$('#total-page').text(newTotal)
					$("#avatar-box").slick('slickAdd',`<li class="avatar-item" data-comment-id=${newIndex}>
						<div class="item-inner">
							<img id="comment-avatar-${newIndex}" src="${res.data.avatar||'http://7ktq5x.com1.z0.glb.clouddn.com/no_avatar.png?imageView2/1/w/200/h/200'}" alt="">
						</div>
					</li>`);
					//newIndex-1
					$("#avatar-box").slick('slickGoTo',newIndex-1);
					if(commentContent){
						commentStr=`
							<div class="name f-11" id="comment-name${length}" data-index="${length}">
								<span class="company" id='comment-company-${length}'>${res.data.nickname}：</span>
								<span class="comment f-11" id='comment-text-${length}'>${commentContent}</span>
							</div>
						`;
					}else{
						commentStr=`
							<div class="name f-11" id="comment-name${length}" data-index="${length}">
								<span class="company" id='comment-company-${length}'>${res.data.nickname}：</span>
								<span class="comment f-11" id='comment-text-${length}'>点了一个赞</span>
							</div>
						`;
					};
					//$('.comment-box-list').html(commentStr).children().hide();
					$('#comment-name0').show();
					$('.comment-box-list').append(commentStr);
					$('.comment-box-list').children().hide();
					$(".comment-block .name").css({
						'background':changeColor(currentIndex).bgComment,
						'box-shadow':changeColor(currentIndex).CommentShadow
					});
					$(".comment-block .company").css('color',changeColor(currentIndex).fontColor);

					$(obj).show();


				},function(res){
					hb.lib.weui.alert({
						title:'温馨提示',
						content:res,
						btn:'确定',
					})
				})
			});

		}

		function checkLength(){
			$("#comment-text").on('keyup',function(){
				var val=$("#comment-text").val();
				var length=15-parseInt(val.length);
				$("[num]").text(length);
				if(length<=0){
					$("#comment-text").val(val.substring(0,14));
				}
			})
			$("#comment-text").on('blur',function(){
				var val=$("#comment-text").val();
				var length=15-parseInt(val.length);
				$("[num]").text(length);
				if(length<=0){
					$("#comment-text").val(val.substring(0,14));
				}
			})
		}

		function changeColor(i){
			if(i==0 || i==4 || i==7 || i==11 || i==15 || i==19){
				return{
					bgColor:"linear-gradient(to top, #fff, #fdf2f7)",
					fontColor:"#ff52a0",
					boxShadow:'0 8px 15px rgba(255,82,160,.2)',
					liShadow:'0 3px 10px rgba(255,82,160,.2)',
					bgComment:'#fff1f8',
					CommentShadow:'0 6px 9px rgba(160,14,80,.08)',
					tagShadow:'0 3px 4px rgba(255,82,160,.28)',
					picBg:'#fff1f8',

					modalTitle:'#ff52a0',
					moadlBg:'#fff1f8',
					modalBtn:'linear-gradient(180deg, #ff52a0, #ff8158)',
					modalPic:'bg1.png',
					loveBtn:'linear-gradient(180deg, #f55197, #ff7d5f)',
					avatarShadow:'0 3px 6px rgba(255,82,160,.2)',



				}

			}else if(i==1 || i==5 || i==8 || i==12 || i==16 || i==20){
				return{
					bgColor:"linear-gradient(to top, #fff, #eff7fc)",
					fontColor:"#42b2ff",
					boxShadow:'0 8px 15px rgba(66,178,255,.2)',
					liShadow:'0 3px 10px rgba(66,178,255,.2)',
					bgComment:'#f0f9ff',
					CommentShadow:'0 6px 9px rgba(14,86,160,.08)',
					tagShadow:'0 3px 4px rgba(66,178,255,.28)',
					picBg:'#f0f9ff',

					modalTitle:'#42b2ff',
					moadlBg:'#f0f9ff',
					modalBtn:'linear-gradient(360deg, #42b2ff, #44e7ff)',
					modalPic:'bg2.png',
					loveBtn:'linear-gradient(180deg, #43bfff, #43d8ff)',
					avatarShadow:'0 3px 6px rgba(66,178,255,.24)',
				}

			}else if(i==2 || i==6 || i==9 || i==13 || i==17){
				return{
					bgColor:"linear-gradient(to top, #fff, #f9effc)",
					fontColor:"#b454e1",
					boxShadow:'0 8px 15px rgba(180,84,225,.2)',
					liShadow:'0 3px 10px rgba(180,84,225,.2)',
					bgComment:'#f9f1fd',
					CommentShadow:'0 6px 9px rgba(138,14,160,.08)',
					tagShadow:'0 3px 4px rgba(180,84,225,.28)',
					picBg:'#f9f2fd',

					modalTitle:'#b454e1',
					moadlBg:'#f9f2fd',
					modalBtn:'linear-gradient(360deg, #b454e1, #fa7fff)',
					modalPic:'bg3.png',
					loveBtn:'linear-gradient(180deg, #c25ce7, #ed77f9)',
					avatarShadow:'0 3px 6px rgba(180,84,225,.2)',
				}

			}else if(i==3 || i==7 || i==10 || i==14 || i==18){
				return{
					bgColor:'linear-gradient(to top, #fff, #fcfbf0)',
					fontColor:'#ffb431',
					boxShadow:'0 8px 15px rgba(255,180,49,.2)',
					liShadow:'0 3px 10px rgba(255,180,49,.2)',
					bgComment:'#fff9ef',
					CommentShadow:'0 6px 9px rgba(160,107,14,.08)',
					tagShadow:'0 3px 4px rgba(255,180,49,.28)',
					picBg:'#fff9ef',

					modalTitle:'#ffb431',
					moadlBg:'#fff9ef',
					modalBtn:' linear-gradient(180deg, #ffb431, #ff7a31)',
					modalPic:'bg4.png',
					loveBtn:'linear-gradient(180deg, #ff8531, #ffad31)',
					avatarShadow:'0 3px 6px rgba(255,180,49,.26)',
				}
			}
		}

		function modalClose(){
			$("#modal-close").on('click',function(e){
				e.preventDefault();
				$('#dialogModal').modal('hide');
			});

            $('[modal-dialog-close]').on('click',function(e){
                e.preventDefault();
                $('#dialogModal').modal('hide');
            });
		}

    return{
    	init:init,
    }
}())