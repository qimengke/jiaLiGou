$(function() {
	$("#footer").load("footer.html");
	$("#login-form").submit(function(e) {
		e.preventDefault();
	})
})

function check() {
	var userName = document.getElementById("userName");
	var psw = document.getElementById("psw");
	if (userName.value == "") {
		userName.setCustomValidity("请填写用户名");
	} else if (getCookie("myUserName") != userName.value) {
		userName.setCustomValidity("用户名不存在");
	} else if (psw.value == "") {
		psw.setCustomValidity("请输入密码");
	} else if (getCookie("myPsw") != psw.value) {
		psw.setCustomValidity("密码错误");
	} else {
		updateCookie("isLogin","1")
		window.location = "../index.html";
	}
}