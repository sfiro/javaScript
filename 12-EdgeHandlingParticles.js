//  Se crea las particulas saliendo expulsada de un punto comun pero volviendo a entrar en los limites de la simulacion, por el edge handling definido 
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
   
   var particles=[];
   
   for(var i=0;i < 100;i += 1){
   	var p = particle.create(width/2,height/2,Math.random()*5+2,Math.random()*2*Math.PI,0);
    	p.radius = 10;
      particles.push(p);
   }
   
   update();

   function update(){
   	context.clearRect(0,0,width,height);
     
       for(var i=0;i < particles.length;i += 1){
         var p = particles[i];
          p.update();
          context.beginPath();
          context.arc(p.position.getX(),p.position.getY(),p.radius,0,Math.PI*2,false);
          context.fill();

          if(p.position.getX()-p.radius > width){
              p.position.setX(-p.radius);
           }
           if(p.position.getX() + p.radius < 0){
              p.position.setX(width + p.radius);
           }
           if(p.position.getY() - p.radius > height){
              p.position.setY(-p.radius);
           }
           if(p.position.getY() + p.radius< 0){
              p.position.setY(height+p.radius);
           } 
       }
       requestAnimationFrame(update);
   }

 }
