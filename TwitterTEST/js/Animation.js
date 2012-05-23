// Animationクラスの定義

var Animation = function(kind){
	
	this.kind = kind;
	this.sec = 0;
	this.angle = Math.random() * Math.PI;
	this.speed = Math.floor(Math.random() * 5) * 0.0005;

	this.step = function(tweet){
		
		tweet.pos.x += this.speed * Math.cos(this.angle) ;
		tweet.pos.y += this.speed * Math.sin(this.angle) ;

		if (tweet.pos.x > 1) tweet.pos.x = 0;
		if (tweet.pos.y > 1) tweet.pos.y = 0;
		if (tweet.pos.x < 0) tweet.pos.x = 1;
		if (tweet.pos.y < 0) tweet.pos.y = 1;
		
		this.sec++;
		if( this.sec >= 5 )
			this.sec = 0;
	}

	this.draw = function(ctx,tweet){
		ctx.drawImage(ANIME_IMAGE,
				this.sec * 500 ,0,
				500,500,
				tweet.screenPos.x-125, tweet.screenPos.y-125
				,250,250);
		ctx.drawImage(tweet.img, tweet.screenPos.x-25, tweet.screenPos.y-25,50,50);
	}

}

var ANIME_CLASS = {
	"WALK"	: 1,
	"SLEEP"	: 2,
	"TURN"	:	3
}
