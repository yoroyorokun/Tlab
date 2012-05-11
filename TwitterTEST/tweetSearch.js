function updateLoop(search_word, count) {
  var update_time = 2*60; // sec
  var callback_func = "twitterSearchCallback";
  var api_url = "http://search.twitter.com/search.json?q="
	+encodeURIComponent(search_word)+"&rpp="+count+"&callback="+callback_func;
  callJSONP(api_url);
  timerID = setInterval(function(){callJSONP(api_url)},update_time*1000);
}

function twitterSearchCallback(searchs) {
  var s = convertSearchedTweets(searchs);
  var element = document.createElement();
  element.innerHTML = s; 
//  document.getElementById("twitter_update_list").appendChild(element);//innerHTML = "<ul>"+s+"</ul>";
  document.getElementById("twitter_update_list").insertBefore(element);//innerHTML = "<ul>"+s+"</ul>";
}

function convertSearchedTweets(searchs) {
  var s="";
  for(var i in searchs["results"]){
    var username = searchs["results"][i].from_user;
    var id = searchs["results"][i].id;
    var profile_image_url = searchs["results"][i].profile_image_url;
    var status = searchs["results"][i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
	var time_raw = searchs["results"][i].created_at;
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
	/* Imageオブジェクトを生成 */
	imgs.push(new Image());
	imgs[imgs.length-1].src = profile_image_url ;
	/* 画像を描画 */
	imgs[imgs.length-1].src = profile_image_url + "?" + new Date().getTime();
	/* 画像が読み込まれるのを待ってから処理を続行 */
	imgs[imgs.length-1].onload = function() {
		ctx.drawImage(this, Math.floor( Math.random() * 540 ),Math.floor( Math.random() * 380 ));
	}
	//ctx.drawImage(img, 0, 0,img.width,img.height,0,0);
  }
  return s;
}

function form_date(date) {
	var d = date.getDate();
	if(d<10)
		d = "0"+d;
	return ( date.getFullYear() + "/" + (date.getMonth()+1) +"/" + d + " " + date.getHours() + ":" +date.getMinutes()+ ":" +date.getSeconds() );
}

//Fri, 11 May 2012 06:11:52 +0000

function callJSONP(url) {
  var target = document.createElement('script');
  target.charset = 'utf-8';
  target.src = url;
  document.body.appendChild(target);
}

var canvas = document.getElementById('canvas');
if ( ! canvas || ! canvas.getContext ) { return false; }
var ctx = canvas.getContext('2d');
  var imgs = new Array;

updateLoop("#nicovideo", 30);