//轮播图
function moveImg() {
	var current_img, img_length, timer;
	timer = setInterval(img_auto, 3000);
	$(".moveBtn").children().each(function() {
		$(this).on("mouseover mouseout", function(e) {
			if (e.type == "mouseover") {
				clearInterval(timer);
				var $index = $(this).index();
				$(this).addClass("moveBtn-active").siblings().removeClass("moveBtn-active").parent().siblings().children().eq($index).fadeIn().siblings().fadeOut();
				current_img = $index;
			} else {
				current_img++;
				clearInterval(timer);
				timer = setInterval(img_auto, 3000);
			}
		})
	})

	function img_auto() {
		img_length = $(".moveContent").children().length;
		if (!(current_img) && current_img != 0 || current_img == img_length || current_img < 0) {
			current_img = 0;
		}
		$(".moveContent").children().eq(current_img).fadeIn().siblings().fadeOut().parent().siblings().children().eq(current_img).addClass("moveBtn-active").siblings().removeClass("moveBtn-active");
		current_img++;
	}
};

//图像放大缩小
function imgChange(className) {
	var $width, $height;
	$("." + className).find("img").hover(function() {
		$width = $(this).width();
		$height = $(this).height();
		$(this).css({
			width: $width + 8,
			height: $height + 10,
			marginLeft: -5,
			marginTop: -5
		})
	}, function() {
		$(this).css({
			width: $width,
			height: $height,
			margin: 0
		})
	})
};

//登录状态内容判断
getIsLoginContent();

function getIsLoginContent() {
	if (getCookie("isLogin") == 1) {
		$(".loginActive").html("Hi," + getCookie("myUserName") + "  欢迎回嘉" + "  <a href='index.html' class='exit'>[退出]</a>");
	} else if (getCookie("isLogin") == 0) {
		$(".loginActive").html("<a href='userCenter/userLogin.html' class='loginBtn'>[登录]</a>" + "<a href='userCenter/userRegist.html' class='regist''>[免费注册]</a>");
	}
	$(".exit").on("click", function() {
		updateCookie("isLogin", "0");
	})
};

//登录状态按钮
function checkIsLoginBtn() {
	if (getCookie("isLogin") != 1) {
		alert("请您先登录");
		return false;
	}
};

//我的订单按钮
function checkMyOrderBtn() {
	if (getCookie("isLogin") != 1) {
		alert("请您先登录");
		return false;
	} else if (getCookie("proState") != 1) {
		alert("订单为空,前去挑选商品吧！");
		return false;
	}
}