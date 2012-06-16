// Animationクラスの定義

var Animation = function(kind){
	
	this.maxChangeTime = 10;
	//AnimationのPositionは0~SCREENWIDTH,0~SCREENHEIGHTにする。
	//
	//	┏━━━＞x
	//	┃
	//	┃
	//	V
	//	y
	this.pos = new Position( Math.floor(Math.random()*SCREENWIDTH) , Math.floor(Math.random()*SCREENHEIGHT) );
	this.appearWaitTime = 0;
	this.kind = kind;
//	this.angle = Math.PI;
	this.angle = Math.floor( Math.random() * 16) * ( Math.PI / 8) ;
	this.sec = 0;
	//this.angle = Math.floor( Math.random() * 2) * Math.PI ; //* Math.PI;
	//this.speed = Math.floor(Math.random() * 5) * 0.0005;
	this.speed = 5;
	this.waitTime = Math.floor( Math.random() * this.maxChangeTime );
	if(this.speed == 0)
		this.kind = ANIME_CLASS.SLEEP;
	this.lifeTime = Math.floor( Math.random() * 20) * 10 + 200;
	this.defaultPosition = new Position(0,0);
	this.image = null;
	this.jumppingTime = 25;
	this.icon_heni = new Position(0,0);
	this.icon_trans = 0;
	this.sound = null;
	// 100 で　１秒
	
	this.step = function(){
		
		if(this.appearWaitTime == 0){
		
			if(this.kind != ANIME_CLASS.SLEEP && this.kind != ANIME_CLASS.DANCE && this.kind != ANIME_CLASS.JUMP){
				var ace = 1;
				if(this.kind == ANIME_CLASS.RUN)
					ace = 2;
				this.pos.x += this.speed * Math.cos(this.angle) * ace ;
				this.pos.y += this.speed * Math.sin(this.angle) * ace ;
			};
			
			var i = 0;
			for(i=0;i<POSES.length;i++){
				if( Math.abs( (POSES[i].pos.x - this.pos.x) + (POSES[i].pos.y - this.pos.y) ) < ((SCREENWIDTH / WORLD_ZOOM_RATE)*0.01) ){
					console.log(((SCREENWIDTH / WORLD_ZOOM_RATE)*0.01));
					console.log(Math.abs( (POSES[i].pos.x - this.pos.x) + (POSES[i].pos.y - this.pos.y) ));
					
					this.angle = POSES[i].angle + Math.PI ;

					if(this.angle > Math.PI*2)
						this.angle -= Math.PI*2;
					if( Math.floor( Math.random() * 2 ) == 0)
						this.kind = ANIME_CLASS.RUN;
					else
						this.kind = ANIME_CLASS.WALK;
					this.waitTime= Math.floor( Math.random() * this.maxChangeTime ) * 10 + 10;
					break;
				}
			}
	
//			fall も　ちょっと考える
//			if(this.lifeTime == 50)
//				this.kind = ANIME_CLASS.OTHER.FALL;

			if ( this.pos.x > (SCREENWIDTH / WORLD_ZOOM_RATE) ) this.pos.x = 0;
			if ( this.pos.y > (SCREENHEIGHT / WORLD_ZOOM_RATE)) this.pos.y = 0;
			if ( this.pos.x < 0) this.pos.x = (SCREENWIDTH / WORLD_ZOOM_RATE);
			if ( this.pos.y < 0) this.pos.y = (SCREENHEIGHT / WORLD_ZOOM_RATE);
			
			this.sec++;
			if( this.sec >= (ANIME_IMAGES[this.kind].length  * 1) )
				this.sec = 0;
			this.image = ANIME_IMAGES[this.kind][Math.floor(this.sec/1)];
			if ( this.angle < Math.PI/2 || this.angle > Math.PI*3/2 )
				this.icon_heni.x = -1 * ANIME_POS[this.kind][Math.floor(this.sec/1)].x;
			else
				this.icon_heni.x = ANIME_POS[this.kind][Math.floor(this.sec/1)].x;
			this.icon_heni.y = ANIME_POS[this.kind][Math.floor(this.sec/1)].y;
			

			var ang = this.angle/(Math.PI/8);
			if( this.kind != ANIME_CLASS.DANCE && this.kind != ANIME_CLASS.JUMP){
				if( ang < 4 )
					this.icon_trans = ang * 0.1 / 4;
				else if( ang < 8 )
					this.icon_trans = ( ang - 8 ) * 0.1 /4;
				else if( ang < 12)
					this.icon_trans = ( ang - 8 ) * 0.1 /4;
				else
					this.icon_trans = (ang - 16 ) * 0.1 /4 ;
			}else
				this.icon_trans = 0;
			
			if(this.sound != null && sound_play )
				this.sound.play();
			if(this.sound != null && sound_play == false)
				this.sound.pause();
			
			
			this.waitTime--;
			
			if(this.waitTime < 0 ){
				this.waitTime= Math.floor( Math.random() * this.maxChangeTime ) * 10 + 10;
				//this.kind = Math.floor( Math.random() * 3 );
				this.kind = Math.floor( Math.random() * ANIME_IMAGES.length );
//				if( this.kind != ANIME_CLASS.HAITAI )
					//this.angle = Math.floor( Math.random() * 2) * Math.PI ;
					this.angle = Math.floor( Math.random() * 16) * ( Math.PI / 8) ;	
//				else
//					this.angle = Math.PI;
				this.sound = new Audio(ANIME_SOUNDS[this.kind]);
			}
			
			this.lifeTime--;
		}else{
			this.appearWaitTime--;
			if(this.appearWaitTime == this.jumppingTime){
				this.kind = ANIME_CLASS.JUMP;
				this.sec = 0;
				this.image = ANIME_IMAGES[this.kind][0];
				//this.angle = Math.floor( Math.random() * 2) * Math.PI ; 
				this.angle = Math.floor( Math.random() * 16) * ( Math.PI / 8) ;
				//this.angle = 2 * ( Math.PI / 8) ;
				this.defaultPosition.x = this.pos.x;
				this.defaultPosition.y = this.pos.y;
				this.pos.x = this.defaultPosition.x - (SCREENWIDTH  * 0.1 / WORLD_ZOOM_RATE);
				this.pos.y = this.defaultPosition.y + ( ( (this.appearWaitTime/this.jumppingTime) - (SCREENWIDTH * 0.1 / WORLD_ZOOM_RATE ) ) * ( (this.appearWaitTime/this.jumppingTime) -  (SCREENWIDTH * 0.04/ WORLD_ZOOM_RATE)));
			}else if(this.appearWaitTime < this.jumppingTime){
				//console.log(this.pos.y - this.defaultPosition.y);
				this.pos.x = this.defaultPosition.x - (SCREENWIDTH * 0.1 / WORLD_ZOOM_RATE) * (this.appearWaitTime / this.jumppingTime);
				this.pos.y = this.defaultPosition.y + ( (this.appearWaitTime/this.jumppingTime) * ((this.appearWaitTime/this.jumppingTime) - .8)) * (SCREENHEIGHT);
				//this.pos.y = this.defaultPosition.y + ( (this.pos.x - this.defaultPosition.x) * ( (this.pos.x - this.defaultPosition.x) -  (SCREENWIDTH * 0.1 * 0.4 / WORLD_ZOOM_RATE) )) * WORLD_ZOOM_RATE;
				if( this.appearWaitTime == 0){
					this.kind = Math.floor( Math.random() * ANIME_IMAGES.length );
					this.sound = new Audio(ANIME_SOUNDS[this.kind]);
				}
			}
			//	if( this.appearWaitTime % 10 == 0)
			//		tweet.pos.x += 1;
			//	tweet.pos.y += ( 2 * (this.appearWaitTime / 10) - 25) ;
			//}
		}
	}

	this.draw = function(ctx,tweet){
	
		if( this.appearWaitTime >= this.jumppingTime )
			return
//		if( this.appearWaitTime < 200) //ジャンプして出てくるときになったら
//		{
	
		// fall 処理は後回し
		//if ( this.lifeTime > 50){
	
		//ctx.save();
		//ctx.transform(WORLD_ZOOM_RATE,0,0,WORLD_ZOOM_RATE,0,0);
		
		// 86 : 200
		
		//　画像を表示させる点（スクリーン座標）を原点とする世界へ移動
		ctx.save();
		
		if(this.lifeTime < 30)
			ctx.globalAlpha = this.lifeTime * 0.03;
		
		ctx.translate(this.pos.x,this.pos.y);
		
		ctx.save();

		ctx.transform( 1, this.icon_trans , 0 , 1- Math.abs(this.icon_trans)  ,this.icon_heni.x * WORLD_ZOOM_RATE , this.icon_heni.y * WORLD_ZOOM_RATE );
//		ctx.translate( this.icon_heni.x * WORLD_ZOOM_RATE , this.icon_heni.y * WORLD_ZOOM_RATE );
			
		var iconLength = 86 * WORLD_ZOOM_RATE;
		ctx.drawImage(tweet.img, -0.5 * iconLength, -0.5 * iconLength ,iconLength,iconLength);

		ctx.restore();
		
		ctx.transform( 1, this.icon_trans , 0 , 1- Math.abs(this.icon_trans)  ,0,0);
		
		if ( this.angle < Math.PI/2 || this.angle > Math.PI*3/2 )
			// 反転
			//ctx.transform(-1,0,0,1,tweet.screenPos.x+125, tweet.screenPos.y-125);
			ctx.transform(-1,0,0,1,0,0);
		else
			//ctx.transform(1,0,0,1,tweet.screenPos.x-125, tweet.screenPos.y-125);
			ctx.transform(1,0,0,1,0,0);
		
	
/*	
		ctx.save();
		ctx.translate(100,100);
		ctx.drawImage(tweet.img, 0,0);
//		ctx.drawImage(tweet.img, tweet.screenPos.x-25, tweet.screenPos.y-25,50,50);
		ctx.restore();
	*/
		var nekoLength = 200 * WORLD_ZOOM_RATE;
		if(this.appearWaitTime > 0)
			ctx.translate(0,20 * WORLD_ZOOM_RATE);
		if(this.image != null)
			ctx.drawImage(this.image, -0.5*nekoLength , -0.5*nekoLength, nekoLength ,nekoLength);

		ctx.restore();
		
/*		
		if( this.kind < 30){
			ctx.drawImage(ANIME_IMAGE,
					Math.floor(this.sec / 10) * ANIME_WIDTH ,this.kind * ANIME_WIDTH,
					ANIME_WIDTH,ANIME_WIDTH,
					0, 0
					,250,250);
		}else{
			ctx.drawImage(ANIME_IMAGE,
					(this.kind % 30) * ANIME_WIDTH , 3 * ANIME_WIDTH,
					ANIME_WIDTH,ANIME_WIDTH,
					0, 0
					,250,250);
		}
	*/	
		//ctx.restore();
		//ctx.drawImage(tweet.img, tweet.screenPos.x-25, tweet.screenPos.y-25,50,50);

		// fall処理は後回し
		/*
		}
		else if (this.lifeTime > 0)
		{
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
		
//			ctx.drawImage(ANIME_IMAGE,
//				Math.floor(this.sec / 10) * ANIME_WIDTH ,this.kind * ANIME_WIDTH,
//				ANIME_WIDTH,ANIME_WIDTH,
//				0, 0
//				,250,250);
			
			ctx.drawImage(ANIME_IMAGE,
				(this.kind % 30) * ANIME_WIDTH , 3 * ANIME_WIDTH,
				ANIME_WIDTH,ANIME_WIDTH,
				0, 0
				,250,250);

				ctx.restore();
			
			
		}*/

//		};
	}

}

