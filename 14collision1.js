//  se crea las funciones distancia y distanciaXY, para verificar la colisión entre dos objetos. En este caso se crea un circulo aleatorio y cuando el mouse entra en su area de acción entonces cambia de color

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
   
   function distance(p0,p1){
   		var dx = p1.x - p0.x,
      		dy = p1.y - p0.y;
      return Math.sqrt(dx*dx+dy*dy)
   }
   
   function distanceXY(x0,y0,x1,y1){
   		var dx = x1-x0,
      		dy = y1-y0;
      return Math.sqrt(dx*dx+dy*dy);
   }
   
   
   function circleCollision(c0,c1){
   		return distance(c0,c1) <= c0.radius +  c1.radius;
   }
   
   function circlePointCollision(x,y,circle){
   		return distanceXY(x,y, circle.x,circle.y) < circle.radius; 
   }
   
   var circle = {
   		x: Math.random()*width,
      y: Math.random()*height,
      radius: 50+Math.random()*100
   };
   
   document.body.addEventListener("mousemove",function(event){
   		if (circlePointCollision(event.clientX,event.clientY,circle)){
      		context.fillStyle = "#f66";
      }
      else {
      		context.fillStyle = "#999";
      }
      context.clearRect(0,0,width, height);
      context.beginPath();
      context.arc(circle.x,circle.y,circle.radius,0,Math.PI*2,false);
      context.fill();
   })

 }
