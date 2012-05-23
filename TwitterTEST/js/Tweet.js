// Tweetクラス定義

var Tweet = function(date) {/*{{{*/

	this.loadDone = function(t){
		t.img_load_done = true;
		//t.draw_state = 0;
	}

	if(world.tweetList[date.text] == null){
		this.username = date.from_user;
		this.id = date.id;
		this.icon_url = date.profile_image_url;
		this.status = date.text;
		/*.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
		  return '<a href="'+url+'">'+url+'</a>';
		}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
		  return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
		});*/
		var time_raw = date.created_at;
		var time_arr = time_raw.match(/([a-zA-Z]+),\s([0-9]+)\s([a-zA-Z]+)\s([0-9]+)\s([0-9:]+)\s/);
		var time_formed = time_arr[3] + " " + time_arr[2] + ", " + time_arr[4] + " " + time_arr[5];
		this.time = new Date( time_formed );
		//this.time = new Date(Date.UTC(this.time.getFullYear(),this.time.getMonth()+1,this.time.getDate(),this.time.getHours(),this.time.getMinutes(), this.time.getSeconds() ));
		this.time = new Date( Date.UTC(this.time) );
		
		this.img = new Image();
		this.img.src = this.icon_url + "?" + new Date().getTime();
		this.img_load_done = false;
		this.img.onload = this.loadDone(this);
		this.draw_state = 0;
	}else{ return null; };
	
	
	
	this.step = function(){};

	this.draw = function(ctx){
		if(this.img_load_done == true ){
			ctx.drawImage(this.img, Math.floor( Math.random() * 540 ),Math.floor( Math.random() * 380 ));
		}
	};

}/*}}}*/

