
$(function(){
	fullPageInit();
});


/* fullPageInit */
function fullPageInit(){
	var firstload = false;
	var mcnews_swiper = null; // 공지 롤링
	var mstory_banner_swiper = null; // 배너 롤링

	var $activeHeight = $(".slk_cont.active .slkthum_reslist").outerHeight();
	var slk_cont = $(".slk_cont");
	var slk_ctit_link = $(".slk_ctit_link");
	var slkthum_reslist_li = $(".slkthum_reslist > li");

	var $mstory_banner_container = $(".mstory_banner_container");
	var $mstory_banner_slide = $mstory_banner_container.find(".swiper-slide");
	var $mstory_banner_slide_length = $mstory_banner_slide.length;


	var $btn_slkmore = $(".btn_slkmore");

	$(window).on("load",function(){
		$(window).on("resize",function(){
			wboxHeight();
		}).resize();
	});

	/* scene01 */
	slk_ctit_link.last().addClass("last");
	slk_cont.last().addClass("last");
	slk_cont.find(".btn_slkmore").last().addClass("last");
	slk_ctit_link.on("click keydown",function(e){
		var keycode = e.keyCode || e.which;
		var $t = $(this);
		var $t_t = $($t.attr("href"));
		if(e.type === "click"){
			e.preventDefault();
			$activeHeight = $(".slk_cont.active .slkthum_reslist").length ? $(".slk_cont.active .slkthum_reslist").outerHeight() : 0;
			wboxHeight();
			slk_ctit_link.removeClass("active");
			$t.addClass("active");
			if($t_t.length){
				$t_t.siblings(".slk_cont").hide();
				$t_t.show();
				$t_t.focus();
			}
		}
		
		if(!$("body").hasClass("focus_mode")){return;}
		if(e.type === "keydown"){
			if(keycode === 9){
				$t.siblings(".slk_ctit_link").attr("tabindex","-1");
				if(!$t_t.hasClass("active")){
					$(".mainsec02").attr("tabindex","0").focus();
				}
			}
		}
	});
	/*
	slk_cont.find(".btn_slkmore").first().on("focusout",function(e){
		if(!$("body").hasClass("focus_mode")){return;}
		var keycode = e.keyCode || e.which;
		var $target_link = $("a[href='#"+$(this).parents(".slk_cont").attr("id")+"']").next(".slk_ctit_link");
		if(!$(this).parents(".slk_cont").hasClass("last")){
			$target_link.focus();
		}
	}); */

	$btn_slkmore.on("focus",function(e){
		if(!$("body").hasClass("focus_mode")){return;}
		var keycode = e.keyCode || e.which;
		slk_ctit_link.removeAttr("tabindex");
	});
	$btn_slkmore.on("focusout",function(e){
		if(!$("body").hasClass("focus_mode")){return;}
		slk_ctit_link.eq($(this).parents(".slk_cont").index()+1).focus();
	});

	$btn_slkmore.on("keydown",function(e){
		var keycode = e.keyCode || e.which;
		if(keycode === 9){
			if(e.shiftKey){
				$btn_slkmore.off("focusout");
				slk_ctit_link.off("keydown");
			}
		}
	});
	slk_ctit_link.on("focus",function(){
		$btn_slkmore.on("focusout");
		$(this).on("keydown");
	});

	var $oldHeight = 0;
	function wboxHeight(){
		$(".slkthum_reslist").css({"min-height" : "" });
		if($activeHeight>0){
			$(".slkthum_reslist > li.nodata_li").css({"min-height" : $activeHeight });
		}
	}

	/* scene02 */
	if($(".swiper_vertical_item .swiper-slide").length){
		mcnews_swiper = new Swiper('.swiper_vertical_item', {
			direction: 'vertical',
			loop: true,
			speed : 500,
			autoplay: {
				delay: 2500,
				disableOnInteraction : false
			}
		});
		mcnews_swiper.autoplay.stop();
		$(".btn_scnews_prev").on("click",function(e){
			e.preventDefault();
			mcnews_swiper.slidePrev();
		});
		$(".btn_scnews_time").on("click",function(e){
			e.preventDefault();
			var $t = $(this);
			$t.toggleClass("active");
			if($t.hasClass("active")){
				$t.children(".hdtext").text("재생");
				mcnews_swiper.autoplay.stop();
			}else{
				$t.children(".hdtext").text("정지");
				mcnews_swiper.autoplay.start();
			}
		});
		$(".btn_scnews_next").on("click",function(e){
			e.preventDefault();
			mcnews_swiper.slideNext();
		});
		$(".swiper_vlink").on("keydown",function(e){
			var keycode = e.keyCode || e.which;
			if(keycode === 9){
				$(".btn_scnews_time").addClass("active");
				$(".btn_scnews_time").children(".hdtext").text("재생");
				if(!e.shiftKey){
					mcnews_swiper.slidePrev();
				}else{
					mcnews_swiper.slideNext();
				}
				mcnews_swiper.autoplay.stop();
			}
		});
	}


	/* scene03 */
	if($(".mstory_banner_container .swiper-slide").length){
		mstory_banner_swiper = new Swiper('.mstory_banner_container', {
			loop : true,
			speed : 500,
			autoplay: {
				delay: 2500,
				disableOnInteraction : false
			}
		});
		mstory_banner_swiper.on("slideChange",function(){
			$(".mst_current").text(mstory_banner_swiper.realIndex+1)
		});
		$(".mst_length").text($mstory_banner_slide_length);
		mstory_banner_swiper.autoplay.stop();
		$(".mstory_cprev").on("click",function(e){
			e.preventDefault();
			mstory_banner_swiper.slidePrev();
		});
		$(".mstory_auto").on("click",function(e){
			e.preventDefault();
			var $t = $(this);
			$t.toggleClass("active");
			if($t.hasClass("active")){
				$t.children(".hdtext").text("재생");
				mstory_banner_swiper.autoplay.stop();
			}else{
				$t.children(".hdtext").text("정지");
				mstory_banner_swiper.autoplay.start();
			}
		});
		$(".mstory_cnext").on("click",function(e){
			e.preventDefault();
			mstory_banner_swiper.slideNext();
		});
		$(".mstor_banner_link").on("keydown",function(e){
			var keycode = e.keyCode || e.which;
			if(keycode === 9){
				$(".mstory_auto").addClass("active");
				$(".mstory_auto").children(".hdtext").text("재생");
				if(!e.shiftKey){
					mstory_banner_swiper.slidePrev();
				}else{
					mstory_banner_swiper.slideNext();
				}
				mstory_banner_swiper.autoplay.stop();
			}
		});
	}

	/* fullpage init */
	if($(".fullpage_container").length===0){return;}
	$('.fullpage_container').fullpage({
		responsiveWidth : 1023,
		afterLoad : function(anchorLink, index){
			//if(!$("body").hasClass("focus_mode")){return;}
			if(index === 4){return;}
			$(".maindot_list > li").removeClass("active");
			$(".maindot_list > li").eq(index-1).addClass("active");
			/*if(firstload){
				$(".fullpage_container .section").eq(index-1).find("a,button,input").first().focus();
			}
			firstload = true;*/
			if(index === 1){
				//$(".fullpage_container").css({"transform" : "translate3d(0px, 0px, 0px)"});
				mcnews_swiper.autoplay.start();
			}else if(index === 2){
				//$(".fullpage_container").css({"transform" : "translate3d(0px, -"+$("#section1").attr("data-dtop")+"px, 0px)"});
			}else if(index === 3){
				//$(".fullpage_container").css({"transform" : "translate3d(0px, -"+$("#section2").attr("data-dtop")+"px, 0px)"});
				mstory_banner_swiper.autoplay.start();
			}
		}
	});
	$(".maindot").on("click keydown",function(e){
		if(e.type === "click"){
			$.fn.fullpage.moveTo($(this).parent().index()+1,0);
			e.preventDefault();
		}else{
			if($("body").hasClass("focus_mode")){
				setTimeout(function(){
					$($(this).attr("href")).attr("tabindex","0").focus();
				},20);
			}
		}
	});
	$(".btn_pcquick_topgo").on("click keydown",function(e){
		$.fn.fullpage.silentMoveTo(1);
	});
	var firstFocus = false;
	$(window).on("keydown",function(e){
		//$.fn.fullpage.setAutoScrolling(false);
		// $.fn.fullpage.setKeyboardScrolling(false);
		var keycode = e.keyCode || e.which;
		var $main_notice_popup_zone = $(".main_notice_popup_zone");
		var $notice_popup_item = $(".notice_popup_item");
		if(keycode === 9){
			$.fn.fullpage.destroy('all');
			if(firstFocus){return;}
			if ($main_notice_popup_zone.length){
				$notice_popup_item.focus();
			}else{
				$("a,button,input").first().focus();
			}
			$("body").append($(".fullpage_container .footer_wrap"));
			firstFocus = true;
		}
    });
	// $(".mainsec03").find("a,button,input,textarea").last().on("focusout",function(){
	// 	$(".main_quick").find("a,button,input,textarea").first().focus();
	// });
	// $(".pcquick_item").find("a,button,input,textarea").last().on("focusout",function(){
	// 	if (!$("body").hasClass("focus_mode")) { return; }
	// 	setTimeout(function(){
	// 		$(".footer_wrap").find("a,button,input,textarea").first().focus();
	// 		console.log($(".footer_wrap").find("a,button,input,textarea").first());
	// 	},40);
	// });
}


function mainPopupNotice(){
	$(function(){
		var $main_notice_popup_zone = $(".main_notice_popup_zone");
		var $notice_popup_item = $(".notice_popup_item");
		var $header = $(".header_wrap");
		var $header_pos = $header.length ? $header.outerHeight() : 0;
		
		$notice_popup_item.css({ "top": $header_pos + 10 });

		$(window).on("resize",function(){
			$header_pos = $header.length ? $header.outerHeight() : 0;
			$notice_popup_item.css({ "top": $header_pos + 10 });
		});

		console.log($.cookie('todayCookie'));
		if ($.cookie('todayCookie') == undefined){
			$main_notice_popup_zone.addClass("active");
			setTabControl($notice_popup_item);
			$(".notice_popup_item").focus();
			//$("html,body").addClass("touchDisimport");  모바일스크롤 안되게
		}

		$(".btn_npclose").on("click",function(e){
			e.preventDefault();
			$main_notice_popup_zone.removeClass("active");
			if ($(".front_body").hasClass("focus_mode")){
				$("a,button,input").first().focus();
			}
			//$("html,body").removeClass("touchDisimport"); 모바일스크롤 안되게
		});

		$(".npchk").on("click",function(e){
			if($(this).prop("checked")){
				//'todayCookie' 이름의 쿠키가 있는지 체크한다.
				if ($.cookie('todayCookie') == undefined) {
					//쿠키가 없는 경우 todayCookie 쿠키를 추가
					$.cookie('todayCookie', 'Y', { expires: 1, path: '/' });
					/**
						설명 :
						임의로 todayCookie라는 이름에 Y라는 값을 넣어주었고,
						expires값으로 1을 주어 1일 후 쿠키가 삭제되도록 하였다.
						path값을 '/'로 주면 해당사이트 모든페이지에서 유효한 쿠키를 생성한다.
						특정페이지에서만 작동하려면 페이지 경로를 작성하면 된다.
					**/
				}
				console.log($.cookie('todayCookie'));
			}
		});
	});

}