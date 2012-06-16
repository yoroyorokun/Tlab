// 初期化

audiojs.events.ready(function() {
    var as = audiojs.createAll();
});

var SCREENWIDTH = 800;
var SCREENHEIGHT = 400;

var WORLD_ZOOM_RATE = 0.75;
var WORLD_ZOOM_RATE_TO = 1.0;
var WORLD_ZOOM_RATE_OLD = 1.0;

var MOUSE = new Position(0,0)

var TIME_STANDARD = 0;

var POSES = new Array;


var ANIME_CLASS = {
	"WALK"	: 0,
	"SLEEP"	: 1,
	"RUN": 2,
	"DANCE": 3,
	"JUMP": 4 //,
/*	"OTHER"	: {
		"ENTER": 30,
		"FALL" : 31
	}*/
}

var ANIME_IMAGES = new Array
ANIME_IMAGES[ANIME_CLASS.WALK] = new Array();
ANIME_IMAGES[ANIME_CLASS.WALK][0] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][0].src = "./images/cat/walk_01.png";
ANIME_IMAGES[ANIME_CLASS.WALK][1] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][1].src = "./images/cat/walk_02.png";
ANIME_IMAGES[ANIME_CLASS.WALK][2] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][2].src = "./images/cat/walk_03.png";
ANIME_IMAGES[ANIME_CLASS.WALK][3] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][3].src = "./images/cat/walk_04.png";
ANIME_IMAGES[ANIME_CLASS.WALK][4] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][4].src = "./images/cat/walk_05.png";
ANIME_IMAGES[ANIME_CLASS.WALK][5] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][5].src = "./images/cat/walk_06.png";
ANIME_IMAGES[ANIME_CLASS.WALK][6] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][6].src = "./images/cat/walk_07.png";
ANIME_IMAGES[ANIME_CLASS.WALK][7] = new Image();
ANIME_IMAGES[ANIME_CLASS.WALK][7].src = "./images/cat/walk_08.png";

ANIME_IMAGES[ANIME_CLASS.SLEEP] = new Array();
ANIME_IMAGES[ANIME_CLASS.SLEEP][0] = new Image();
ANIME_IMAGES[ANIME_CLASS.SLEEP][0].src = "./images/cat/sleep_01.png";
ANIME_IMAGES[ANIME_CLASS.SLEEP][1] = new Image();
ANIME_IMAGES[ANIME_CLASS.SLEEP][1].src = "./images/cat/sleep_02.png";
ANIME_IMAGES[ANIME_CLASS.SLEEP][2] = new Image();
ANIME_IMAGES[ANIME_CLASS.SLEEP][2].src = "./images/cat/sleep_03.png";
ANIME_IMAGES[ANIME_CLASS.SLEEP][3] = new Image();
ANIME_IMAGES[ANIME_CLASS.SLEEP][3].src = "./images/cat/sleep_04.png";

ANIME_IMAGES[ANIME_CLASS.RUN] = new Array();
ANIME_IMAGES[ANIME_CLASS.RUN][0] = new Image();
ANIME_IMAGES[ANIME_CLASS.RUN][0].src = "./images/cat/run_01.png";
ANIME_IMAGES[ANIME_CLASS.RUN][1] = new Image();
ANIME_IMAGES[ANIME_CLASS.RUN][1].src = "./images/cat/run_02.png";
ANIME_IMAGES[ANIME_CLASS.RUN][2] = new Image();
ANIME_IMAGES[ANIME_CLASS.RUN][2].src = "./images/cat/run_03.png";
ANIME_IMAGES[ANIME_CLASS.RUN][3] = new Image();
ANIME_IMAGES[ANIME_CLASS.RUN][3].src = "./images/cat/run_04.png";

ANIME_IMAGES[ANIME_CLASS.DANCE] = new Array();
ANIME_IMAGES[ANIME_CLASS.DANCE][0] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][0].src = "./images/cat/dance_01.png";
ANIME_IMAGES[ANIME_CLASS.DANCE][1] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][1].src = "./images/cat/dance_02.png";
ANIME_IMAGES[ANIME_CLASS.DANCE][2] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][2].src = "./images/cat/dance_03.png";
ANIME_IMAGES[ANIME_CLASS.DANCE][3] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][3].src = "./images/cat/dance_04.png";
ANIME_IMAGES[ANIME_CLASS.DANCE][4] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][4].src = "./images/cat/dance_05.png";
ANIME_IMAGES[ANIME_CLASS.DANCE][5] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][5].src = "./images/cat/dance_06.png";
ANIME_IMAGES[ANIME_CLASS.DANCE][6] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][6].src = "./images/cat/dance_07.png";
ANIME_IMAGES[ANIME_CLASS.DANCE][7] = new Image();
ANIME_IMAGES[ANIME_CLASS.DANCE][7].src = "./images/cat/dance_08.png";


ANIME_IMAGES[ANIME_CLASS.JUMP] = new Array();
ANIME_IMAGES[ANIME_CLASS.JUMP][0] = new Image();
ANIME_IMAGES[ANIME_CLASS.JUMP][0].src = "./images/cat/jump_01.png";
ANIME_IMAGES[ANIME_CLASS.JUMP][1] = new Image();
ANIME_IMAGES[ANIME_CLASS.JUMP][1].src = "./images/cat/jump_02.png";
ANIME_IMAGES[ANIME_CLASS.JUMP][2] = new Image();
ANIME_IMAGES[ANIME_CLASS.JUMP][2].src = "./images/cat/jump_03.png";
ANIME_IMAGES[ANIME_CLASS.JUMP][3] = new Image();
ANIME_IMAGES[ANIME_CLASS.JUMP][3].src = "./images/cat/jump_04.png";
ANIME_IMAGES[ANIME_CLASS.JUMP][4] = new Image();
ANIME_IMAGES[ANIME_CLASS.JUMP][4].src = "./images/cat/jump_05.png";
ANIME_IMAGES[ANIME_CLASS.JUMP][5] = new Image();
ANIME_IMAGES[ANIME_CLASS.JUMP][5].src = "./images/cat/jump_06.png";


var ANIME_POS = new Array
ANIME_POS[ANIME_CLASS.WALK] = new Array();
ANIME_POS[ANIME_CLASS.WALK][0] = new Position(0,-3);
ANIME_POS[ANIME_CLASS.WALK][1] = new Position(0,-1);
ANIME_POS[ANIME_CLASS.WALK][2] = new Position(0,0);
ANIME_POS[ANIME_CLASS.WALK][3] = new Position(0,-1);
ANIME_POS[ANIME_CLASS.WALK][4] = new Position(0,-3);
ANIME_POS[ANIME_CLASS.WALK][5] = new Position(0,-1);
ANIME_POS[ANIME_CLASS.WALK][6] = new Position(0,+0);
ANIME_POS[ANIME_CLASS.WALK][7] = new Position(0,-1);

ANIME_POS[ANIME_CLASS.SLEEP] = new Array();
ANIME_POS[ANIME_CLASS.SLEEP][0] = new Position(0,30);
ANIME_POS[ANIME_CLASS.SLEEP][1] = new Position(1,31);
ANIME_POS[ANIME_CLASS.SLEEP][2] = new Position(2,32);
ANIME_POS[ANIME_CLASS.SLEEP][3] = new Position(1,31);

ANIME_POS[ANIME_CLASS.RUN] = new Array();
ANIME_POS[ANIME_CLASS.RUN][0] = new Position(1,-4);
ANIME_POS[ANIME_CLASS.RUN][1] = new Position(1,-2);
ANIME_POS[ANIME_CLASS.RUN][2] = new Position(1,0);
ANIME_POS[ANIME_CLASS.RUN][3] = new Position(1,2);

ANIME_POS[ANIME_CLASS.DANCE] = new Array();
ANIME_POS[ANIME_CLASS.DANCE][0] = new Position(-4,-1);
ANIME_POS[ANIME_CLASS.DANCE][1] = new Position(-4,0);
ANIME_POS[ANIME_CLASS.DANCE][2] = new Position(-3,1);
ANIME_POS[ANIME_CLASS.DANCE][3] = new Position(-2,0);
ANIME_POS[ANIME_CLASS.DANCE][4] = new Position(0,-2);
ANIME_POS[ANIME_CLASS.DANCE][5] = new Position(0,0);
ANIME_POS[ANIME_CLASS.DANCE][6] = new Position(-2,0);
ANIME_POS[ANIME_CLASS.DANCE][7] = new Position(-3,0);


ANIME_POS[ANIME_CLASS.JUMP] = new Array();
ANIME_POS[ANIME_CLASS.JUMP][0] = new Position(1,-20);
ANIME_POS[ANIME_CLASS.JUMP][1] = new Position(1,7);
ANIME_POS[ANIME_CLASS.JUMP][2] = new Position(1,3);
ANIME_POS[ANIME_CLASS.JUMP][3] = new Position(1,1);
ANIME_POS[ANIME_CLASS.JUMP][4] = new Position(1,3);
ANIME_POS[ANIME_CLASS.JUMP][5] = new Position(1,1);

var ANIME_SOUNDS = [
	"./sounds/walk.mp3",
	"./sounds/walk.mp3",
	"./sounds/run.mp3",
	"./sounds/run.mp3",
	"./sounds/jump.mp3"
];

var sound_play = false;

/*var ANIME_SOUNDS = {
	"WALK"	: "./sounds/walk.mp3",
	"SLEEP"	: "./sounds/walk.mp3",
	"RUN": "./sounds/run.mp3",
	"DANCE": "./sounds/jump.mp3",
	"JUMP": "./sounds/jump.mp3"
};*/


/*
var element = document.createElement("div");
var func = "sound_play =! sound_play;";
element.innerHTML = " <button id=\"sound_button\" type=\"button\" onclick=\""+ func + "\"> 効果音On/Off </button> ";
var tmp = document.getElementById("button");
tmp.insertBefore(element);
*/

//var ANIME_IMAGE = new Image();
//ANIME_IMAGE.src = "./images/anime2.png";
//ANIME_IMAGE.src = "./images/anime_small01.png";
//ANIME_IMAGE.onload = function(){ console.log("image loaded"); };

var ANIME_WIDTH = 200;

world = new World(document.getElementById('canvas'));
setInterval( world.loop , 100);
