// 初期化

var SCREENWIDTH = 640;
var SCREENHEIGHT = 480;

var ANIME_IMAGE = new Image();
ANIME_IMAGE.src = "./images/anime.png";
ANIME_IMAGE.onload = function(){ console.log("image loaded"); };

world = new World(document.getElementById('canvas'));
setInterval( world.loop , 10);
