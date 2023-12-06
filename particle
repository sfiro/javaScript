//  se crea un objeto llamado particle, al cual se le define posicion y velocidad, esto facilita la creación de elementos

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
      
      create: function(x,y,speed,direction){
      		var obj = Object.create(this);
          obj.position = vector.create(x,y);
          obj.velocity = vector.create(0,0);
          obj.velocity.setLength(speed);
          obj.velocity.setAngle(direction);
          return obj;
      },
      
      update: function(){
      	 this.position.addTo(this.velocity);
      }
   
   };
   
   var position = vector.create(100,100),
   		 velocity = vector.create(0,0),
       p = particle.create(100,100,3,Math.PI/6);
       
   velocity.setLength(3);
   velocity.setAngle(Math.PI/6);
   
   update();
   
   function update(){
   	context.clearRect(0,0,width,height);
    
    p.update();
    
    context.beginPath();
    context.arc(p.position.getX(),p.position.getY(),10,0,Math.PI*2,false);
    context.fill();
    
    requestAnimationFrame(update);
   }

 }
