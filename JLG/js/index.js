$(function() {
	//加载顶部底部
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	//获取活动状体啊
	updateCookie("activeId", 0);
	//banner轮播图
	moveImg();
	
	//左侧导航内容
	$(".navLeft-navLeft-content").css({
		top: '0px',
		left: '190px'
	})
	$(".navLeft-case").hover(function() {
		$(this).find(".navLeft-navLeft-content").css('display', 'block')
	}, function() {
		$(this).find(".navLeft-navLeft-content").css('display', 'none')
	})
	
	//昨日今日热播切换
	$(".tv-live .main-title").children().each(function() {
		$(this).on("click", function() {
			$(this).addClass("pink").siblings().removeClass("pink");
			if ($(this).index() == 0) {
				$(".yesterday-tv-goods").hide()
				switcher("tv-goods");
			} else {
				$(".tv-goods").hide()
				switcher("yesterday-tv-goods")
			}
		})
	})

	//tv-live左右切换
	$(".tv-goods-show").on("mouseover mouseout", function(evt) {
		if (evt.type == "mouseover") {
			$(".leftBtn").show().next().show();
		} else {
			$(".leftBtn").hide().next().hide();
		}
	});

	switcher("tv-goods");
	function switcher(className) {
		var className = "." + className;
		img_length = $(className).length;
		$(className).eq(0).show();
		var current_img = 0,
			img_length;

		$(".rightBtn").on("click", function() {
			current_img++;
			if (current_img >= img_length) {
				current_img = 0;
			}
			$(className).eq(current_img).show().siblings().not(".leftBtn").not(".rightBtn").hide();
		}).prev().on("click", function() {
			current_img--;
			if (current_img < 0) {
				current_img = img_length - 1;
			}
			$(className).eq(current_img).show().siblings().not(".leftBtn").not(".rightBtn").hide();
		})
	};
	
	//商品图放大缩小
	imgChange("f-right-show");

	//关闭ab
	$("#ad span").on("click", function() {
		$("#ad").hide();
	});
});