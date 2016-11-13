$(function () {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
})
//商品详情页左侧折叠导航
navSlide();
function navSlide(){
	$(".l-title").eq(0).siblings(".l-main").slideDown();
	$(".l-title").not($(".l-title").eq(0)).siblings(".l-main").stop(true).slideUp();
	$(".l-title").each(function () {
		$(this).on("click",function () {
			$(this).siblings(".l-main").stop(true).slideToggle();
			$(".l-title").not($(this)).siblings(".l-main").stop(true).slideUp();
		})
	})	
}
