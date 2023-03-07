if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
var userAgent=navigator.userAgent.toLowerCase();
var resizePartWidth = 1023;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
$(function(){
	oldIe();
	commonInit();
	reformFunc();
	dimLayerControl();
	datePicker();
	tabModul();
	subCointentsFunc();
});
$(window).on("load",function(){
	commonResize();
	quickLayer();
});

/* quick */
function quickLayer(){
	var $btn_pcquick_topgo = $(".btn_pcquick_topgo");
	var $sub_quick = $(".quick_zone.sub_quick");
	var $mbquick_wrap = $(".mbquick_wrap");
	var $mbquick_item = $(".mbquick_item");
	var $mbquick_text = $(".mbquick_text");
	var $mbquick_bg = $(".mbquick_bg");
	var $btn_mbquick_call = $(".btn_mbquick_call");
	var posUser = 0;
	var init_contents = $(".sctab_list_w,.sctab_contents, .sc_contents , .sub_contents > .list_sort_fxzone , .totalsearch_field_wrap");
	var init_contents_pos = init_contents.length ? init_contents.offset().top : 0;
	var $mbtextMax = 0;
	$sub_quick.css({"top" : init_contents_pos }).show();
	$mbquick_wrap.insertAfter(".mid_contents , .mid_maincontents");
	var windowWid = $(window).width();

	var $readyWid = 0;
	if(touchstart){
		posUser = 110;
	}else{
		posUser = 0;
	}
	mbQuickWidthGet();

	$(window).on("scroll touchmove",function(e){
		init_contents_pos = init_contents.length ? init_contents.offset().top : 0;
		if($(window).scrollTop()>init_contents_pos){
			$sub_quick.addClass("fixed");
		}else{
			$sub_quick.removeClass("fixed");
		}
		if(windowWid >1023){
			$mbquick_wrap.css({"display" : ""});
			return;
		}
		if($(document).height() - $(window).height() - posUser <= $(window).scrollTop()){
			$mbquick_wrap.hide();
		}else{
			$mbquick_wrap.show();
		}
	});
	$(window).on("resize",function(){
		windowWid = $(window).width();
		init_contents_pos = init_contents.length ? init_contents.offset().top : 0;
	}).resize();
	$btn_pcquick_topgo.on("click",function(e){
		e.preventDefault();
		setTimeout(function(){
			window.scrollTo(0,0);
		},50);
	});
	$btn_mbquick_call.on("click",function(e){
		e.preventDefault();
		var $this = $(this);
		$mbquick_wrap.toggleClass("active");
		$mbquick_bg.fadeToggle(500);
		if($mbquick_wrap.hasClass("active")){
			$this.find(".hdtext").text("퀵메뉴 닫기");
			$mbquick_wrap.addClass("zup");
			setTimeout(function(){
				setTabControl($mbquick_wrap);
			},20);
		}else{
			$this.find(".hdtext").text("퀵메뉴 열기");
			setTimeout(function(){
				$mbquick_wrap.removeClass("zup");
			},510);
		}
	});
	$btn_mbquick_call.on("keydown",function(e){
		var $this = $(this);
		var keyCode = e.keyCode || e.which;
		if(keyCode == 9){
			if(!$mbquick_wrap.hasClass("active")){
				setTimeout(function(){
					$(".footer_wrap").find("a,button,textarea,input,select,[tabindex]").first().focus();
				},20);
			}
		}
	});
	$mbquick_bg.on("click",function(e){
		var $this = $(this);
		$mbquick_wrap.removeClass("active");
		$this.fadeOut(500);
		$btn_mbquick_call.find(".hdtext").text("퀵메뉴 열기");
		setTimeout(function(){
			$mbquick_wrap.removeClass("zup");
		},510);
	});
	function mbQuickWidthGet() {
		var clonetext = null;
		$("body").append("<div class='mbquick_text_init_wrap' />")
		$mbquick_text.each(function () {
			$(".mbquick_text_init_wrap").append($(this).clone(true).addClass("mtclone"));
		});
		clonetext = $(".mtclone");
		var $mbquick_text_array = [];
		clonetext.each(function () {
			$mbquick_text_array.push($(this).outerWidth());
		});
		$readyWid = Math.max.apply(null, $mbquick_text_array);
		$mbquick_text.css({ "width": $readyWid});
		//$(".mbquick_text_init_wrap").remove();
	}
}


function quickLayerResize(){
	var $mbquick_wrap = $(".mbquick_wrap");
	$mbquick_wrap.css({"display" : ""});
}

/* menu rock(모바일) */
function menuRock(target){
	$(function(){
		var $target = $(target),
			$t_togone = $target.find(".mbmenu_one");
			$t_two = $target.find(".mbmenu_two_vlist_w");
		$target.addClass("active");
		$t_togone.addClass("active");
		if($t_two.length){
			$t_two.show();
		}
	});
}


/* 스크롤 넓이 구하기 */
function getScrollBarWidth() {
	var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};


/* 공통리사이즈 호출 */
function commonResize(){
	var $window_width = 0;
	midContentsResize();
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
		if($(window).width()<resizePartWidth){
			
		}else{
			$(".mobile_mainmenu_zone").trigger("closeTotal");
			headerResizePC();
			midContentsResize();
			subVisualFunc();
		}
		quickLayerResize();
		responTable();
	}).resize();
}

/* header resize */
function headerResizePC(){
	var $headgnb_li = $(".headgnb_list > li");
	var $pix_in = $(".head_group > .pix_in");
	var $gnb_depbg = $(".gnb_depbg");
	var $htm_vlist_w = $(".htm_vlist_w");
	var $pix_in_wid = $pix_in.length ? $pix_in.width() : 0;
	var $widValue = 0;
	$htm_vlist_w.removeAttr("style");
	$gnb_depbg.removeAttr("style");
	$pix_in_wid = $pix_in.length ? $pix_in.width() : 0;
	if($(window).width()<=1280){
		$headgnb_li.find(".htm_vlist_w").css({"width" : $(window).width()/$headgnb_li.length});
		$headgnb_li.each(function(index){
			$headgnb_li.eq(index).find(".htm_vlist_w").css({"left" : ($(window).width()/$headgnb_li.length)*index - 30});
		});
	}else{
		$headgnb_li.find(".htm_vlist_w").css({"width" : $pix_in_wid/$headgnb_li.length});
		$headgnb_li.each(function(index){
			$headgnb_li.eq(index).find(".htm_vlist_w").css({"left" : ($pix_in_wid/$headgnb_li.length)*index});
		});
	}
}

function subVisualFunc(){
	var $page_wrap = $(".page_wrap");
	var $main_body = $(".main_body");
	var $header_wrap = $(".header_wrap");
	var $head_memdata_wrap = $(".head_memdata_wrap");
	var $head_memdata_wrap_height = $head_memdata_wrap.length ? $head_memdata_wrap.outerHeight() : 0;
	var $header_wrap_height = $header_wrap.length ? $header_wrap.outerHeight() : 0;
	var $sub_visual_zone  = $(".sub_visual_zone");
	if($main_body.length || $sub_visual_zone.length === 0){return;}
	$sub_visual_zone.css({"padding-top:" : ""});
	if($(window).width()<1023){return;}
	// $sub_visual_zone.css({"padding-top" : $header_wrap_height});
}

function subCointentsFunc(){
	var $map_toggle_current = $(".map_toggle_current");
	var $sub_map_toggle_wrap = $(".sub_map_toggle_wrap");
	var $map_depth_vlist_wrap = $(".map_depth_vlist_wrap");
	var $sctab_contents = $(".sctab_contents");
	var $sctab = $(".sctab");
	var focusoutIs = false;
	$sctab_contents.each(function(){
		var focusable = [];
		var el_lastFocus = null;
		var el_lastPrevFocus = null;
		$(this).find("*").each(function(i, val) {
			if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
				focusable.push(val);
			}
			if((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
				focusable.push(val);
			}
		});
		
		el_lastFocus = focusable[focusable.length-1];
		el_lastPrevFocus = focusable[focusable.length-2];
		if($(el_lastFocus).prop("disabled")){
			$(el_lastPrevFocus).addClass("last_focus");
		}else{
			$(el_lastFocus).addClass("last_focus");
		}
		
	});
//	$map_toggle_current.on("click",function(e){
	$(document).on("click",".map_toggle_current",function(e){		
		var $t = $(this),
			$t_t = $t.siblings(".map_depth_vlist_wrap"),
			$t_p = $t.parents(".sub_map_toggle_wrap"),
			$t_g = $sub_map_toggle_wrap.not($t_p);
			$t_g_t = $t_g.find(".map_depth_vlist_wrap");
		/*
		if($t_g.hasClass("active")){
			$t_g.removeClass("active");
			$t_g_t.slideUp();
		}
		*/
		$t_p.toggleClass("active");
		$t_t.slideToggle();
	});
	$(".map_depth_vlist > li:last-of-type").children(".map_depth").on("focusout",function(){
		var $t = $(this),
			$t_p = $t.parents(".sub_map_toggle_wrap"),
			$t_t = $t_p.find(".map_depth_vlist_wrap");
		$t_p.removeClass("active");
		$t_t.hide();
	});
	$(document).on("click",function(e){
		if($(e.target).parents(".sub_map_toggle_wrap").length){
			return;
		}
		$sub_map_toggle_wrap.removeClass("active");
		$map_depth_vlist_wrap.slideUp();
	});
	$(".sctab").last().addClass("last");
	$(".sctab_list > li").find(".sctab").on("focusout",function(e){
		if($(this).parents("li").hasClass("active")){
			$(".sctab_contents").find("a,button,input,select").first().focus();
		}else{
			if($(this).hasClass("last")){
				if($(".quick_zone").length){
					$(".quick_zone").find("a,button,textarea,input,select,[tabindex]").first().focus();
				}else{
					$(".footer_wrap").find("a,button,textarea,input,select,[tabindex]").first().focus();
				}
			}
		}
	});
	$sctab_contents.find(".last_focus").on("focusout",function(e){
		$(".sctab_list > li.active").next().find(".sctab").focus();
	});
}


function responTable(){
	var thisWid = 0;
	var $respon_table = $(".respon_table");
	action();
	function action(){
		if($(window).width() === thisWid){return}
		if($respon_table.length){
			$respon_table.each(function(){
				var $t = $(this);
				var $colspantd = $t.find("[data-rescolspan]");
				$colspantd.each(function(){
					var $t = $(this);
					var $colspantd_value = $t.attr("data-rescolspan");
					if($(window)>767){
						$t.attr("colspan","0");
					}else{
						$t.attr("colspan",$colspantd_value);
					}
					console.log($colspantd_value);
				});
			});
		}
	}
}

// middle zone 기본높이
function midContentsResize(){
	var $front_body = $(".front_body");
	var $header_wrap = $(".header_wrap");
	var $header_wrap_height = $header_wrap.length ? $header_wrap.outerHeight() : 0;
	var $mid_contents = $(".mid_contents");
	var $footer_wrap = $(".footer_wrap");
	var $footer_wrap_height = $footer_wrap.length ? $footer_wrap.outerHeight() : 0;
	
	if($front_body.hasClass("sub_visual_type") && $(window).width()>1023){
		$header_wrap_height = 0;
	}
	$mid_contents.css({"min-height" : ""});
	
	$mid_contents.css({"min-height" : "calc(100vh - " +($header_wrap_height+$footer_wrap_height)+"px"});
}

/* 공통 레이아웃 호출 */
function commonInit(){
	// touchmode 식별
	if(touchstart){
		$("html").addClass("touchmode");
	}else{
		$("html").removeClass("touchmode");
	}
	
	if(userAgent.indexOf('samsung')>-1){
		$("html").addClass("samsung");
	}

	$(window).on("keydown",function(e){
        var keycode = e.keyCode || e.which;
        $("body").addClass("focus_mode");
        if(keycode == 13){
            focusTab = true;
        }else{
            focusTab = false;
        }
    });
	$(document).on("click",function(){
		if($(".main_body").length){return;}
		$("body").removeClass("focus_mode");
	});

	/* 스킵메뉴 접근성 이동 스크립트 */
	var $skipitem = $(".skiplist");
	if($skipitem.length){
		$('.skiplist a').blur(function(){
			setTimeout(function(){
				var $focused = $(':focus');
				if( !$('.skiplist a').is(':focus') ) {
					$('body').removeClass('skip');
				}
			},10);			
		}).click(function(ev){
			var target = $( $(this).attr('href') );
			target.attr('tabindex', 0).focus();
		});
	}

	
	$(window).on("load",function(){
		memberDataFunc();
		gnbList();
		headerUtil();
		mbTotal();
	});
	
	//  pc header
	var memdataIsc = null;
	function memberDataFunc(){
		var $memdata_isc_wrap = $(".memdata_isc_wrap");
		var memdataIsc = null;
		if($memdata_isc_wrap.length){
			if(memdataIsc !== null){
				memdataIsc.refresh();
			}else{
				memdataIsc = new IScroll('.memdata_isc_wrap', { scrollX: true, scrollY: false, mouseWheel: true ,preventDefault: false, eventPassthrough: true});
			}
		}
	}
	function gnbList(){
		var $headgnb_list = $(".headgnb_list");
		var $headgnb_list_wrap = $(".headgnb_list_wrap");
		var $headgnb_li = $(".headgnb_list > li");
		var $htm_vlist_w = $(".htm_vlist_w");
		var $hgm = $(".hgm");
		var $gnb_depbg = $(".gnb_depbg");
		var actionIs = false;
		var $header_wrap = $(".header_wrap");
		var $btn_headsearch = $(".btn_headsearch");
		var $mbmenu_two_vlist = $(".mbmenu_two_vlist");
		var $mbmenu_two_vli = $(".mbmenu_two_vlist > li");

		// init
		heightMax();
		$header_wrap.addClass("ready");
		$mbmenu_two_vli.each(function(){
			var $this = $(this);
			var $this_threelist = $this.find(".mbthree_list_w");
			if($this_threelist.length){
				$this.addClass("has_three")
			}
		});

		$headgnb_list.hoverIntent({
			over : function(){
				//headerResizePC();
				heightMax();
				hoverAction();
			},
			out : function(){
				
			},
			interval : 30
		});
		$headgnb_list_wrap.hoverIntent({
			over : function(){
			},
			out : function(){
				outAction();
			},
			interval : 30
		});
		$(document).on("mouseenter mouseover",function(e){
			if($(e.target).parents(".headgnb_list_wrap").length === 0){
				outAction();
			}
		});

		$headgnb_li.first().on("focusin",function(){
			setTimeout(function(){
				heightMax();
				focusInAction();
			},30);
		});

		$headgnb_li.first().find(".hgm").first().on("keydown",function(e){
			//focusOutAction();
			var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
				if(e.shiftKey){
					focusOutAction();
                }else{
					
				}
            }
		});

		$headgnb_li.last().find(".htm").last().on("keydown",function(e){
			//focusOutAction();
			var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
				if(e.shiftKey){
					return;
                }else{
					setTimeout(function(){
						focusOutAction();
					},50);
				}
            }
		});

		$btn_headsearch.on("keydown",function(e){
			var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
				if(e.shiftKey){
                    focusInAction();
                }
            }
		});

		function heightMax(){
			var $heightArray = [];
			$htm_vlist_w.css({"height" : "" });
			$gnb_depbg.css({"height" : "" });
			$htm_vlist_w.each(function(){
				$heightArray.push($(this).height());
			});
			$htm_vlist_w.css({"height" : Math.max.apply(null,$heightArray)});
			$gnb_depbg.css({"height" : Math.max.apply(null,$heightArray)});
		}
		
		function hoverAction(){
			if(actionIs){return;}
			actionIs = true;
			$header_wrap.addClass("active");
			$gnb_depbg.stop().slideDown(350);
			setTimeout(function(){
				$htm_vlist_w.stop().slideDown(330,function(){
					actionIs = false;
				});
			},20);
		}
		
		function focusInAction(){
			$header_wrap.addClass("active");
			$gnb_depbg.show();
			$htm_vlist_w.show();
		}
		
		function focusOutAction(){
			$header_wrap.removeClass("active");
			$gnb_depbg.hide();
			$htm_vlist_w.hide();
		}
		
		function outAction(){
			if(actionIs){return;}
			$htm_vlist_w.stop().slideUp(330);
			setTimeout(function(){
				$gnb_depbg.stop().slideUp(310,function(){
					$header_wrap.removeClass("active");
					actionIs = false;
				});
			},20);
		}
	}
	function headerUtil(){
		var $fullpage_container = $(".fullpage_container");
		var $util_toggle = $(".util.has_toggle ,.btn_mb_memtoggle");
		var $header_wrap = $(".header_wrap");
		var $headmain_wrap = $(".headmain_wrap");
		var $head_memdata_wrap = $(".head_memdata_wrap");
		var $section_mainsec01 = $(".section.mainsec01");
		var $sub_visual_zone = $(".sub_visual_zone");
		var durationToggle = 0;
		$util_toggle.on("click",function(){
			var $t = $(this);
			if($sub_visual_zone.length){
				if($t.hasClass("btn_mb_memtoggle")){

					durationToggle = 500;
				}else{
					
					durationToggle = 0;
				}
			}else{
				durationToggle = 500;
			}
			if($fullpage_container.length){
				$fullpage_container.toggleClass("type2");
			}
			//midContentsResize();
			$headmain_wrap.addClass("disabled");
			$util_toggle.toggleClass("active");
			$sub_visual_zone.toggleClass("fold");
			if($util_toggle.hasClass("active")){
				$t.find(".hdtext").text("열기");
			}else{
				$util_toggle.find(".hdtext").text("닫기");
			}
			$head_memdata_wrap.slideToggle(durationToggle);
		});
		$headmain_wrap.on("mouseleave",function(){
			$headmain_wrap.removeClass("disabled");
		});
	}
	
	// mobile total
	function mbTotal(){
		var $btn_mbmenucall = $(".btn_mbmenucall"),
			$mobile_mainmenu_zone = $(".mobile_mainmenu_zone"),
			$mainmenu_dim = $(".mainmenu_dim"),
			$btn_mbmenuclose = $(".btn_mbmenuclose"),
			$mbmenu_low = $(".mbmenu_low"),
			$mobile_mainmenu_wrap = $(".mobile_mainmenu_wrap"),
			$mbmenu_one = $(".mbmenu_one"),
			$mbmenu_two_vlist_w = $(".mbmenu_two_vlist_w"),
			$mbmenu_vli = $(".mbmenu_vlist > li"),
			$mb_skip = $(".mb_skip"),
			$phtotalObj = null;
		// init 
		if($mbmenu_low.length){
			$phtotalObj = new IScroll(".mbmenu_low",{
				mouseWheel: true,
				preventDefault : false
			});
			$mbmenu_one.on("click",function(e){
				var $this = $(this),
					$t_p = $this.parents("li"),
					$t_pw = $t_p.find(".mbmenu_two_vlist_w");
				e.preventDefault();
				if($mbmenu_two_vlist_w.length){
					$mbmenu_vli.not($t_p).removeClass("active");
					$mbmenu_two_vlist_w.not($t_pw).slideUp();
				}
				$t_pw.slideToggle(function(){
					$phtotalObj.refresh();
				});
				$t_p.toggleClass("active");
			});
			$mobile_mainmenu_zone.on("refresh",function(){
				$phtotalObj.refresh();
			});
			$mobile_mainmenu_zone.on("closeTotal",function(){
				totalClose();
			});
			$btn_mbmenucall.on("click",function(e){
				totalOpen();
			});
			$mb_skip.on("click",function(e){
				totalOpen();
			});
			$btn_mbmenuclose.on("click",function(e){
				e.preventDefault();
				totalClose();
				$btn_mbmenucall.focus();
			});
			$mainmenu_dim.on("click",function(e){
				e.preventDefault();
				totalClose();
				$btn_mbmenucall.focus();
			});
			function totalOpen(){
				$mobile_mainmenu_zone.show();
				setTimeout(function(){
					$mobile_mainmenu_zone.addClass("active");
					$phtotalObj.refresh();
					setTabControl($mobile_mainmenu_wrap);
				},30);
				if(touchstart){
					document.ontouchmove = function(e){ e.preventDefault(); };
					$("body,html").addClass("touchDis2").on("touchmove",function(e){
						e.preventDefault();
					});
				}
			}
			function totalClose(){
				$mobile_mainmenu_zone.removeClass("active");
				setTimeout(function(){
					$mobile_mainmenu_zone.hide();
					if(touchstart){
						document.ontouchmove = function(e){ return true; };
						$("body,html").removeClass("touchDis2").off("touchmove");
					}
				},500);
			}
		}
	}
}

/* old IE layer */
function oldIe(){
	var innerHtml = "";
	if( navigator.appName.indexOf("Microsoft") > -1 ){
		if(navigator.appVersion.indexOf("MSIE 7") > -1 || navigator.appVersion.indexOf("MSIE 8") > -1 || navigator.appVersion.indexOf("MSIE 9") > -1){
			innerHtml += "<div class='browser_layer_w'>";
			innerHtml += "<div class='browser_layer'>";
			innerHtml += "<div class='brow_top'>미지원 브라우저 알림</div>";
			innerHtml += "<div class='brow_mid'>";
			innerHtml += "<p class='brow_mid_p'>";
			innerHtml += "웹사이트의 모든 기능을 이용하시려면<br>";
			innerHtml += "최신 브라우저로 업데이트하시기 바랍니다.";
			innerHtml += "</p>";
			innerHtml += "<p class='brow_btn_w'>";
			innerHtml += "<a href='https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads' class='brow_btn' target='_blank' title='새창'><span class='hdtext'>Internet Explorer 다운로드 바로가기</span></a>";
			innerHtml += "</p>";
			innerHtml += "</div>";
			innerHtml += "</div>";
			innerHtml += "</div>";
			$("body").append(innerHtml);
			$(".browser_layer").css({"margin-top":-$(".browser_layer").outerHeight()/2});
			$(".browser_layer_w").addClass("complete");
			$(".page_wrap").css({"z-index":0});
		}
	}
}


/* 리스트 타이틀 + new */
function hnTitleCall(){
	var $hn_title_w = $(".hn_title_w"),
		$respdvalue = 0;
	$(window).on("load",function(){
		$(window).on("resize",function(){
			action();
		});
		action();
	});

	// action
	function action(){
		$hn_title_w.each(function(){
			var $this = $(this),
				$t_t = $this.find(".hn_title"),
				$t_n = $this.find(".hn_new , .hn_rock");
			
			if($t_n.length==0){
				$this.addClass("hasnot_new");
			}else{
				$this.removeClass("hasnot_new");
			}
		});
	}
}

/* calendar */
function datePicker(){
	var $datepicker = $(".calendar_call");
	if($datepicker.length){
		$datepicker.each(function(){
			var $dateThis = $(this);
			$(this).datepicker({
				monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				changeMonth: true,
				changeYear: true,
				dateFormat: 'yy.mm.dd'
			});
		});
		var $windowWidth = 0;
		$(window).on("resize",function(){
			if($windowWidth == $(window).width() && touchstart){return;}
			$datepicker.datepicker("hide");
			$windowWidth = $(window).width();
		});
		/*$datepicker.on("focus",function(){
			$(window).off("resize");
		});
		$datepicker.on("focusout",function(){
			$(window).on("resize");
		});*/
	}
}

/* calendar */
function datePickerInLayer(target){
	var $layer_in_calendar = $(".layer_in_calendar");
	if($layer_in_calendar.length){
		$layer_in_calendar.each(function(){
			var $dateThis = $(this);
			$(this).datepicker({
				monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				changeMonth: true,
				changeYear: true,
				dateFormat: 'yy.mm.dd',
				onSelect : function(){

				},
				beforeShow : function(){
					$(target).append($('#ui-datepicker-div'));
				}
			});
		});
		var $windowWidth = 0;
		$(window).on("resize",function(){
			if($windowWidth == $(window).width() && touchstart){return;}
			$layer_in_calendar.datepicker("hide");
			$windowWidth = $(window).width();
		});
	}
}

/* form */
function reformFunc(){
	var $resitem = $("[data-pcw]");
	var $res_flab = $(".res_flab");
	if($res_flab.length){
		$res_flab.each(function(){
			var $t_imp = $(this).find(".imp_etri");
			if($t_imp.length){
				$(this).addClass("has_imp")
			}
		});
	}
	if($resitem.length===0){return;}
	$(window).on("resize",function(){
		$resitem.each(function(){
			if($(window).width()<=1023){
				$(this).css({"width":""});
			}else{
				$(this).css({"width":$(this).attr("data-pcw")});
			}
		});
	}).resize();
}



/* layer popup event */
function dimLayerControl(){
	var touchIs = "ontouchstart" in window,
		$modal = $(".dimlayer_z");
	if($modal.length===0){return;}
	
	var readywidth = $(window).width();
	
	var objThis = this;
	$modal.on("click",".btn_layerclose,.closetrigger",function(e){
		var $this = $(this),
			$t_p = $this.parents(".dimlayer_z"),
			$t_back = $($t_p.attr("data-closefocus"));
		e.preventDefault();
		objThis.dimLayerHide({ 
			target : $t_p,
			closeCallback : function(){
				setTimeout(function(){
					if($t_back.length){
						$t_back.focus();
					}
				},40);
			}
		});
	});
};
/* layer popup show */
function dimLayerShow(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_td = null,
		$t_tpt = 0,
		$t_tpb = 0;
	
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_box_cont = $target.find(".layer_cont");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		
		if($modal.length===0){return;}
		$modal.removeClass("active");
		$target.addClass("active");
		
		var boxzoneHeight = $t_box.outerHeight()+$t_tpt+$t_tpb; 
		var varheight = 0;
		if(boxzoneHeight > $(window).height()){
			varheight = boxzoneHeight;
		}else{
			varheight = $(window).height();
		}
		$t_box.css({"top" : 0});
		
		if($t_box.find(".calendar_call").length){
			$t_box.find(".calendar_call").parent().attr("tabindex","0");
		}
		$(".page_wrap").css({"z-index":0});
		if($modal.hasClass("ptype2")){
			$modal.filter(".ptype2").css({"top":$(window).scrollTop() + ($(window).height()/2) - ($modal.outerHeight()/2)});
		}else{
			heightcheck();
		}
		setTimeout(function(){
			if($t_box_cont.length){
				$t_box_cont.attr("tabindex","0");
			}else{
				$t_box.attr("tabindex","0");
			}
			setTabControl($t_box);
		},50);
		if("openCallback" in option){
			option.openCallback();
		}
		function heightcheck(){
			if(touchIs){
				$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
				$("html").addClass("touchDis");
			}else{
				if(boxzoneHeight > $(window).height()){
					$("html").addClass("touchDis2");
				}
			}
		}
		var $windowWid = 0;
		$(window).on("resize",function(){
			if($windowWid == $(window).width()){
				return;
			}
			//$modal.filter(".ptype2").css({"top":$(window).scrollTop() + ($(window).height()/2) - ($modal.outerHeight()/2)});
			$windowWid = $(window).width();
		});
	});
};
/* layer popup hide */
function dimLayerHide(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_box_duration = 0;
		
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		$t_box_duration = transis ? $t_box.css("transition-duration").slice(0,-1)*1000 : 0;
		
		if($modal.length===0){return;}
		var boxzoneHeight = $t_box.outerHeight()+$t_tpt+$t_tpb; 
		var varheight = 0;
		
		if(boxzoneHeight > $(window).height()){
			varheight = boxzoneHeight;
		}else{
			varheight = $(window).height();
		}
		
		$target.removeClass("active");
		$(".page_wrap").css({"z-index":""});
		$("html,body").removeClass("touchDis touchDis2");
		scrollEnd();
		
		if("closeCallback" in option){
			option.closeCallback();
		}
		
		function scrollEnd(){
			if(touchIs){
				$("body").css({"margin-top":0});
				window.scrollTo(0,Number($("body").data("data-scr")));
			}
		}
	});
}


/* */
function lkTitle(target){
	var $target = $(target) || target;
	action();
	$(window).on("resize",function(){
		action();
	});
	// action
	function action(){
		$(".ing_lkbar").css({"min-width" : "" });
		$target.removeClass("complete");
		$target.each(function(){
			var $t_target = $(this),
				$t_htitle = $t_target.find(".lk_title_w"),
				$mclk_tc01 = $t_target.find(".mclk_tc01"),
				$tkey_sp = $t_target.find(".tkey_sp"),
				$ing_lkbar = $t_target.find(".ing_lkbar"),
				$tsp_array = [];
			
			if($t_htitle.length){
				$t_htitle.each(function(){
					var $this = $(this),
						$t_ico = $this.find(".lk_new");
					
					if($t_ico.length==0){
						$this.addClass("hasnot_new");
					}else{
						$this.removeClass("hasnot_new");
					}
				});
			}

			if($ing_lkbar.length){
				$ing_lkbar.each(function(){
					var $this = $(this);
					$tsp_array.push($this.outerWidth());
				});
				$mclk_tc01.css({"width" : Math.max.apply(null,$tsp_array)});
			}
			$target.addClass("complete");
		});
	}
}


/* tab */
function tabModul(){
	var $ctab = $("[data-tabTargetgroup]").find(".d_ctab");
	$ctab.on("click",function(e){
		e.preventDefault();
		var $this = $(this),	
			$t_t = $($this.attr("href")),
			$t_p = $($this.parents("[data-tabTargetgroup]")),
			$t_p_g = $($t_p.attr("data-tabTargetgroup"));


		if($t_p_g.length){
			$t_p_g.find(".d_ctabcont").hide();
		}
		if($t_t.length){
			$t_t.show();
		}
		$t_p.find(".d_ctab").removeClass("active");
		$this.addClass("active");
	});
}

/* 레이어 포커스 머물게 하는 함수 */
function setTabControl(element){
    var focusable = [];
    $(element).attr("tabIndex","0");
    $(element).find("*").each(function(i, val) {
        if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
            focusable.push(val);
        }
        if((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
            focusable.push(val);
        }
    });

    el_firstFocus = focusable[0];
    el_lastFocus = focusable[focusable.length-1];

    $(el_firstFocus).on("keydown",function(e){
        if(e.target == this){
            var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
                if(e.shiftKey){
                    $(el_lastFocus).focus();
                    e.preventDefault();
                }
            }
        }
    });
    $(el_lastFocus).on("keydown",function(e){
        if(e.target == this){
            var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
                if(!e.shiftKey){
                    $(el_firstFocus).focus();
                    e.preventDefault();
                }
            }
        }
    });
    $(element).find($(el_firstFocus)).focus();
}

/* toggle */
function toggleList(){
	var $toggle_vlist = $(".toggle_vlist");
	$toggle_vlist.on("click",".togbar",function(e){
		e.preventDefault();
		var keyCode = e.keyCode || e.which;
		var $this = $(this);
		if($this.children().length > 3){
			return;
		}
		var $this_li = $this.parents("li");
		var $this_li_cont = $this_li.find(".togcont_w");
		if($this_li.siblings("li").not($this_li)){
			$this_li.siblings("li").not($this_li).removeClass("active");
			$this_li.siblings("li").not($this_li).find(".togcont_w").slideUp();
		}
		$this_li.toggleClass("active");
		$this_li_cont.slideToggle();
	});
}
/* // toggle */

/* sort box layout 관련 */
function maxWidFunc(){
	$(function(){
		maxWidAction();
		var $wid = 0;
		
		function maxWidAction(){
			$(".sortform_item").each(function(index){
				$(".sortform_item").eq(index).addClass("row"+(index%3));
				maxWidlab(".row"+(index%3));
			});
		}
		function maxWidlab(target){
			var $sortform_lab = $(".sortform_lab");
			$sortform_lab.css({"width" : ""});
			var $array = [];
			var $arrayMb = [];
			if($(window).width()<1024){
				$sortform_lab.each(function(){
					$arrayMb.push($(this).outerWidth());
				});
				$sortform_lab.css({"width" : Math.max.apply(null,$arrayMb)});
			}else{
				$(target).each(function(){
					var $t = $(this),
						$t_lab = $t.find(".sortform_lab");
					$t_lab.css({"width" : ""});
					$t_lab.each(function(){
						$array.push($(this).outerWidth());
					});
					$t_lab.css({"width" : Math.max.apply(null,$array)});
				});
			}
		}
		$(window).on("resize",function(){
			if($wid == $(window).width()){return;}
			maxWidAction();
			$wid = $(window).width();
		});
	});
}


function maxResizeWidth(target,target2,all,widtype){
	var $target = $(target) || target;
	var $target2 = $(target2) || target2;
	if($target.length){
		
		
		
		if($(window).width()>1023){
			action();
		}else{
			if(all === "true"){
				action();
			}
		}
		var $windowWid = 0;
		$(window).on("resize",function(){
			if($windowWid == $(window).width()){return;}
			$target.css({"width" : ""});
			$target2.css({"width" : ""});
			if($(window).width()>1023){
				action();
			}else{
				if(all === "true"){
					action();
				}
			}
			$windowWid = $(window).width();
		});
		function action(){
			var $array = [];
			$target.css({"width" : ""});
			$target2.css({"width" : ""});
			$target.each(function(){
				var $t = $(this);
				if(widtype === "wid"){
					$array.push($t.width());
				}else{
					$array.push($t.outerWidth());
				}
			});
			$target2.css({"width" : Math.max.apply(null,$array)});
		}
	}
}


function midtabFunc(){
	var $detail_midtab = $(".detail_midtab");
	var $detail_midcont = $(".detail_midcont");
	var focusoutIs = false;

	function midcontItemPush(){
		$detail_midcont.each(function(){
			var focusable = [];
			var el_lastPrevFocus = null;
			var el_lastFocus = null;
			$(this).find("*").each(function(i, val) {
				if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
					focusable.push(val);
				}
				if((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
					focusable.push(val);
				}
			});
			el_lastPrevFocus = focusable[focusable.length-2];
			el_lastFocus = focusable[focusable.length-1];
			
			if($(el_lastFocus).prop("disabled")){
				$(el_lastPrevFocus).addClass("last_focus");
			}else{
				$(el_lastFocus).addClass("last_focus");
			}
		});
	}
	midcontItemPush();
	


	$detail_midtab.last().addClass("last");
	$detail_midcont.last().addClass("last");
	$detail_midtab.on("click",function(e){
		var $t = $(this),
		$t_t = $($t.attr("href"));
		e.preventDefault();
		
		$t.siblings(".detail_midtab").removeClass("active");
		$t.addClass("active");
		if($t_t.length){
			$t_t.siblings(".detail_midcont").removeClass("active");
			$t_t.addClass("active");
		}
		focusoutIs = false;
	});
	$("body").find("a,button,textarea,input,select,[tabindex]").on("keydown keypress",function(e){
		if(!$("body").hasClass("focus_mode")){return;}
		var keyCode = e.keyCode || e.which;
		if(keyCode == 9){
			if(e.shiftKey){
				focusoutIs = true;
			}else{
				focusoutIs = false;
			}
		}
	});
	$detail_midtab.on("focusout",function(e){
		var $t = $(this),
		$t_t = $($t.attr("href"));
		if(!$("body").hasClass("focus_mode")){return;}
		if(focusoutIs){return;}
		if(e.type === "focusout"){
			if($t.hasClass("active")){
				if(!$t.hasClass("last")){
					$t_t.filter(".active").find("a,button,textarea,input,select,[tabindex]").first().focus();
				}
			}else{
				if($t.hasClass("last")){
					if($(".quick_zone").length){
						$(".quick_zone").find("a,button,textarea,input,select,[tabindex]").first().focus();
					}else{
						$(".footer_wrap").find("a,button,textarea,input,select,[tabindex]").first().focus();
					}
				}
			}
		}
		focusoutIs = false;
	});
	$(".detail_midcont").find(".last_focus").on("focusout",function(e){
		if(!$("body").hasClass("focus_mode")){return;}
		var keyCode = e.keyCode || e.which;
		if(focusoutIs){return;}
		$detail_midtab.filter(".active").next(".detail_midtab").focus();
	});
	
}