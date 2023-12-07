//  Se crea una flecha que tiene rotacion y dirección y se controla con las flechas del teclado

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
         this.velocity.addTo(this.gravity)
      	 this.position.addTo(this.velocity)
      }
   
   };
   
   var ship = particle.create(width/2,height/2,0,0),
   thrust = vector.create(0,0),
   angle = 0,
   turningLeft = false,
   turningRight =  false,
   thrusting = false;
   
   update();
   
   document.body.addEventListener("keydown",function(event){
   		//console.log(event.keyCode);
      switch(event.keyCode){
      	case 38:  //up
        	thrusting = true;
          break;
          
        case 37:   //left
        	turningLeft = true;
          break;
          
        case 39:   //right
        	turningRight = true;
          break;
        
        default: 
        	break;
      }
   });
   
   document.body.addEventListener("keyup",function(event){
   		//console.log(event.keyCode);
      switch(event.keyCode){
      	case 38:
        	thrusting = false;
          break;
                   
        case 37:
        	turningLeft = false;
          break;
          
        case 39:
        	turningRight = false;
          break;
        
        default: 
        	break;
      }
   });
   
   
   function update(){
   	context.clearRect(0,0,width,height);
    
    if(turningLeft){
    		angle -= 0.05;
    }
    if(turningRight){
    		angle += 0.05;
    }
    
    thrust.setAngle(angle);
    
    if(thrusting){
    	thrust.setLength(0.1);
    }
    else{
    	thrust.setLength(0);
    }
    
    
     ship.accelerate(thrust);
     ship.update();
     
     context.save();
     context.translate(ship.position.getX(),ship.position.getY());
     context.rotate(angle);
     
     context.beginPath();
     context.moveTo(10,0);
     context.lineTo(-10,-7);
     context.lineTo(-10,7);
     context.lineTo(10,0);
     context.stroke();
     context.restore();
     
     context.beginPath();
     context.fill();
     
     if(ship.position.getX() > width){
        ship.position.setX(0);
     }
     if(ship.position.getX() < 0){
        ship.position.setX(width);
     }
     if(ship.position.getY() > height){
        ship.position.setY(0);
     }
     if(ship.position.getY() < 0){
        ship.position.setY(height);
     } 
     
     
     requestAnimationFrame(update);
   }

 }
