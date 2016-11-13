$(function() {
	//加载底部和cookie
	$("#footer").load("footer.html");
	$("#payWay").html(getCookie("payWay"));
	$("#payPrice").html(getCookie("allPriceNum"));
	updateCookie("proState", 2);

	//确认支付按钮
	$(".payBtn").on("click", function() {
		$(".red-line-li").width(540);
		updateCookie("proState", 3);
		//	window.location = "index.html";
		$(".modal-content .pink").html(getCookie("allPriceNum"));
		modalTime();
	});
	//弹出模态窗口
	$('.payBtn').modal({
		trigger: '.payBtn', 
		olay: 'div.overlay', 
		modals: 'div.modal', 
		animationEffect: 'slideDown', 
		animationSpeed: 400, 
		moveModalSpeed: 'slow', 
		background: 'ccc', 
		opacity: 0.7, 
		openOnLoad: false,
		docClose: false,
		closeByEscape: true,
		moveOnScroll: true,
		resizeWindow: true,
		video: 'http://player.vimeo.com/video/2355334?color=eb5a3d', // enter the url of the video
		videoClass: 'video', 
		close: '.closeBtn'
	});

});

//模态窗口倒计时
function modalTime () {
	var time = 5;
	var timer = setInterval(function () {
		$(".modal-time").html(time);
		time--;
		if (time == 0) {
			window.location = "index.html";
		}
	},1000);
}




















