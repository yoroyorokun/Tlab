// 初期化

var SCREENWIDTH = 720;
var SCREENHEIGHT = 240;

var WORLD_ZOOM_RATE = 1.0;

var MOUSE = new Position(0,0)

var ANIME_IMAGE = new Image();
ANIME_IMAGE.src = "./images/anime2.png";
ANIME_IMAGE.onload = function(){ console.log("image loaded"); };

world = new World(document.getElementById('canvas'));
setInterval( world.loop , 10);
