//  Se crea un rectangulo del cual no se puede escapar un circulo, se usa la funcion clamp la cual restringe a los limites max y min una variable

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
   
   var rect = {
   			x: width/2 - 200,
        y: height/2 - 150,
        width:400,
        height:300
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
   
   document.body.addEventListener("mousemove",function(event){
   		var x = clamp(event.clientX,rect.x, rect.x+rect.width),
      		y = clamp(event.clientY,rect.y, rect.y+rect.height);
          
      context.clearRect(0,0,width,height);
      context.fillStyle = "#cccccc";
      context.fillRect(rect.x-10, rect.y-10, rect.width+20, rect.height+20);
      context.fillStyle = "#000000";
      context.beginPath();
      context.arc(x,y,10,0,Math.PI*2,false);
      context.fill();
      
   });
   
 

 }
