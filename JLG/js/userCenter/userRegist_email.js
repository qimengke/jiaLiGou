$(function() {
	//表单提交
	$("#regist-form-mail").submit(function(e) {
		e.preventDefault();
		check();
	});
	//加载底部
	$("#footer").load("footer.html");
})

function check() {
	var psw = document.getElementById("psw")
	var confirmPsw = document.getElementById("confirmPsw");
	var myUserName = "myUserName";
	var myPsw = "myPsw";
	var isLogin = "isLogin";
	var name = $("#mail").val();
	var Psw = $("#psw").val();
	if (getCookie(myUserName) == name) {
		alert("此用户已经注册");
	} else if (psw.value != confirmPsw.value) {
		confirmPsw.setCustomValidity("密码不一致，请重新输入");
	} else {
		addCookie(myUserName, name, 5);
		addCookie(myPsw, Psw, 5);
		addCookie(isLogin, "1", 5);
		window.location = "../index.html"
	}
}