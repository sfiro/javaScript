//  Se crea un objeto que rota alrededor de otro objeto
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
      },
      
      angleTo: function(p2){
      	return Math.atan2(p2.position.getY()- this.position.getY(), p2.position.getX()- this.position.getX());
      },
      distanceTo: function(p2){
      	var dx = p2.position.getX() - this.position.getX(),
        		dy = p2.position.getY() - this.position.getY();
            
            return Math.sqrt(dx*dx + dy*dy);
      },
      gravitateTo: function(p2){
      	var grav = vector.create(0,0),
        		dist = this.distanceTo(p2);
            
            grav.setLength(p2.mass/(dist*dist));
            grav.setAngle(this.angleTo(p2));
            
            this.velocity.addTo(grav);
      }
   
   };
   
   var sun =  particle.create(width/2,height/2,0,0),
   		 planet = particle.create(width/2 + 200,height/2,10, -Math.PI/2);
       
    sun.mass = 20000;
      
   update();
     
   
   
   function update(){
   	context.clearRect(0,0,width,height);
    
    planet.gravitateTo(sun);
    planet.update();
    
    context.beginPath();
    context.fillStyle =  "#ffff00";
    context.arc(sun.position.getX(),sun.position.getY(),20,0,Math.PI*2,false);
    context.fill();
    
    context.beginPath();
    context.fillStyle =  "#0000ff";
    context.arc(planet.position.getX(),planet.position.getY(),5,0,Math.PI*2,false);
    context.fill();
    
     
     
     requestAnimationFrame(update);
   }

 }
