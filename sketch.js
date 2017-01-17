var distantStars = [];
var shootingStars = [];
var nextShootingStar;
var cameraPos;
var targetCamPos;
var sun;
var mode;
var currentConstellation;
var camSize;
var mainCamera;
var timeSlider;
var timeScale;

var letters = [];

function setup()
{
	//randomSeed(5);//second());
	
  	createCanvas(1024, 768);
  	
  	timeScale = 0.5;
  	letters ="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	nextShootingStar = random(10, 20);
	mode = "Constellation View";
	currentConstellation = new Constellation();
	currentConstellation.setConstellationView();
	//timeSlider = createSlider(0, 4, 0.5, 0.05);
	
	for(i = 0; i < 500; i++)
	{
		var star = new distantStar(createVector(random(0, width), random(0, height)));
		distantStars.push(star);
		
	}
	shootingStars[0] = new shootingStar(createVector(500, 300));
	mainCamera = new Camera();
	targetCamPos = createVector(mainCamera.tVal.x, mainCamera.tVal.y);
	cameraPos = createVector(mainCamera.tVal.x, mainCamera.tVal.y);
	mainCamera.setScale(0.5);
	//planets[0].selected = true;
	
	
}


function mouseClicked()
{
	if(mouseButton == LEFT)
	{
		currentConstellation.select(mainCamera);
	}
	
}
function keyPressed()
{
	if(keyCode == 122)
	{
		fullscreen(!fullscreen());
	}
	currentConstellation.keyInput(keyCode);
	
	
}
function pan()
{
	if(keyIsDown(65) && targetCamPos.x*mainCamera.scaleValue < width*12 && mainCamera.leftBound > -width*12)
	{
		targetCamPos.x += 20;
		//if(mode == "Constellation View")
		//currentConstellation.updateConstellations("left");
	}
	else if(keyIsDown(68) && targetCamPos.x *mainCamera.scaleValue> -width*10 && mainCamera.rightBound < width*10)
	{
		targetCamPos.x -= 20;
		//if(mode == "Constellation View")
		//currentConstellation.updateConstellations("right");
	}
	if(keyIsDown(87) && targetCamPos.y*mainCamera.scaleValue < height*10 && mainCamera.topBound > -height*10)
	{
		targetCamPos.y += 15;
		//if(mode == "Constellation View")
		//currentConstellation.updateConstellations("up");
	}
	else if(keyIsDown(83)  && targetCamPos.y*mainCamera.scaleValue > -height*10 && mainCamera.bottomBound < height*10)
	{
		targetCamPos.y -= 15;
		//if(mode == "Constellation View")
		//currentConstellation.updateConstellations("down");
	}
	else if(keyIsDown(69))
	{
		mainCamera.setScale(min(mainCamera.scaleValue * 1.01, 3));
		
	}
	else if(keyIsDown(81))
	{
		if(mode == "Constellation View")
		{
			mainCamera.setScale(max(mainCamera.scaleValue * 0.99, 0.334));
		}
		else
			mainCamera.setScale(max(mainCamera.scaleValue * 0.99, 0.03));
	}
	else if(keyIsDown(70))
	{
		mainCamera.setScale(1);
	}
	
}
	


function draw() {
  background(0);
  
  for(i = 0; i < distantStars.length; i++)
  {
  	
  	distantStars[i].checkOnScreen(mainCamera);
  	distantStars[i].show();
  	
  } 
  for(i = 0; i < shootingStars.length; i++)
  {
  	shootingStars[i].show();
  	shootingStars[i].update();
  }
// timeScale = timeSlider.value();
  push();
  translate(mainCamera.tVal.x, mainCamera.tVal.y);
 //scale(1);
  scale(mainCamera.scaleValue);
  
  
  
  
  cameraPos = cameraPos.lerp(targetCamPos, 0.8);
  
  mainCamera.translatePosition(cameraPos);
  
  currentConstellation.show();
  //mainCamera.show();
  pan();
  if(shootingStars.length > 0 && shootingStars[0].len === 0)
  {
  	shootingStars.pop();
  }
  
  
  
  
 
  nextShootingStar--;
  if(nextShootingStar <= 0)
  {
  	var star = new shootingStar(createVector(random(0, width), random(0, height)));
	shootingStars.push(star);
  	nextShootingStar = random(10, 1200);
  }
  pop();
}


