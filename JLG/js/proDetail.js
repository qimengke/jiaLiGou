$(function() {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	//全部商品分类下导航显示
	updateCookie("activeId", 1);
	//点击更换商品展示图片
	$(".proDetail-choose-pic li").on("click", function() {
			var $thisSrc = $(this).find("img")[0].src;
			$(".proDetail-show-pic").attr("src", $thisSrc);
			$(".large").css({
				backgroundImage: ' url(' + $thisSrc + ')'
			})
		})
		//分享图标高亮
	highlight("shareBtn a");

	function highlight(className) {
		$("." + className).hover(function() {
			$("<div class='button-active'></div>").css({
				width: '100%',
				height: '100%',
				backgroundColor: 'white',
				opacity: '0.4',
				position: 'absolute',
				left: 0,
				top: 0
			}).appendTo($(this))
		}, function() {
			$(".button-active").remove();
		})
	}
	//分享按钮显示更多
	moreBtn();

	function moreBtn() {
		$(".shareBtn-more").hover(function() {
			$(".shareBtn-more-show").toggle();
		})
		$(".shareBtn-more-show").hover(function() {
			$(".shareBtn-more-show").toggle();
		})
	}
	
	//内容底部按钮点击改变颜色
	$(".p-m-b-r-tit li").on("click", function() {
			$(".img02").removeClass("img02");
			$(this).find("span").toggleClass("img02");
		})
	
	//内容底部内容切换
	$(".p-m-b-r-m li").eq(0).fadeIn().siblings().hide();
	$(".p-m-b-r-tit li").on("click", function() {
			var $index = $(this).index();
			$(".p-m-b-r-m li").eq($index).fadeIn().siblings().hide();
		})
	
	//放大镜
	magnifier()

	function magnifier() {
		var $magnify = $(".magnify");
		var $small = $(".proDetail-show-pic");
		var $large = $(".large");
		$magnify.on("mousemove", function(e) {
			var image_object = new Image();
			image_object.src = $small.attr('src');
			var current_width = 0,
				current_height = 0,
				native_width = 0,
				native_height = 0;
			if (!native_height && !native_width) {
				native_height = image_object.height;
				native_width = image_object.width;
			}
			current_height = $small.height();
			current_width = $small.width();
			var magnify_offset = $(this).offset();
			var mx = e.pageX - magnify_offset.left;
			var my = e.pageY - magnify_offset.top;

			$magnify.hover(function() {
				$large.fadeIn(500)
			}, function() {
				$large.hide()
			})

			if ($large.is(":visible")) {
				var rx = Math.round(mx / $small.width() * native_width - $large.width() / 2) * -1,
					ry = Math.round(my / $small.height() * native_height - $large.height() / 2) * -1,
					bgp = rx + "px " + ry + "px",
					px = mx - $large.width() / 2,
					py = my - $large.height() / 2;
				$large.css({
					left: px,
					top: py,
					backgroundPosition: bgp
				});
			}
		})
	};



});
//数量输入框
$(".reduceBtn").on("click", function() {
	var amountNum = $(".amountInput").val();
	if (amountNum > 1) {
		$(".amountInput").val(amountNum - 1);
	}
});
$(".addBtn").on("click", function() {
	var amountNum = parseInt($(".amountInput").val());
	if (amountNum < 999) {
		$(".amountInput").val(amountNum + 1);
	}
});
function setAmount() {
	if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8))) {
		event.returnValue = false;
	}
};

//加入购物车
$(".addShoppingCar").on("click", addToShoppingCar);

//立即购买
$(".bugBtn").on("click",function () {
	addToShoppingCar();
	window.location = "shoppingCart.html";
})

//商品加入购物车
function addToShoppingCar () {
	if (getCookie("isLogin") != 1) {
		alert("请先登录");
		return;
	}
	var proName = $(".proName").html();
	var proId = $(".proId").html();
	var proPrice = $(".proPrice").html();
	var proInt = $(".proInt").html();
	var proImg = $(".proDetail-show-pic").attr('src');
	var amoNum = $(".proAmo").val();
	var proState = 0;
	addCookie("proName",proName,10);
	addCookie("proId",proId,10);
	addCookie("proPrice",proPrice,10);
	addCookie("proInt",proInt,10);
	addCookie("proImg",proImg,10);
	addCookie("amoNum",amoNum,10);
	addCookie("proState",proState,10);
	location.reload();
};

//商品加入收藏
function addToFavorite () {
	var proName = $(".proName").html();
	var proId = $(".proId").html();
	var proPrice = $(".proPrice").html();
	var proImg = $(".proDetail-show-pic").attr('src');
	addCookie("collectName",proName,10);
	addCookie("collectId",proId,10);
	addCookie("collectPrice",proPrice,10);
	addCookie("collectImg",proImg,10);
	alert("成功加入收藏！");
};