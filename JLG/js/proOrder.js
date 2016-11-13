$(function() {
	//加载footer
	$("#footer").load("footer.html");
	
	//去结算按钮
	$("#toPayBtn").on("click",function () {
		var payWay = $(".payMent:checked").siblings().prop('outerHTML');
		addCookie("payWay",payWay,10);
		if (!getCookie("consigneePhoneNum")) {
			alert("请您务必填写收货人信息!");
			$(".address-content").css({borderColor: '#f66'});
			$(".address-tit a").css({color: '#f66'});
			 $('body,html').animate({scrollTop:0},500); 
			return false;
		}
		updateCookie("proState",2);
		window.location = "proPay.html";
	});
	
	//更新购物状态cookie
	updateCookie("proState",1);
	
});

//返回修改购物车按钮
function returnToShoppingCart() {
	updateCookie("proState", 0);
};

//添加商品到清单
addToList();
function addToList() {
	var proImg = getCookie("proImg");
	var amoNum = getCookie("amoNum");
	var proName = getCookie("proName");
	var proId = getCookie("proId");
	var proPrice = getCookie("proPrice");
	var proAmoNum = getCookie("amoNum");
	var allPriceNum = getCookie("allPriceNum");
	var allInteg = getCookie("allInteg");

	$(".proImg").attr('src', proImg);
	$(".proName").html(proName);
	$(".proId").html(proId);
	$(".firstPrice").html($(".firstPrice").html() + proPrice);
	$(".proAmo").html(amoNum);
	$(".b-price").html(allPriceNum);
	$(".b-integral").html(allInteg);
	$(".b-price-all").html(allPriceNum);
};

//获取收货人信息
getConsignee();
function getConsignee() {
	$("#consigneeArea").html(getCookie("consigneeArea"));
	$("#consigneeAddress").html(getCookie("consigneeAddress"));
	$("#consigneeName").html(getCookie("consigneeName"));
	$("#consigneePhoneNum").html(getCookie("consigneePhoneNum"));
};


