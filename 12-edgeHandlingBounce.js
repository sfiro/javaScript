//  Se agrega el parametro bounce, el cual define la disminución de la velocidad con respecto a los rebotes en los bordes de la pantalla definida

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
   
   var ship = particle.create(width/2,height/2,5,Math.random()*Math.PI*2,0.1),
   		thrust = vector.create(0,0);
   
    ship.radius=20;
    ship.bounce=0.8;
   
   update();
   
   document.body.addEventListener("keydown",function(event){
   		//console.log(event.keyCode);
      switch(event.keyCode){
      	case 38:
        	thrust.setY(-0.1);
          break;
          
        case 40:
        	thrust.setY(0.1);
          break;
          
        case 37:
        	thrust.setX(-0.1);
          break;
          
        case 39:
        	thrust.setX(0.1);
          break;
      }
   });
   
   document.body.addEventListener("keyup",function(event){
   		//console.log(event.keyCode);
      switch(event.keyCode){
      	case 38:
        	thrust.setY(0);
          break;
          
        case 40:
        	thrust.setY(0);
          break;
          
        case 37:
        	thrust.setX(0);
          break;
          
        case 39:
        	thrust.setX(0);
          break;
      }
   });
   
   
   function update(){
   	context.clearRect(0,0,width,height);
     ship.accelerate(thrust);
     ship.update();
     
     //console.log(ship.position.getX(),ship.position.getY())
     
     context.beginPath();
     context.arc(ship.position.getX(),ship.position.getY(),ship.radius,0,Math.PI*2,false);
     context.fill();

     // se verifica que el objeto rebote en los bordes 
     if(ship.position.getX()+ship.radius > width){
        ship.position.setX(width - ship.radius);
        ship.velocity.setX(ship.velocity.getX()*-ship.bounce)
     }
     if(ship.position.getX() - ship.radius < 0){
        ship.position.setX(ship.radius);
        ship.velocity.setX(ship.velocity.getX()*-ship.bounce)
     }
     if(ship.position.getY() + ship.radius > height){
        ship.position.setY(height - ship.radius);
        ship.velocity.setY(ship.velocity.getY()*-ship.bounce)
     }
     if(ship.position.getY() - ship.radius< 0){
        ship.position.setY(ship.radius);
        ship.velocity.setY(ship.velocity.getY()*-ship.bounce)
     } 
     
     
     requestAnimationFrame(update);
   }

 }
