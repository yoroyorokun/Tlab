// 初期化

var SCREENWIDTH = 720;
var SCREENHEIGHT = 240;

var WORLD_ZOOM_RATE = 0.75;
var WORLD_ZOOM_RATE_TO = 1.0;
var WORLD_ZOOM_RATE_OLD = 1.0;

var MOUSE = new Position(0,0)

var TIME_STANDARD = 0;


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

//var ANIME_IMAGE = new Image();
//ANIME_IMAGE.src = "./images/anime2.png";
//ANIME_IMAGE.src = "./images/anime_small01.png";
//ANIME_IMAGE.onload = function(){ console.log("image loaded"); };

var ANIME_WIDTH = 200;

world = new World(document.getElementById('canvas'));
setInterval( world.loop , 100);
