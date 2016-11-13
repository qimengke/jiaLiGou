$(function() {
	if (getCookie("proState") == 0) {
		showAddedGoods();
		showAll();
	}
	//登录状态
	if (getCookie("isLogin") == 1) {
		$(".loginActive").html("Hi," + getCookie("myUserName") + "  欢迎回嘉" + "  <a href='' class='exit'>[退出]</a>");
	} else if (getCookie("isLogin") == 0) {
		$(".loginActive").html("<a href='userCenter/userLogin.html' class='loginBtn'>[登录]</a>" + "<a href='userCenter/userRegist.html' class='regist''>[免费注册]</a>");
	};

	$(".exit").on("click", function() {
		updateCookie("isLogin", "0");
	})
	//加载底部页面
	$("#footer").load("footer.html");
	
	//数量输入框加减按钮
	$(".reduceBtn").on("click", function() {
		var amountNum = $(".proAmo").val();
		if (amountNum > 1) {
			$(".proAmo").val(amountNum - 1);
		}
		showAll();
		updateCookie("amoNum",$(".proAmo").val());
	});
	$(".addBtn").on("click", function() {
		var amountNum = parseInt($(".proAmo").val());
		if (amountNum < 999) {
			$(".proAmo").val(amountNum + 1);
		}
		showAll();
		updateCookie("amoNum",$(".proAmo").val());
	});
	
	//购物车选择
	$(".goods-checkbox").on("click",function () {
		showAll();
		if(!$(".goods-checkbox").is(':checked')){
			$(".checkbox-bg").addClass("checkbox-bg-img02");
		} else {
			$(".checkbox-bg").removeClass("checkbox-bg-img02");
		}
		$(".goods-checkbox").each(function () {
			if ($(this).is(':checked')) {
				$(".all-goods-checkbox").prop('checked',true);
			}else{
				$(".all-goods-checkbox").prop('checked',false);
			}
		})
	});
	//购物车全选
	$(".all-goods-checkbox").on("click",function () {
		if(!$(".all-goods-checkbox").is(':checked')){
			$(".goods-checkbox").prop('checked',false);
			$(".checkbox-bg").addClass("checkbox-bg-img02");
		} else {
			$(".goods-checkbox").prop('checked',true);
			$(".checkbox-bg").removeClass("checkbox-bg-img02");
		}
		showAll();
	});
	//数量输入框移出检测
	$(".proAmo").on("blur",function () {
		if($(this).val() == '' || $(this).val() == 0){
			$(this).val(1);
		}
		$(this).val(parseInt($(this).val()));
		showAll();
	})
	//去结算按钮
	$(".toPayBtn").on("click",function () {
		var amoNum = $(".proAmo").val();
		var allPriceNum = $(".b-price-all").html();
		var allInteg = $(".b-integral").html();
		addCookie("amoNum",amoNum,10);
		addCookie("allPriceNum",allPriceNum,10);
		addCookie("allInteg",allProIntNum,10);
		updateCookie("proState",1,10);
		window.location = "proOrder.html";
	});
	
});
	
//购物车总计显示
var allProIntNum;
function showAll () {
	var proName = getCookie("proName");
	var proId = getCookie("proId");
	var proPrice = getCookie("proPrice");
	var proInt = getCookie("proInt");
	var proImg = getCookie("proImg");
	var proAmo = getCookie("amoNum");
	var allPriceNum,
		allAmoNum = parseInt($(".proAmo").val()),
		integralMultiple = '2';
	if (!$(".goods-checkbox").is(':checked')){
		allAmoNum = 0;
		integralMultiple = '0';
	} 
	allPriceNum = (parseInt(proPrice) * allAmoNum).toFixed(2);
	allProIntNum = proInt * allAmoNum * 2 ;
	$(".b-price").html(allPriceNum);
	$(".b-integral").html(proInt * allAmoNum + ' * ' + integralMultiple + ' = ' + allProIntNum);
	$(".b-price-all").html(allPriceNum);
}
	
	
//数量输入框检测
function setAmount() {
	if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8))) {
		event.returnValue = false;
	}
};

//显示添加到购物车的商品
function showAddedGoods() {
	if (!getCookie("proName")) {
		return false;
	}
	if($(".goods-show").css('display') == "none"){
		$(".empty-cart").hide().siblings().show();
	}
	var $html = $(".goods-show").html();
	var $newHtml = '<ul class="goods-content-goods"><li class="goods-content-t1"><img class="proImg" src=""/><input type="checkbox" class="goods-checkbox" checked="checked"/><span class="checkbox-bg checkbox-bg-img01"></span></li><li class="goods-content-t2"> <p class = "proName" > </p> <p class = "proId" > </p> </li> <li class = "goods-content-t3" > <p class = "firstPrice" > ¥ </p> </li> <li class = "goods-content-t4"> <a href ="javascript:void(0)" class = "reduceBtn"> - </a> <input type = "text" name = "" id = "" value = "1" maxlength = "3" size = "3" onkeydown = "setAmount()" class = "amountInput proAmo" /><a href = "javascript:void(0)" class = "addBtn" > + </a> </li > <li class = "goods-content-t3" ><span class = "proPrice" > ¥ </span> </li > <li class = "goods-content-t5" > <button class="deleteBtn"> 删除 </button> </li></ul>';
	$(".goods-show").html($html + $newHtml);
	
	var proName = getCookie("proName");
	var proId = getCookie("proId");
	var proPrice = getCookie("proPrice");
	var proInt = getCookie("proInt");
	var proImg = getCookie("proImg");
	var proAmo = getCookie("amoNum");
	
	$(".proImg").attr('src',proImg);
	$(".proName").html(proName);
	$(".proId").html(proId);
	$(".firstPrice").html($(".firstPrice").html() + (parseInt(proPrice) + 20).toFixed(2) );
	$(".amountInput").val(proAmo);
	$(".proPrice").html($(".proPrice").html() + parseInt(proPrice).toFixed(2) );
	
	$(".deleteBtn").on("click",function () {
		$(this).parent().parent().remove();
		if($(".goods-content-goods").size() <= 0){
			$(".empty-cart").show().siblings().hide();
		}
		deleteAllCookie();
	})
};

//删除商品cookie
function deleteAllCookie () {
	deleteCookie("proName");
	deleteCookie("proId");
	deleteCookie("proPrice");
	deleteCookie("proInt");
	deleteCookie("proImg");
	deleteCookie("amoNum");
};






