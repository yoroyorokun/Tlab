// Worldクラス定義

var World = function( canvas ) {/*{{{*/

	this.step = function(){/*{{{*/
		for(var i in this.tweetList){
			world.tweetList[i].step();
		}
	};/*}}}*/
	
	this.draw = function(){/*{{{*/
		this.ctx.clearRect(0,0,640,480);
		
		for(var i in this.tweetList){
			world.tweetList[i].draw(world.ctx);
		}
	};/*}}}*/

	this.loop = function(){/*{{{*/
		world.step();
		world.draw();
	};/*}}}*/


	this.updateLoop = function(search_word, count) {/*{{{*/
		var update_time = 2*60; // sec
		var callback_func = "twitterSearchCallback";
		var api_url = "http://search.twitter.com/search.json?q="
									+encodeURIComponent(search_word)+"&rpp="+count+"&callback="+callback_func;
		callJSONP(api_url);

	// デバッグ用に一度のみ取得
//		timerID = setInterval(function(){ callJSONP(api_url) },update_time*1000);

	}/*}}}*/

	this.formatedTweets = function(searches){/*{{{*/
		var s="";
		for(var i in searches["results"]){/*{{{*/
			var username = searches["results"][i].from_user;
			var id = searches["results"][i].id;
			var profile_image_url = searches["results"][i].profile_image_url;
			var status = searches["results"][i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
				return '<a href="'+url+'">'+url+'</a>';
			}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
				return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
			});
			var time_raw = searches["results"][i].created_at;
			var time_arr = time_raw.match(/([a-zA-Z]+),\s([0-9]+)\s([a-zA-Z]+)\s([0-9]+)\s([0-9:]+)\s/);
			var time_formed = time_arr[3] + " " + time_arr[2] + ", " + time_arr[4] + " " + time_arr[5];
			var time = new Date( time_formed );
			time = new Date(Date.UTC(time.getFullYear(),time.getMonth()+1,time.getDate(),time.getHours(),time.getMinutes(), time.getSeconds() ));
			s+='<li>';
			s+=	'<img src=" ' + profile_image_url+ '" width=48 height=48>';
			s+=	'<a href="http://twitter.com/' +username+ '">' +username+ '</a>:';
			s+=	'<span>' +status + " Post at " + form_date(time) + '</span>';
			//s+=	'<a style="font-size:85%" href="http://twitter.com/' +username+ '/statuses/' +id+ '">' + reltime+ '</a>';
			s+=	'</li>';
			/**/

			/*
			// Imageオブジェクトを生成 
			imgs.push(new Image());
			imgs[imgs.length-1].src = profile_image_url ;
			// 画像を描画 //
			imgs[imgs.length-1].src = profile_image_url + "?" + new Date().getTime();
			// 画像が読み込まれるのを待ってから処理を続行 //
			imgs[imgs.length-1].onload = function() {
				ctx.drawImage(this, Math.floor( Math.random() * 540 ),Math.floor( Math.random() * 380 ));
			}*/
			//ctx.drawImage(img, 0, 0,img.width,img.height,0,0);
		}/*}}}*/
		return s;
	}/*}}}*/

	this.createTweetList = function(searches){/*{{{*/
		for(var i in searches["results"]){
			var tweet = new Tweet(searches["results"][i]);
			if(tweet != null)
				world.tweetList.push(tweet);

			//tweet is null -> 被りなので追加せず
		}
	}/*}}}*/

	this.canvas = canvas ; //document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.tweetList = new Array;
	this.updateLoop("#nicovideo", 30);
	
}/*}}}*/

function twitterSearchCallback(searches) {/*{{{*/

	world.createTweetList(searches)

	// デバッグ用出力
	//  var s = world.formatedTweets(searches);
	//  var element = document.createElement();
	//  element.innerHTML = s; 
	//  document.getElementById("twitter_update_list").insertBefore(element);//innerHTML = "<ul>"+s+"</ul>";

}/*}}}*/

function callJSONP(url) {/*{{{*/
	var target = document.createElement('script');
	target.charset = 'utf-8';
	target.src = url;
	document.body.appendChild(target);
	console.log(" entered callJSONP ");
}/*}}}*/

function form_date(date) {/*{{{*/
	var d = date.getDate();
	if(d<10)
		d = "0"+d;
	return ( date.getFullYear() + "/" + (date.getMonth()+1) +"/" + d + " " + date.getHours() + ":" +date.getMinutes()+ ":" +date.getSeconds() );
}/*}}}*/

