var Serverurl = "http://edu.enuo100.com/";

function gocourse() {
	mui.openWindow({
		url: 'lessonlist.html'
	});
}

function goindex() {
	mui.openWindow({
		url: 'index.html'
	});
}

function goperson() {
	mui.openWindow({
		url: 'person.html'
	});
}
//导航动画
function navanimation(dom, navitem) {
	var navwidth = $(dom).width();
	var xx = $(dom).offset().left;
	var x = $(dom).index() * navwidth;
	$(navitem).removeClass("curnav");
	$(dom).addClass("curnav");
	$(".navline").animate({
		"marginLeft": x,
	}, 150);
}

//hash页面返回
function hashback() {
	location.hash = 'mainpage';
	window.onhashchange = function(e) {

		var oldHash = e.oldURL.split('#')[1];
		var newHash = e.newURL.split('#')[1];
		if(oldHash == "mainpage") {
			return;
		}
		$("#" + oldHash).slideUp();

	};

}

//hash页面切换
function hashswitch(dom) {
	var id = $(dom).attr("id");
	id = id + "page";
	$("#" + id).slideDown();
	location.hash = id;
}
//hash页面关闭
function dbgoback(dom) {
	$(dom).slideUp();
}

//点击按钮调用的方法
function refresh() {
	window.location.reload();
}

//Android强制刷新
function androrefresh(res) {
	var curres = sessionStorage.getItem(res);
	if(curres) {
		sessionStorage.removeItem(res);
		window.location.reload();
	}
}

//解决苹果刷新
function iosrefresh() {
	var isPageHide = false;
	window.addEventListener('pageshow', function() {
		if(isPageHide) {
			window.location.reload();
		}
	});
	window.addEventListener('pagehide', function() {
		isPageHide = true;
	});

}
//挂载事件
function startclick(dom) {
	mui("#pullrefresh").on('tap', dom, function(event) {
		this.click();
	});
}

//浏览记录
function listenerlook(data) {
	var furl = "/YNAPIManage/WeChatApi/MonitorWatch";
	var postdata = data;
	$.ajax({
		url: Serverurl + furl,
		type: "POST",
		async: false,
		dataType: "json",
		data: postdata,
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(result) {
			if(result.type == 1) {
				return;
			} else {
				return;
				//mui.toast(result.message);
			}
		},
		error: function() {
			//mui.toast("网络错误");

		}

	});
}

//获取访问id
function getVisit() {
	var id = '';
	var furl = "/YNAPIManage/WeChatApi/VisitId";
	$.ajax({
		url: Serverurl + furl,
		type: "get",
		async: false,
		dataType: "json",
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(result) {
			id = result.resultdata
		},
		error: function() {
		}
	});
	return id;
}

//创建购物车
function createshopcar() {
	var visitId = getVisit();
	var furl = "/YNAPIManage/WeChatApi/CreateShopCart?visitId=" + visitId;
	$.ajax({
		url: Serverurl + furl,
		type: "POST",
		async: false,
		dataType: "json",
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(result) {
			if(result.type == 1) {
				getshopcarid();
			} else {
				mui.toast('创建购物车失败');
				history.back(-1);
			}
		},
		error: function() {
		}
	});

}
//获取购物车标识
function getshopcarid() {
	var shopCartId;
	var furl = "/YNAPIManage/WeChatApi/GetShopCartId";
	$.ajax({
		url: Serverurl + furl,
		type: "GET",
		async: false,
		dataType: "json",
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(result) {
			if(result.type == 1) {
				shopCartId = result.resultdata;
			} else {
				//mui.toast('获取数据失败');
				//return;
			}
		},
		error: function(){
			//mui.toast("网络错误")
		}

	});
	return shopCartId;
}

//检查是否创建购物车
function checkshopcar(){
	var cartId = getshopcarid();
	if(cartId == '' || cartId == null) {
		createshopcar();
	}
}

//加入购物车
function insertgoods(entydata) {
	var visitId = getVisit();
	var cartId = getshopcarid();
	var furl = "/YNAPIManage/WeChatApi/InsertGoods";
	var goodsdata = entydata;
	var postdata = {
		visitId: visitId,
		cartId: cartId,
		entity:entydata
	}
	$.ajax({
		url: Serverurl + furl,
		type: "POST",
		async: false,
		dataType: "json",
		data: postdata,
		crossDomain: true,
		xhrFields: {
			withCredentials: true
		},
		success: function(result) {
			if(result.type == 1) {
				mui.toast('加入购物车成功');
			} else {
				mui.toast('加入购物车失败');
			}
		},
		error: function() {

		}
	});
}

//身份证验证
function IdentityCodeValid(code) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var pass = true;
	if(code == "" || code == null) {
		pass = false;
	}
	if(!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
		//"身份证号格式错误";
		pass = false;
	} else if(!city[code.substr(0, 2)]) {
		//"地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for(var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]) {
				//"校验位错误";
				pass = false;
			}
		}
	}
	return pass;

}

//验证手机号
function checktel(data) {
	var regtel = /^1\d{10}$/;
	var telpass = true;
	if(data == "" || data == null) {
		telpass = false;
	} else if(!regtel.test(data)) {
		telpass = false;
	}
	return telpass;
}

//验证姓名
function checkname(data) {
	var regname = /^([\u4e00-\u9fa5]){2,7}$/;
	var namepass = true;
	if(data == "" || data == null) {
		namepass = false;
	} else if(!regname.test(data)) {
		namepass = false;
	}
	return namepass;
}

//截取字符串信息处理
function plusXing(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for(var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}