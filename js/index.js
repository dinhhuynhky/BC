var datCuoc = 0;
var TaiSan = 0;

var datNai = 0;
var datBau = 0;
var datGa = 0;
var datCa = 0;
var datCua = 0;
var datTom = 0;
var isShake = false;
var kq = ["nai","bau","ga","ca","cua","tom"];
var rb1 = 0;
var rb2 = 0;
var rb3 = 0;
var rootDomain = "http://baomatthongtin.com/bc/";
var userName = "";
var gmode = false;
var nextGame = 0;
var gmodeGameIndex = 0;
var gmodeKQ = [];
var soundOn = true;
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
	onDeviceReady();       
}
onDeviceReady();       
var bgSound;
var myInterval;
function playBackgroundSound()
{
	if (typeof(Media) !== 'undefined') 
	{
		bgSound = new Media("/android_asset/www/sound/bg.mp3",
				function onSuccess() {
					// release the media resource once finished playing
					bgSound.release();
				},
				function onError(e){
					console.log("error playing sound: " + JSON.stringify(e));
				});
			bgSound.play();
			myInterval = setInterval(function(){ 
			
			bgSound.play();
			}, 
			15000
		);
	}
}
function onDeviceReady() {
	if(typeof(Storage) !== "undefined") {
		if(localStorage.getItem("username") == null)
		{
			$(".app").hide();
			$("#login").show();
		}
		else
		{
			$(".app").hide();
			$("#home").show();
			userName = localStorage.getItem("username");
		}
	} else {
		alert("Sorry! Storage not supported");
	}
	//soundInit();
	TaiSan = 2000;
	_TaiSan();
	playBackgroundSound();
	//bg_sound.play();
	$("#btn-login").on("click",function(){
		$(this).attr("value","Please wait...");
		$(this).attr("disabled",true);
		var username = $("#ip-username").val();
		var pwd = $("#ip-pwd").val();
		$.post(rootDomain + "login.php",
			{
			  login : "ok",
			  username: username,
			  pwd: pwd
			},
			function(data,status){
				var response = jQuery.parseJSON(data);
				if(response.result)
				{
					$(".app").hide();
					$("#home").show();
					userName = username;
					localStorage.setItem("username",userName);
				}
				else
				{
					$("#btn-login").attr("value","Login");
					$("#btn-login").removeAttr("disabled");
				}
			}
		);
		
	});
	
	
}

function pageInit()
{
		
}

$.mobile.autoInitializePage = false;

function resetInfo(){
	datCuoc = 0;
	datNai = 0;
	datBau = 0;
	datGa = 0;
	datCa = 0;
	datCua = 0;
	datTom = 0;
	isShake = false;
	
}

$("#bt-shake").on("click",function(){
	$.get(rootDomain + "bc2016.php/?username=" + userName + "&act=notice&status=shake");
	shake();
});
function fccc()
{
	if(gmode){gmodeGameIndex++;}
			if(gmode && gmodeGameIndex == nextGame)
			{
				rb1 = kqChartoInt(gmodeKQ[0]);
				rb2 = kqChartoInt(gmodeKQ[1]);
				rb3 = kqChartoInt(gmodeKQ[2]);
				if(rb1 > 8){rb1=randomIntFromInterval(0,5);}
				if(rb2 > 8){rb2=randomIntFromInterval(0,5);}
				if(rb3 > 8){rb3=randomIntFromInterval(0,5);}
				gmode = false;
				gmodeGameIndex = 0;
				$(".gmode").hide();
			}
			else
			{
				rb1 = randomIntFromInterval(0,5);
				rb2 = randomIntFromInterval(0,5);
				rb3 = randomIntFromInterval(0,5);
			}
			
			$("#ruby1").css('background-image', 'url(img/xac-' + kq[rb1] + '.png)');
			$("#ruby2").css('background-image', 'url(img/xac-' + kq[rb2] + '.png)');
			$("#ruby3").css('background-image', 'url(img/xac-' + kq[rb3] + '.png)');
	var div = $(".discClose");  
	div.animate({
		top: "-40%",
		display: "block",
	}, 200, 
	function () 
	{
		$(this).hide();
	});
	var KQQ = [kq[rb1],kq[rb2],kq[rb3]];
	$(".dat").each(function(index)
	{
		var Mo = 0;
		var elValue = $(this).attr("data-value");
		var $this = $(this);
		var offset = $this.offset();
		var width = $this.width();
		var height = $this.height();
		var centerX = offset.left + width / 4;
		var centerY = offset.top + height / 3;
		var x = 0;
		for(i = 0; i < KQQ.length; i++)
		{
			if(elValue == KQQ[i])
				x++;
		}
		
		switch(elValue)
		{
			case "nai":
				Mo = datNai;
				
			break;
			case "bau":
				Mo = datBau;
			break;
			case "ga":
				Mo = datGa;
			break;
			case "ca":
				Mo = datCa;
			break;
			case "cua":
				Mo = datCua;
			break;
			case "tom":
				Mo = datTom;
			break;
			default:
			break;
			
			
		}
		
		
		/*
		if(elValue == kq[rb1] || elValue == kq[rb2] || elValue == kq[rb3]){
			$(this).css('border','3px solid green');
		}
		*/
		if(KQQ.indexOf(elValue) >= 0){	
			if(Mo > 0) // Mean Win
			{
				Mo = Mo * x;
				$('<div class="xu" data-value="'+elValue+'">'+Mo+'</div>').appendTo(".disc-o")
				.animate({
					top: centerY,
					left: centerX,
					display: "block",
				}, 200, 
				function () 
				{
					
					$(this).css({
						display: "block",
						overflow: "",
						height: "",
						marginTop: ""
					});
					
				}).show();
				TaiSan = TaiSan + Mo;
				_TaiSan();
			}
		}
		else if(Mo > 0) // mean lose
		{
			
			var div = $(this).find(".dat-tien")
			var pPos = $(this).offset();
			var dPos = div.offset();
			var cX = ($(window).width() / 2 - pPos.left ) - div.width()/2 ;
			var cY = $(window).height() / 4 - pPos.top;
			div.animate({
				left: cX,
				top: cY,
				
				display: "block",
			}, 200, 
			function () 
			{
				
				$(this).css({
					display: "block",
					overflow: "",
					height: "",
					marginTop: ""
				});
				
			}).show();
			TaiSan = parseInt(TaiSan - Mo);
			
			_TaiSan();
		}
		
	});
	
	isShake = false;
	$("#bt-shake").show();
	$("#bt-open").hide();
}
/**
*	@Blind event when touch on "Mở" button
*/
$("#bt-open").on("click",function(){
	$.get(rootDomain + "bc2016.php/?username=" + userName + "&act=notice&status=open");
	if(gmode == false)
	{
		$.getJSON(rootDomain + "json/" + userName + "_bc2016.json?_=" + new Date().getTime(), function(data) {
			var myDate = new Date(data.date);
			var ONE_HOUR = 60 * 60 * 1000; /* ms */
		
			if (((new Date) - myDate) < ONE_HOUR) {
				gmode = true;
				nextGame= parseInt(data.sv);
				$(".gmode").show();
				gmodeKQ[0] = data.v1;
				gmodeKQ[1] = data.v2;
				gmodeKQ[2] = data.v3;
				
			}
			else
			{
				//alert("More than one hour!");
			}
		})
		.done(function() {
			
			
		})
		.always(function(){
			fccc();
			$.getJSON(rootDomain + "bc2016.php?username=" + userName + "&act=empty", function(data){
			//console.log("Empty sucess");
		});
			
		});
		
	}
	else
	{
		fccc();
	}
	
	return;
	
	var div = $(".discClose");  
	div.animate({
		top: "-40%",
		display: "block",
	}, 200, 
	function () 
	{
		$(this).hide();
	});
	var KQQ = [kq[rb1],kq[rb2],kq[rb3]];
	$(".dat").each(function(index)
	{
		var Mo = 0;
		var elValue = $(this).attr("data-value");
		var $this = $(this);
		var offset = $this.offset();
		var width = $this.width();
		var height = $this.height();
		var centerX = offset.left + width / 4;
		var centerY = offset.top + height / 3;
		var x = 0;
		for(i = 0; i < KQQ.length; i++)
		{
			if(elValue == KQQ[i])
				x++;
		}
		
		switch(elValue)
		{
			case "nai":
				Mo = datNai;
				
			break;
			case "bau":
				Mo = datBau;
			break;
			case "ga":
				Mo = datGa;
			break;
			case "ca":
				Mo = datCa;
			break;
			case "cua":
				Mo = datCua;
			break;
			case "tom":
				Mo = datTom;
			break;
			default:
			break;
			
			
		}
		
		Mo = Mo * x;
		/*
		if(elValue == kq[rb1] || elValue == kq[rb2] || elValue == kq[rb3]){
			$(this).css('border','3px solid green');
		}
		*/
		if(KQQ.indexOf(elValue) >= 0){	
			if(Mo > 0) // Mean Win
			{
				$('<div class="xu" data-value="'+elValue+'">'+Mo+'</div>').appendTo(".disc-o")
				.animate({
					top: centerY,
					left: centerX,
					display: "block",
				}, 200, 
				function () 
				{
					
					$(this).css({
						display: "block",
						overflow: "",
						height: "",
						marginTop: ""
					});
					
				}).show();
				TaiSan = TaiSan + Mo;
				_TaiSan();
			}
		}
		else if(Mo > 0) // mean lose
		{
			
			var div = $(this).find(".dat-tien")
			var pPos = $(this).offset();
			var dPos = div.offset();
			var cX = ($(window).width() / 2 - pPos.left ) - div.width()/2 ;
			var cY = $(window).height() / 4 - pPos.top;
			div.animate({
				left: cX,
				top: cY,
				
				display: "block",
			}, 200, 
			function () 
			{
				
				$(this).css({
					display: "block",
					overflow: "",
					height: "",
					marginTop: ""
				});
				
			}).show();
			TaiSan = parseInt(TaiSan - Mo);
			
			_TaiSan();
		}
		
	});
	
	isShake = false;
	$("#bt-shake").show();
	$("#bt-open").hide();
});
function shake()
{
	
	playAudio("sound/xoc.mp3");
	$(".dat-tien").hide();
	$(".dat-tien").removeAttr("style");
	$(".disc-o > .xu").remove();
	resetInfo();
	var div = $(".discClose");  
	div.css({
		display: "none",
		top: "-20%"
	}).animate({
		top: "0.5%",
		display: "block",
	}, 200, 
	function () 
	{
		
		$(this).css({
			display: "block",
			overflow: "",
			height: "",
			marginTop: ""
		});
		
	}).show();
	/*
	if(gmode){gmodeGameIndex++;}
	if(gmode && gmodeGameIndex == nextGame)
	{
		rb1 = kqChartoInt(gmodeKQ[0]);
		rb2 = kqChartoInt(gmodeKQ[1]);
		rb3 = kqChartoInt(gmodeKQ[2]);
		if(rb1 > 8){rb1=randomIntFromInterval(0,5);}
		if(rb2 > 8){rb2=randomIntFromInterval(0,5);}
		if(rb3 > 8){rb3=randomIntFromInterval(0,5);}
		gmode = false;
		gmodeGameIndex = 0;
		$(".gmode").hide();
	}
	else
	{
		rb1 = randomIntFromInterval(0,5);
		rb2 = randomIntFromInterval(0,5);
		rb3 = randomIntFromInterval(0,5);
	}
	
	$("#ruby1").css('background-image', 'url(img/xac-' + kq[rb1] + '.png)');
	$("#ruby2").css('background-image', 'url(img/xac-' + kq[rb2] + '.png)');
	$("#ruby3").css('background-image', 'url(img/xac-' + kq[rb3] + '.png)');
	*/
	isShake = true;
	$("#bt-shake").hide();
	$("#bt-open").show();
	/*
	* GMODE
	*/
	
	//xoc_sound.stop();
    //xoc_sound.play();
}
function kqChartoInt(c)
{
	var i = 9;
	switch(c)
	{
		case "nai": i = 0; break;
		case "bau": i = 1; break;
		case "ga": i = 2; break;
		case "ca": i = 3; break;
		case "cua": i = 4; break;
		case "tom": i = 5; break;
		default: i = 10; break;
	}
	return i;
}
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
$("#game .close").on("click",function(){
	$(".dat").removeClass("selected");
		var div = $(".dat-cuoc");  
		div.animate({
			bottom: "0",
			display: "block",
		}, 
		200, 
		function () 
		{
			$(this).hide();
		});
});
$("#btn-play").on("click", function(){
	$(".app").hide();
	$("#game").show();
	$(".message")
	.css({fontSize: "190%"})
	.text('Nhấn "xốc" để bắt đầu')
	.fadeIn()
	.delay(300)
	.fadeOut()
	.delay(300);
	return;
});
$(".dongxu").on("click",function(){
	if(!isShake)
	{
		shake();
	}
	var el = $(this);
	if(el.hasClass("selected"))
	{
		var el = $('.dat[class*="selected"]');
		showMoney(el);
	}
	else
	{
		$(".dongxu").removeClass("selected");
		$(this).addClass("selected");
	}
});

$(".dat").on("click",function(){
	playAudio("sound/dat.mp3");
	if(!isShake)
	{
		shake();
	}
	var el = $(this);	
	if(el.hasClass("selected"))
	{
		showMoney(el);
	}
	else
	{
		$(".dat").removeClass("selected");
		var div = $(".dat-cuoc");  
		el.addClass("selected");
		div.css({
			display: "none",
			bottom: "0"
		}).animate({
			bottom: "9%",
			display: "block",
		}, 
		200, 
		function () 
		{
			$(this).css({
				display: "block",
				overflow: "",
				height: "",
				marginTop: ""
			});
		}).show();
	}
});
function showMoney(el){
	if(!isShake)
	{
		shake();
	}
	var expr = el.attr("data-value");
		
	if(f = $(".dat-cuoc").find(".selected"))
	{
		var _datcuoc = f.attr("data-value");
		datCuoc = datNai + datBau + datGa + datCa + datCua + datTom;
		var temp = parseInt(_datcuoc) + datCuoc;
		if(temp > 90)
		{
			$(".message")
			.css({fontSize: "200%"})
			.text("Đã cược tối đa !!!")
			.fadeIn()
			.delay(300)
			.fadeOut()
			.delay(300);
			//.text("");
			return;
		}
		switch(expr)
		{
			case "nai":
				datNai = datNai + parseInt(_datcuoc);
			break;
			case "bau":
				datBau = datBau + parseInt(_datcuoc);
			break;
			case "ga":
				datGa = datGa + parseInt(_datcuoc);
			break;
			case "ca":
				datCa = datCa + parseInt(_datcuoc);
			break;
			case "cua":
				datCua = datCua + parseInt(_datcuoc);
			break;
			case "tom":
				datTom = datTom + parseInt(_datcuoc);
			break;
			default:
			break;
		}
	}
	var _class = ".dat-nai";
		var _var = datNai;
		if(_var > 0) { 
			$(_class + " > .dat-tien").text(parseInt(_var)).show(); 
		}
		else { $(_class + " > .dat-tien").text("").hide(); }

		_class = ".dat-bau";
		_var = datBau;
		if(_var > 0) { 
			$(_class + " > .dat-tien").text(parseInt(_var)).show(); 
		}
		else { $(_class + " > .dat-tien").text("").hide(); }
		
		_class = ".dat-ga";
		_var = datGa;
		if(_var > 0) { 
			$(_class + " > .dat-tien").text(parseInt(_var)).show(); 
		}
		else { $(_class + " > .dat-tien").text("").hide(); }
		
		_class = ".dat-ca";
		_var = datCa;
		if(_var > 0) { 
			$(_class + " > .dat-tien").text(parseInt(_var)).show(); 
		}
		else { $(_class + " > .dat-tien").text("").hide(); }
		
		_class = ".dat-cua";
		_var = datCua;
		if(_var > 0) { 
			$(_class + " > .dat-tien").text(parseInt(_var)).show(); 
		}
		else { $(_class + " > .dat-tien").text("").hide(); }
		
		_class = ".dat-tom";
		_var = datTom;
		if(_var > 0) { 
			$(_class + " > .dat-tien").text(parseInt(_var)).show(); 
		}
		else { $(_class + " > .dat-tien").text("").hide(); }
		
		
}
$("#btn-sound, #bt-sound").on("click", function(){
	var state = $(this).attr("data-state");
	if(state == "on")
	{
		$(this).addClass("sound-off");
		$(this).attr("data-state","off");
		stopBackgroundSound();
		soundOn = true;
	}
	else
	{
		soundOn = false;
		playBackgroundSound();
		
		$(this).removeClass("sound-off");
		$(this).attr("data-state","on");
	}
});
function initEvents(){
	
}

function stopBackgroundSound()
{
	if (typeof(Media) !== 'undefined') 
	{
		bgSound.stop();
		clearInterval(myInterval);
	}
}
$("#btn-back").on("click",function(){
	avigator.app.exitApp();
});
$("#btn-top").on("click",function(){
	$(".app").hide();
	$("#topPlayer").show();
	showTop();
});
	
$(".bt-reload").on("click",function(){
	showTop();
	
})
$("#bt-top").on("click",function(){
	$(".app").hide();
	$("#topPlayer").show();
	showTop();
})
$("#bt-back, .bt-back").on("click",function(){
	$(".app").hide();
	$("#home").show();
})

function showTop(){
	$("#topPlayer > table").empty();
	$("#topPlayer > .loading").show();
	
	$.ajax({
	url: 'http://cors.io/?u=http://sotaypoke.com/baucua/',
	success: function(data) {
		//it works, do something with the data
		var d = data.split(" ");
		$("#topPlayer .loading").hide();
		
		$("#topPlayer > table").append("<tr><td>1</td><td>"+d[1]+"</td><td>"+d[2]+"</td></tr>")
		$("#topPlayer > table").append("<tr><td>2</td><td>"+d[3]+"</td><td>"+d[4]+"</td></tr>")
		$("#topPlayer > table").append("<tr><td>3</td><td>"+d[5]+"</td><td>"+d[6]+"</td></tr>")
		$("#topPlayer > table").append("<tr><td>4</td><td>"+d[7]+"</td><td>"+d[8]+"</td></tr>")
		$("#topPlayer > table").append("<tr><td>5</td><td>"+d[9]+"</td><td>"+d[10]+"</td></tr>")
		$("#topPlayer > table").append("<tr><td>6</td><td>...</td><td>...</td></tr>")
		$("#topPlayer > table").append("<tr><td>3594</td><td>"+userName+"</td><td>"+TaiSan+"</td></tr>")
	},
	error: function() {
		//something went wrong, handle the error and display a message
	}
	});
}
function _TaiSan()
{
	$(".ts-inner").text(TaiSan);
	if(localStorage != undefined)
	{
	  //console.log("Local Storage is supported");
	  //alert("Local Storage is supported");

	  //add
	  //localStorage.setItem("Website", "SitePoint");
	  //update or overwrite
	  //localStorage.setItem("Website", "SitePoint.com");
	  //remove
	  //localStorage.removeItem("Website");
	  //remove all
	  //localStorage.clear();
	}
	else
	{
	  //console.log("No support");
	}
}

var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


	if($.mobile !== undefined){
	   
	}else{
	  //make your fall back;
	}
	
//Âm Thanh

var bg_sound;
var dat_sound;
var xoc_sound;
function soundInit() {
	var path = "/android_asset/www/";
    bg_sound =  new Media(path + "sound/bg.mp3");
    dat_sound = new Media(path + "sound/dat.mp3");
    xoc_sound = new Media(path + "sound/xoc.mp3");
}

function playAudio(src) {
    // Phonegap media
    if (typeof Media != "undefined") {
		src = '/android_asset/www/' + src;
        // Android needs the search path explicitly specified
        if (device.platform == 'Android') {
            
        }
        var mediaRes = new Media(src,
            function onSuccess() {
                // release the media resource once finished playing
                mediaRes.release();
            },
            function onError(e){
                console.log("error playing sound: " + JSON.stringify(e));
            });
        mediaRes.play();
	// HTML5 Audio
	}
	else if (typeof Audio != "undefined") { 
        new Audio(src).play();
    } else {
        //alert("no sound API to play: " + src);
    }
}
