// Animationクラスの定義

var Animation = function(kind){
	
	this.maxChangeTime = 1000;
	
	this.kind = kind;
	this.sec = 0;
	this.angle = Math.floor( Math.random() * 2) * Math.PI ; //* Math.PI;
	//this.speed = Math.floor(Math.random() * 5) * 0.0005;
	this.speed = 0.001;
	this.waitTime = Math.floor( Math.random() * this.maxChangeTime );
	if(this.speed == 0)
		this.kind = ANIME_CLASS.SLEEP;
	this.lifeTime = Math.floor( Math.random() * 10) * 100 + 1000;

	this.step = function(tweet){
		
		if(this.kind != ANIME_CLASS.SLEEP && this.lifeTime > 50){
			tweet.pos.x += this.speed * Math.cos(this.angle) ;
			tweet.pos.y += this.speed * Math.sin(this.angle) ;
		};

		if (tweet.pos.x > 1) tweet.pos.x = 0;
		if (tweet.pos.y > 1) tweet.pos.y = 0;
		if (tweet.pos.x < 0) tweet.pos.x = 1;
		if (tweet.pos.y < 0) tweet.pos.y = 1;
		
		this.sec++;
		if( this.sec >= 50 )
			this.sec = 0;
		
		this.waitTime--;
		
		if(this.waitTime < 0 ){
			this.waitTime= Math.floor( Math.random() * this.maxChangeTime );
			this.kind = Math.floor( Math.random() * 2 );
			this.angle = Math.floor( Math.random() * 2) * Math.PI ; 
		}
		
		this.lifeTime--;
	}

	this.draw = function(ctx,tweet){
	
		if ( this.lifeTime > 50){
		ctx.save();
		ctx.transform(WORLD_ZOOM_RATE,0,0,WORLD_ZOOM_RATE,0,0);
		
		ctx.drawImage(tweet.img, tweet.screenPos.x-25, tweet.screenPos.y-25,50,50);

		if ( this.angle < Math.PI/2 || this.angle > Math.PI*3/2 )
/*			ctx.drawImage(ANIME_IMAGE,
				Math.floor(this.sec / 10) * 500 ,this.kind * 500,
				500,500,
				tweet.screenPos.x-125 , tweet.screenPos.y-125
				,250,250);*/
			// 反転
			ctx.transform(-1,0,0,1,tweet.screenPos.x+125, tweet.screenPos.y-125);
		else
/*			ctx.drawImage(ANIME_IMAGE,
				Math.floor(this.sec / 10) * 500 ,this.kind * 500,
				500,500,
				tweet.screenPos.x-125, tweet.screenPos.y-125
				,250,250);*/
			ctx.transform(1,0,0,1,tweet.screenPos.x-125, tweet.screenPos.y-125);

		ctx.save();
		ctx.translate(100,100);
		ctx.drawImage(tweet.img, 0,0);
//		ctx.drawImage(tweet.img, tweet.screenPos.x-25, tweet.screenPos.y-25,50,50);
		ctx.restore();
		
		ctx.drawImage(ANIME_IMAGE,
				Math.floor(this.sec / 10) * 500 ,this.kind * 500,
				500,500,
				0, 0
				,250,250);
		ctx.restore();
		//ctx.drawImage(tweet.img, tweet.screenPos.x-25, tweet.screenPos.y-25,50,50);
		}else if (this.lifeTime > 0){
			ctx.save();
			ctx.transform(WORLD_ZOOM_RATE,0,0,WORLD_ZOOM_RATE,0,0);
				
			ctx.beginPath();
			ctx.moveTo(tweet.screenPos.x-125, tweet.screenPos.y-125);
			ctx.lineTo(tweet.screenPos.x+125, tweet.screenPos.y-125);
			ctx.lineTo(tweet.screenPos.x+125, tweet.screenPos.y+125);
			ctx.lineTo(tweet.screenPos.x-125, tweet.screenPos.y+125);
			ctx.clip();
			
			ctx.translate(0, (50 - this.lifeTime) * 250 / 50 / 2 );
			
			ctx.drawImage(tweet.img, tweet.screenPos.x-25, tweet.screenPos.y-25,50,50);
			
			if ( this.angle < Math.PI/2 || this.angle > Math.PI*3/2 )
				ctx.transform(-1,0,0,1,tweet.screenPos.x+125, tweet.screenPos.y-125);
			else
				ctx.transform(1,0,0,1,tweet.screenPos.x-125, tweet.screenPos.y-125);

			ctx.save();
			ctx.translate(100,100);
			ctx.drawImage(tweet.img, 0,0);
			ctx.restore();
		
			ctx.save();
//			ctx.translate(0,this.lifeTime * 250 / 50);
			ctx.transform(1,0,0,0.2,125, (this.lifeTime * 250 / 50 / 2) + 250/2 - 250*0.05 ); //250 );
			ctx.beginPath();
			ctx.arc(0,0,250/4,0,Math.PI*2 , false);
			ctx.fillStyle="black";
			ctx.fill();
			ctx.restore();
		
			ctx.drawImage(ANIME_IMAGE,
				Math.floor(this.sec / 10) * 500 ,this.kind * 500,
				500,500,
				0, 0
				,250,250);
			ctx.restore();
			
			
			

		};
	}

}

var ANIME_CLASS = {
	"WALK"	: 0,
	"SLEEP"	: 1,
	"TURN"	: 2
}
