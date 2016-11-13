$(function() {
	//加载footer
	$("#footer").load("footer.html");

	//顶部内容行获取用户名
	$(".userName").html(getCookie("myUserName"));

	//改变内容标题
	changeContent();
	
	//加载我的订单
	myOrder();
	
	//修改密码检测
	$("#changePswForm").submit(function(e) {
		e.preventDefault();
	});
	
	$("#changePswBtn").on('click', function() {
		var psw = document.getElementById("psw");
		var newPsw = document.getElementById("newPsw");
		var confirmPsw = document.getElementById("confirmPsw");
		if (psw.value != getCookie("myPsw")) {
			psw.setCustomValidity('密码错误，请重新输入');
		} else if (newPsw.value == psw.value) {
			newPsw.setCustomValidity('密码与原密码一致，请输入新的密码');
		} else if (newPsw.value != confirmPsw.value) {
			confirmPsw.setCustomValidity('两次密码输入不一致');
		} else {
			alert('修改密码成功！');
			updateCookie("myPsw",newPsw.value);
			window.location = 'user.html';
		}
	});
	
	//保存地址
	$("#address-form").submit(function (e) {
		e.preventDefault();
	});
	$(".addressSaveBtn").on("click",function () {
		$("#btntext").click();
		var consigneeArea = $("#msg").html();
		var consigneeAddress = $("#userAddress").val();
		var consigneeName = $("#userName").val();
		var consigneePhoneNum = $(".consigneePhoneNum").val();
		addCookie("consigneeArea",consigneeArea,10);
		addCookie("consigneeAddress",consigneeAddress,10);
		addCookie("consigneeName",consigneeName,10);
		addCookie("consigneePhoneNum",consigneePhoneNum,10);
		alert("保存成功!");
	});
	
	//加载地址
	if (getCookie("consigneeArea")) {
		$("#msg").html(getCookie("consigneeArea"));
		$("#userAddress").val(getCookie("consigneeAddress"));
		$("#userName").val(getCookie("consigneeName"));
		$(".consigneePhoneNum").val(getCookie("consigneePhoneNum"));
	};

	
});

//获取收藏并显示
showCollect();
function showCollect() {
	var proName = getCookie("collectName");
	var proId = getCookie("collectId");
	var proPrice = getCookie("collectPrice");
	var proImg = getCookie("collectImg");

	$(".proImg").attr('src', proImg);
	$(".proName").html(proName);
	$(".proId").html(proId);
	$(".firstPrice").html($(".firstPrice").html() + parseInt(proPrice).toFixed(2));
};

//改变内容标题
function changeContent () {
	var $index = 0;
	$(".c-li").each(function() {
		$(this).prop("$index", $index);
		$index++;
	});
	$(".c-li").on("click", function() {
		var $index = $(this).prop("$index");
		$(".content").hide().fadeIn(200);
		$(".c").eq($index).show().siblings(".c").hide();
		$(".c-t").html($(this).html());
	});
};

//我的订单
function myOrder () {
	var proImg = getCookie("proImg");
	var proAmo = getCookie("proAmo");
	var proName = getCookie("proName");
	var proId = getCookie("proId");
	var proPrice = getCookie("proPrice");
	var proAmoNum = getCookie("amoNum");
	var allPriceNum = getCookie("allPriceNum");
	var allInteg = getCookie("allInteg");
	var proState = getCookie("proState");
	
	$(".proImg1").attr('src', proImg);
	$(".proName1").html(proName);
	$(".proId1").html(proId);
	$(".firstPrice1").html("¥" + proPrice);	
	if (proState == 1) {
		$(".proState1").html("待支付  <a href='proOrder.html' class='pink'>前去支付<a>");
	} else{
		$(".proState1").html("已支付  <span style='color:red'>物品将马上到您手中!<span>");
	}
};

//判断我的订单是否为空
checkMy("allInteg");
function checkMy (content) {
	if (!getCookie(content)) {
		$(".empty-content").show().siblings().hide();
	} else {
		$(".empty-content").hide().siblings().show();
	}
};

























