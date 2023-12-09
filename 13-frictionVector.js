//  Se crea un objeto que será dirigido hacia una dirección manejado por el teclado. y se adiciona dentro de los limites de la pantalla, opciones para que aparezca del otro lado solo y cuando se haya superado el radio del objeto

window.onload=function(){
var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
   
   var ship = particle.create(width/2,height/2,10,Math.random()*Math.PI*2,0),
   		thrust = vector.create(0,0),
      friction = vector.create(0.15,0);
   
    ship.radius=10;
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
   
   //se agrega la reacción de la fricción sobre el objeto
   function update(){
   	context.clearRect(0,0,width,height);
     ship.accelerate(thrust);
     ship.update();
     
     friction.setAngle(ship.velocity.getAngle());
     
     if(ship.velocity.getLength() > friction.getLength()){
     		ship.velocity.subtractFrom(friction);
     }
     else{
     		ship.velocity.setLength(0);
     }
 
     //console.log(ship.position.getX(),ship.position.getY())
     
     context.beginPath();
     context.arc(ship.position.getX(),ship.position.getY(),ship.radius,0,Math.PI*2,false);
     context.fill();

   
     
     requestAnimationFrame(update);
   }

 }
