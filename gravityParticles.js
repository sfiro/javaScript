//  Se agrega el parametro gravedad a la función particle, el cual debe ingresarse como un valor escalar, aquí se implementa con las explosiones definidas en puntos aleatorios de la pantalla

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
   
   var p = particle.create(100,height, 10,-Math.PI/2),
   	 	 gravity = vector.create(0, 0.2),
       particles = [],
       numParticles = 100,
       x,y,
       grav = 0.1;
    
    x = Math.random()*width;
    y = Math.random()*height;
       
   for (var i=0;i<numParticles; i += 1){
   		particles.push(particle.create(x, y, Math.random()*5+2, Math.random()*Math.PI*2,grav));
   }
   
   update();
   
   function update(){
   	context.clearRect(0,0,width,height);
    for (var i=0;i<numParticles; i += 1){
   		p = particles[i];	
    	p.update();
      context.beginPath();
      context.arc(p.position.getX(),p.position.getY(),3,0,Math.PI*2,false);
      context.fill();
    }
    requestAnimationFrame(update);
   }

 }
