//global variables
//objects in canvas & frames
var Mario,stage1,stage1_1,W,H;
//var skyimg,darkskyimg,sunimg,gateimg,guardimg,dudeimg,bubbleimg;
var Marioimg,stage1img,stage1_1img,stage5img,stage1_5img;
var frame;
var Mariowidth,currentstage=1,jumpflag=false,moveLeft=false,moveRight=false,baseflag=0,upflag=false,ylower,yupper,absoluteY,grav=0.5,yVel=0;
var gatelink=1;stagelink=-1;
var timecounter=0,savex,savey;
var KEYCODE_LEFT = 37, KEYCODE_RIGHT = 39, KEYCODE_UP = 38, KEYCODE_DOWN = 40, KEYCODE_SPACE=32;
// initialise loaders for each frame, work on loading meter
function checkOrientation()
{
	if(window.matchMedia("(orientation: portrait)").matches) {
		alert("Please switch to Landscape Mode");
	}
}
$(window).on("orientationchange",function(){
  if(window.orientation == 0) // Portrait
  {
	  checkOrientation();
  }
  else // Landscape
  {
	  window.location.reload(false);
  }
});

function togglecontrol()
{
	if(document.onkeydown==null||document.onkeyup==null)
	{
		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;
	}
	else {
		document.onkeydown = null;
		document.onkeyup = null;
	}
}

function init() {
	checkOrientation();
	frame = new createjs.Stage("intro1");
	window.addEventListener("resize", resize);

	 W = window.innerWidth;
   	 H = window.innerHeight-(window.innerHeight*0.1);

	//positionFrame();
     // loading every graphic before hand
	manifest = [
	{src: "../resources/World1.png", id: "WORLD_1"},
     {src: "../resources/MarioBg.png", id: "WORLD_1_1"},
     {src: "../resources/stage5.png", id: "WORLD_1_5"},
	{src:"../resources/MarioClimb.png",id:"Mario"}
	];
     loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
	togglecontrol(1);
	//createjs.Ticker.interval=1000; //in ms
}

//initialise each frame
function handleComplete() {
     initFrameElements();
	changeStage(1);
	createjs.Ticker.addEventListener("tick", gameloop);
}

function changeStage(stageno)
{
	frame.removeAllChildren();
	stagelink=-1;upflag=false;
	if(stageno!=-1)
		currentstage=stageno;
	var stageobj;
	if(currentstage==1)
     {
		stageobj=stage1;
		baseflag=1;
		ylower=changeWH(0,199)-H/6;
     	yupper=changeWH(0,71)-H/6;
		Mario.x=changeWH(1,225);
		stagelink=0;
	}
	else if(currentstage==2)
     {
		stagelink=1;
		stageobj=stage1_1;
		baseflag=0;
		ylower=changeWH(0,199)-H/6;
     	yupper=changeWH(0,135)-H/6;
	}
	else if(currentstage==5)
	{
		stagelink=1;
		stageobj=stage1_5;
		baseflag=0;
		ylower=changeWH(0,200)-H/6;
     	yupper=changeWH(0,145)-H/6;
     	Mario.x=0;
		// set other variables

	}
	var absoluteY=(baseflag==0)?ylower:yupper;
	Mario.y=absoluteY;
	frame.addChild(stageobj,Mario);
     resize();
	frame.update(event);

}

function initFrameElements()
{
     //=======================================WORLD_1==================================
     stage1img=loader.getResult("WORLD_1");
     stage1 = new createjs.Shape();
     stage1.graphics.beginBitmapFill(stage1img).drawRect(0, 0, W, H);

	//=======================================WORLD_1_1==================================
     stage1_1img=loader.getResult("WORLD_1_1");
     stage1_1 = new createjs.Shape();
     stage1_1.graphics.beginBitmapFill(stage1_1img).drawRect(0, 0, W, H);

     //=======================================WORLD_1_1==================================
     stage1_5img=loader.getResult("WORLD_1_5");
     stage1_5 = new createjs.Shape();
     stage1_5.graphics.beginBitmapFill(stage1_5img).drawRect(0, 0, W, H);

     //======================================Mario=======================================

     Marioimg=loader.getResult("Mario");
     var marioSheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [Marioimg],
     frames: {width:16.9, height:32, count:9, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "stand":[0,0,"stand"],
     "runf": [1, 3,"runf",0.2],
	"jump":[5,5,"jump"],
	"dug":[6,6,"dug"],
	"climb":[7,8,"climb",1.5]
     // "runb":{
	// 	frames:[6,5,4,3,2,1,0],
	// 	next:"runb",
	// 	speed:0.2
	// }
     }
     });
	Mario = new createjs.Sprite(marioSheet, "stand");
}

function scaleElements(stage)
{
     if(stage==1)
	{
          stage1.x=0;
          stage1.y=0;
          stage1.scaleX=W/stage1img.width;
          stage1.scaleY=(H)/stage1img.height;
     }
	//================================================================
	if(stage==2)
	{
          stage1_1.x=0;
          stage1_1.y=0;
          stage1_1.scaleX=W/stage1_1img.width;
          stage1_1.scaleY=(H)/stage1_1img.height;
     }
     if(stage==5)
	{
          stage1_5.x=0;
          stage1_5.y=0;
          stage1_5.scaleX=W/stage1_5img.width;
          stage1_5.scaleY=(H)/stage1_5img.height;
     }
	//================================================================
	Mariowidth=Mario.getBounds().width; //equal in every frame
	Mario.scaleX=W/(14*Mario.getBounds().width);
	Mario.scaleY=H/(6*Mario.getBounds().height)
}


function jump(orgy)
{

	// createjs.Tween.get(Mario, {loop: false})
	//     .to({y: orgy-200}, 300, createjs.Ease.getPowInOut(4));
	grav=5;
	yVel = -(50);

}
function godown()
{
	togglecontrol();
	savex=Mario.x;savey=Mario.y;
	createjs.Tween.get(Mario, {loop: false})
	     .to({alpha: 0,y: savey+H/6}, 1000, createjs.Ease.getPowInOut(2));
	//createjs.Ticker.removeEventListener("tick", gameloop);

	setTimeout (openform, 2000);
	// will call goin with stage=false to open form after 1 sec
}
function openform()
{
	// open a form no. formlink via nodal and come back to same place
	 call1(1);
	// alert("hey bro");
	setTimeout (goup, 1000);
}
function goup()
{
	// not to be called ,unles godown has been called previously.
	//will be called after form has been closed
	createjs.Tween.get(Mario, {loop: false})
	     .to({alpha: 0,x:savex ,y: savey+H/6}, 1, createjs.Ease.getPowInOut(2))
		.to({alpha: 1,x:savex ,y: savey-H/6}, 1000 , createjs.Ease.getPowInOut(2));
	setTimeout(togglecontrol,1050);
}

function goin()
{
	//you have to open up in a new stage, x denotes stage number
	changeStage(stagelink);

}

function handleKeyDown(e) {
    switch (e.keyCode) {
        case KEYCODE_SPACE:
        case 87:  // W
		   if(!jumpflag)
		   {
		 	   jumpflag=true;
			   setanimation(Mario,"jump",Mario.currentAnimation);
			   jump();//jump(Mario.y);
		    }
             break;
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = true;
		  setanimation(Mario,"runf",Mario.currentAnimation);
		  //Mario.gotoAndPlay("runf");
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = true;
		  setanimation(Mario,"runf",Mario.currentAnimation);
		  //Mario.gotoAndPlay("runf");
            break;
	  case KEYCODE_DOWN:
       case 83:  // S
	  	if(!moveRight && !moveLeft)
	  		setanimation(Mario,"dug",Mario.currentAnimation);
	  	 if(baseflag==1 && jumpflag==false)
		 {
	           moveDown = true;
			 godown();
	 	}
		  //Mario.gotoAndPlay("runf");
           break;
	 case KEYCODE_UP:
	  	 if(upflag)
		 {
		 	upflag = false;
		 	if(currentstage==5&&baseflag==1)
			 {
			 	setanimation(Mario,"climb",Mario.currentAnimation);
              	climbq();
			 }
			else 
	        {   
		 		createjs.Tween.get(Mario, {loop: false})
		     	.to({alpha: 0}, 500, createjs.Ease.getPowInOut(2))
				.to({alpha: 1}, 1, createjs.Ease.getPowInOut(2));
				 setTimeout(goin, 500);
			}
			 

	 	}
		  //Mario.gotoAndPlay("runf");
          break;
    }

}
function climbq() {
	togglecontrol();

  createjs.Tween.get(Mario,{loop:false}).to({y:Mario.y-changeWH(0,140)},700,createjs.Ease.getPowInOut(2));
  if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-(W/15);
  if(x>changeWH(0,65)-(W/15)&&x<changeWH(0,146))
    {
      createjs.Tween.get(Mario,{loop:false}).to({x:changeWH(1,95)},300,createjs.Ease.getPowInOut(2)).
      to({y:Mario.y-changeWH(0,104)},700,createjs.Ease.getPowInOut(2));
    }
    else if(x>changeWH(0,224)-(W/15)&&x<changeWH(0,304))
    {
      createjs.Tween.get(Mario,{loop:false}).to({x:changeWH(1,255)},300,createjs.Ease.getPowInOut(2)).
      to({y:Mario.y-changeWH(0,104)},700,createjs.Ease.getPowInOut(2));
    }
    else if(x>changeWH(0,381)-(W/15)&&x<changeWH(0,461))
    {
      createjs.Tween.get(Mario,{loop:false}).to({x:changeWH(1,409)},300,createjs.Ease.getPowInOut(2)).
      to({y:Mario.y-changeWH(0,104)},700,createjs.Ease.getPowInOut(2));
    }
setTimeout(togglecontrol, 500);
}

function handleKeyUp(e) {
    switch (e.keyCode) {
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = false;
		  setanimation(Mario,"stand",Mario.currentAnimation);
		  if(moveRight)
		  	setanimation(Mario,"runf",Mario.currentAnimation);
            //Mario.gotoAndPlay("stand");
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = false;
		  setanimation(Mario,"stand",Mario.currentAnimation);
		  if(moveLeft)
		  	setanimation(Mario,"runf",Mario.currentAnimation);
		  //Mario.gotoAndPlay("stand");
            break;
	  case KEYCODE_DOWN:
	  case 83:  // S
	     setanimation(Mario,"stand",Mario.currentAnimation);


    }
}


function changeWH(a,b)
{
     if(a==1)
          return b*(W/515);
     return b*(H/223);
}

function play0(event)
{
	//WORLD0
}
function play1(event)
{
     var a=changeWH(1,86),b=changeWH(1,33),c=changeWH(1,70),d=changeWH(1,241),e=changeWH(1,273),w=W/15;
     var x,y=Mario.y;
	if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-W/15;
     baseflag=0;
     if(x>d-w && x<e)
	     if(y<=yupper)
	          baseflag=1;
	     else
	          baseflag=0;
	if(((x<a-w) || ( x>a+b && x<a+b+c-w) || (x>a+2*b+c && x<a+2*b+2*c-w) || (x>a+3*b+2*c && x<a+3*b+3*c-w) || (x>a+4*b+3*c)) && baseflag==0 && !jumpflag)
	{
		//set stagelink and upflag=true
		stagelink=parseInt(x/(W/5))+1;
		upflag=true;
	}
	else
	{
		upflag=false;
		stagelink=-1;
	}
     //setanimation(dudeobj,"runf",dudeobj.currentAnimation);
}

function play2(event)
{
     var a=changeWH(1,114),b=changeWH(1,33),c=changeWH(1,96),w=W/15;
     var x,y=Mario.y;
	if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-W/15;
     baseflag=0;
     if((x>a-w && x<a+b) || ( x>a+b+c-w && x<a+2*b+c) || (x>a+2*b+2*c-w && x<a+3*b+2*c))
          if(y<=yupper)
               baseflag=1;
          else
               baseflag=0;
     //setanimation(dudeobj,"runf",dudeobj.currentAnimation);
}

function play3(event)
{
	//WORLD1_3
}

function play4(event)
{
	//WORLD1_4
}
function play5(event)
{
     var a=changeWH(1,65),b=changeWH(1,78),c=changeWH(1,78),w=W/15;
     var x,y=Mario.y;
	if(Mario.scaleX>0)
		x=Mario.x;
	else
		x=Mario.x-(W/15);
     baseflag=0;
     if((x>a-w && x<a+b) || ( x>a+b+c-w && x<a+(2*b)+c) || (x>a+2*b+2*c-w && x<a+3*b+2*c))
        {  if(y<=yupper)
            {
                baseflag=1;
               upflag=true;
             }
          else
              { 
			   baseflag=0;
                upflag=false;
              }

        }
       
      else 
        upflag=false;

     //setanimation(dudeobj,"runf",dudeobj.currentAnimation);
}
function play6(event)
{
	//WORLD1_6
}
function gravity()
{
     if(Mario.y<absoluteY||jumpflag)
     {
		jumpflag=true;
		yVel += grav;
  	   Mario.y += yVel;
  	   if (Mario.y > absoluteY)
  	   {
		   if(moveLeft||moveRight)
		   	setanimation(Mario,"runf",Mario.currentAnimation);
		   else 
	      	setanimation(Mario,"stand",Mario.currentAnimation);
		 Mario.y = absoluteY;
  		 yVel = 0;
  		 jumpflag = false;
  	   }
     }

}


function setanimation(obj,set,old)
{
	if(set!=old)
	{
		obj.gotoAndPlay(set);
	}
}

function positionFrame()
{
	var x=(window.innerHeight-H)/2;
	document.getElementById("mymain_container").style.top = x+"px";
	document.getElementById("intro1").width = W;
	document.getElementById("intro1").height = H;

	scaleElements(currentstage);
	frame.update(event);
}

//resize event
function resize() {

    W = window.innerWidth/parseFloat($("body").css("font-size"));
    W*=15;
    H = window.innerHeight-(window.innerHeight*0.1);
    positionFrame();
    //alert("coming "+W+" "+H+" "+window.innerWidth+" "+$(window).width());

}

function gameloop(event)
{
	if(currentstage==0)
		play0(event);
     else if(currentstage==1)
          play1(event);
		else if(currentstage==2)
			play2(event);
			else if(currentstage==3)
				play3(event);
				else if(currentstage==4)
					play4(event);
					else if(currentstage==5)
						play5(event);
						else if(currentstage==6)
							play6(event);
	absoluteY=baseflag==0?ylower:yupper;
	if (moveLeft)
	{
	  //setanimation(Mario,"runf",Mario.currentAnimation);
	  Mario.x -= 10;
	  if(Mario.scaleX>0)
	  {
		  Mario.scaleX *= -1;
		  Mario.x +=W/14;
	  }
    }
    else if (moveRight)
    {
	    //setanimation(Mario,"runf",Mario.currentAnimation);
		  Mario.x += 10;
		  if(Mario.scaleX<0)
		  {
			  Mario.scaleX *= -1;
			  Mario.x -= W/14;
		  }
    }

     gravity();
     frame.update(event);
}
