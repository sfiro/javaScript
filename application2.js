//  Se crea un objeto que será manejado con los comando del mouse al presionar, 
// se usan las interrupciones del mouse, al presionar y al dejar de presionar 
// así se calcula un angulo en el cual será dirigido un cañon 
// se crea la bala la cual sale disparada al momento de presionar la barra espaciadora 

window.onload=function(){
var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;

   var vector = {
   		_x: 1,
      _y: 0,
      
      create: function(x,y){
      	var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
      },
      
      setX: function(value){
      	this._x = value;
      },
      getX: function(){
      	return this._x;
      },
      setY: function(value){
      	this._y = value;
      },
      getY: function(){
      	return this._y;
      },
      setAngle: function(angle){
      	var length = this.getLength();
        this._x = Math.cos(angle)*length;
        this._y = Math.sin(angle)*length;
      },
      getAngle: function(){
      	return Math.atan2(this._y, this._x);
      },
      setLength: function(length){
      	var angle = this.getAngle();
        this._x = Math.cos(angle)*length;
        this._y = Math.sin(angle)*length;
      },
      getLength: function(){
      	return Math.sqrt(this._x*this._x + this._y*this._y);
      },
      add: function(v2){
      	return vector.create(this._x+v2.getX(),this._y+v2.getY())
      },
      subtract: function(v2){
      	return vector.create(this._x-v2.getX(),this._y-v2.getY())
      },
      multiply: function(v2){
      	return vector.create(this._x*v2.getX(),this._y*v2.getY())
      },
      divide: function(v2){
      	return vector.create(this._x/v2.getX(),this._y/v2.getY())
      },
      addTo: function(v2){
      	this._x += v2.getX();
        this._y += v2.getY();
      },
      subtractFrom: function(v2){
      	this._x -= v2.getX();
        this._y -= v2.getY();
      },
      multiplyBy: function(val){
      	this._x *= val;
        this._y *= val;
      },
      divideBy: function(val){
      	this._x /= val;
        this._y /= val;
      },
     
   }
   
   var particle = {
   		position: null,
      velocity: null,
      gravity: null,
      mass: 1,
      radius: 0,
      bounce: -1,
      friction: 1,
      
      create: function(x,y,speed,direction,grav){
      		var obj = Object.create(this);
          obj.position = vector.create(x,y);
          obj.velocity = vector.create(0,0);
          obj.velocity.setLength(speed);
          obj.velocity.setAngle(direction);
          obj.gravity = vector.create(0,grav || 0);
          return obj;
      },
      
      accelerate: function(accel){
      	this.velocity.addTo(accel);
      },
      
      update: function(){
      	 this.velocity.multiplyBy(this.friction)
         this.velocity.addTo(this.gravity)
      	 this.position.addTo(this.velocity)
      }
   
   };
   
    function lerp(norm,min,max){
      return (max-min)*norm + min;

    }
 
   function norm(value,min,max){
      return (value-min)/(max-min);
   }
   
   function map(value,sourceMin,sourceMax,destMin,destMax){
   		var n = norm(value,sourceMin,sourceMax);
      return lerp(n,destMin,destMax)
   }
   
   function clamp(value,min,max){
      if(value > max) return max;
      if(value < min) return min;
      return value;
      //return Math.min(Math.max(value,min),max);
   }
   
   var gun = {
   			x: 100,
        y: height,
        angle: -Math.PI/4 
   },
   cannonball = particle.create(gun.x,gun.y,15,gun.angle,0.2),
   canShoot = true;
   
   cannonball.radius = 7;
   
   draw();
   
   document.body.addEventListener("mousedown", onMouseDown);
   
   document.body.addEventListener("keyup", function(event){
   		switch (event.keyCode){
      		case 32: //space
          	if(canShoot){
            	shoot();
            }
            break;
          
          default:
          	break;
      }
   });
   
   function shoot(){
   		cannonball.position.setX(gun.x+ Math.cos(gun.angle)*40);
      cannonball.position.setY(gun.y+ Math.sin(gun.angle)*40);
      cannonball.velocity.setLength(10);
      cannonball.velocity.setAngle(gun.angle);
      canShoot = false;
      update();
   }
   function update(){
   	cannonball.update();
    draw();
    if (cannonball.position.getY() > height){
    	canShoot = true;
    }
    else{
    	requestAnimationFrame(update);
    }
   }
   
   function onMouseDown(event){
   	 document.body.addEventListener("mousemove",onMouseMove);
     document.body.addEventListener("mouseup",onMouseUp);
     aimGun(event.clientX,event.clientY);
   }
   
   function onMouseMove(event){
   	aimGun(event.clientX,event.clientY);
   }
   
   function onMouseUp(event){
   		document.body.removeEventListener("mousemove",onMouseMove);
      document.body.removeEventListener("mouseup",onMouseUp);
      aimGun(event.clientX,event.clientY);
   }
   
   function aimGun(mouseX,mouseY){
   		gun.angle = clamp(Math.atan2(mouseY-gun.y, mouseX-gun.x),-Math.PI/2, -0.3 );
      draw();
   }
   
   function draw(){
   		context.clearRect(0,0,width,height);
      
      context.beginPath();
      context.arc(gun.x,gun.y,24,0,Math.PI*2,false);
      context.fill();
      
      context.save();
      context.translate(gun.x,gun.y);
      context.rotate(gun.angle);
      context.fillRect(0,-8,40,16);
      context.restore();
      
      context.beginPath();
      context.arc(cannonball.position.getX(),
      						cannonball.position.getY(),
                  cannonball.radius,
                  0,Math.PI*2,false);
      context.fill();

   }

 }
