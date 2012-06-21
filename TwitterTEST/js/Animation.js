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
					//console.log(((SCREENWIDTH / WORLD_ZOOM_RATE)*0.01));
					//console.log(Math.abs( (POSES[i].pos.x - this.pos.x) + (POSES[i].pos.y - this.pos.y) ));
					
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
					this.icon_trans = (4 - ang) * 0.1 ;
				else if( ang <= 8 )
					this.icon_trans = (4  - ang ) * 0.1 ;
				else
					this.icon_trans = ( ang - 12 ) * 0.1 ;
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
					//this.angle = 0;	
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

		var p = new Array;
			
		
		//　画像を表示させる点（スクリーン座標）を原点とする世界へ移動
		ctx.save();
		
		if(this.lifeTime < 30)
			ctx.globalAlpha = this.lifeTime * 0.03;
		
		ctx.translate(this.pos.x,this.pos.y);
		
		var iconLength = 86 * WORLD_ZOOM_RATE;

		if(this.icon_trans > 0){
			p[0] = {x: this.icon_heni.x * WORLD_ZOOM_RATE -0.5 * iconLength , y: this.icon_heni.y * WORLD_ZOOM_RATE -0.5 * iconLength};
			p[1] = {x: p[0].x + iconLength ,y:p[0].y + this.icon_trans * 15 };
			p[2] = {x: p[0].x ,y:p[0].y + iconLength };
			p[3] = {x: p[0].x + iconLength ,y:p[0].y + iconLength - this.icon_trans * 15 };
		}else{
			p[0] = {x: this.icon_heni.x * WORLD_ZOOM_RATE -0.5 * iconLength , y: this.icon_heni.y * WORLD_ZOOM_RATE -0.5 * iconLength};
			p[1] = {x: p[0].x + iconLength ,y:p[0].y };
			p[2] = {x: p[0].x ,y:p[0].y + iconLength };
			p[3] = {x: p[0].x + iconLength ,y:p[0].y + iconLength };
			p[0].y -= this.icon_trans * 15;
			p[2].y += this.icon_trans * 15;
		}
		
		/* 左上三角のクリッピング */
		ctx.save();
		ctx.beginPath();ctx.moveTo( p[0].x , p[0].y);
		ctx.lineTo( p[1].x , p[1].y);
		ctx.lineTo( p[2].x , p[2].y);
		ctx.closePath();
		ctx.clip();
		
		var t1=(p[1].x-p[0].x) / iconLength;
		var t2=(p[1].y-p[0].y) / iconLength;
		var t3=(p[2].x-p[0].x) / iconLength;
		var t4=(p[2].y-p[0].y) / iconLength;
		var t5=p[0].x;
		var t6=p[0].y;

		ctx.transform( t1,t2,t3,t4,t5,t6);
//		ctx.transform( 1, this.icon_trans , 0 , 1 ,this.icon_heni.x * WORLD_ZOOM_RATE -0.5 * iconLength , this.icon_heni.y * WORLD_ZOOM_RATE -0.5 * iconLength );
		ctx.drawImage(tweet.img, 0, 0 ,iconLength,iconLength);

		ctx.restore();
		
		/* 右下三角のクリッピング */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( p[1].x , p[1].y);
		ctx.lineTo( p[2].x , p[2].y);
		ctx.lineTo( p[3].x , p[3].y);
		ctx.closePath();
		ctx.clip();
		
		t1=(p[3].x-p[2].x) / iconLength;
		t2=(p[3].y-p[2].y) / iconLength;
		t3=(p[3].x-p[1].x) / iconLength;
		t4=(p[3].y-p[1].y) / iconLength;
		t5= p[2].x ;
		t6= p[2].y;
		
		ctx.transform(t1,t2,t3,t4,t5,t6);
		//ctx.transform( 1, -1* this.icon_trans , 0 , 1 -1* this.icon_trans ,this.icon_heni.x * WORLD_ZOOM_RATE -0.5 * iconLength , this.icon_heni.y * WORLD_ZOOM_RATE -0.5 * iconLength + iconLength);
		ctx.drawImage(tweet.img, 0, -1 * iconLength ,iconLength,iconLength);

		ctx.restore();

		
		
		// キャラクタ表示部分
		var nekoLength = 200 * WORLD_ZOOM_RATE;
		if(this.icon_trans > 0){
			p[0] = {x: -0.5 * nekoLength , y: -0.5 * nekoLength};
			p[1] = {x: p[0].x + nekoLength ,y:p[0].y };
			p[2] = {x: p[0].x ,y:p[0].y + nekoLength };
			p[3] = {x: p[0].x + nekoLength ,y:p[0].y + nekoLength};
			p[1].y -= this.icon_trans * 15;
			p[3].y += this.icon_trans * 15;
			//console.log(p[0].x);
		}else{
			p[0] = {x: -0.5 * nekoLength , y: -0.5 * nekoLength};
			p[1] = {x: p[0].x + nekoLength ,y:p[0].y };
			p[2] = {x: p[0].x ,y:p[0].y + nekoLength };
			p[3] = {x: p[0].x + nekoLength ,y:p[0].y + nekoLength };
			p[0].y -= this.icon_trans * 15;
			p[2].y += this.icon_trans * 15;
		}
		
		/* 左上三角のクリッピング */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( p[0].x , p[0].y);
		ctx.lineTo( p[1].x , p[1].y);
		ctx.lineTo( p[2].x , p[2].y);
		ctx.closePath();
		ctx.clip();
		
		t1=(p[1].x-p[0].x) / nekoLength;
		t2=(p[1].y-p[0].y) / nekoLength;
		t3=(p[2].x-p[0].x) / nekoLength;
		t4=(p[2].y-p[0].y) / nekoLength;
		t5=p[0].x;
		t6=p[0].y;

		if ( this.angle < Math.PI/2 || this.angle > Math.PI*3/2 )
			// 反転
			ctx.transform(-1,0,0,1,0,0);
			
		ctx.transform( t1,t2,t3,t4,t5,t6);
		
		if(this.appearWaitTime > 0)
			ctx.translate(0,20 * WORLD_ZOOM_RATE);
		if(this.image != null)
			//ctx.drawImage(this.image, -0.5*nekoLength , -0.5*nekoLength, nekoLength ,nekoLength);
			ctx.drawImage(this.image, 0, 0, nekoLength ,nekoLength);
		
		ctx.restore();
		
		/* 右下三角のクリッピング */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo( p[1].x , p[1].y);
		ctx.lineTo( p[2].x , p[2].y);
		ctx.lineTo( p[3].x , p[3].y);
		ctx.closePath();
		ctx.clip();
		
		t1=(p[3].x-p[2].x) / nekoLength;
		t2=(p[3].y-p[2].y) / nekoLength;
		t3=(p[3].x-p[1].x) / nekoLength;
		t4=(p[3].y-p[1].y) / nekoLength;
		t5= p[2].x ;
		t6= p[2].y;
		
		if ( this.angle < Math.PI/2 || this.angle > Math.PI*3/2 )
			// 反転
			ctx.transform(-1,0,0,1,0,0);
		
		ctx.transform(t1,t2,t3,t4,t5,t6);
			
		
		if(this.appearWaitTime > 0)
			ctx.translate(0,20 * WORLD_ZOOM_RATE);
		if(this.image != null)
			//ctx.drawImage(this.image, -0.5*nekoLength , -0.5*nekoLength, nekoLength ,nekoLength);
			ctx.drawImage(this.image, 0, -1 *nekoLength , nekoLength ,nekoLength);
		
		ctx.restore();

			
		ctx.restore();
	
	}

}

