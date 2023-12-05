//  Se crea una flecha la cual apunta al cursor del mouse ( se usa la función ATAN2 la cual calcula el angulo que debe rotar la flecha)  IMPORTANTE se debe usar ATAN2 <<-- esta función entrega el angulo adecuado en los 360 grados

window.onload=function(){
var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  

   var arrowX = width/2,
   		 arrowY = height/2,
       dx, dy,
       angle = 0;
   
   render();
   
   function render(){
   		context.clearRect(0,0,width,height);
    	context.save();
      context.translate(arrowX,arrowY);
      context.rotate(angle);
      
      context.beginPath();
      context.moveTo(20,0);
      context.lineTo(-20,0);
      context.moveTo(20,0);
      context.lineTo(10,-10);
      context.moveTo(20,0);
      context.lineTo(10,10);
      context.stroke();
      
      context.restore();
      requestAnimationFrame(render);
   } 
   
   document.body.addEventListener("mousemove",
    function(event){
   		dx = event.clientX - arrowX;
      dy = event.clientY - arrowY;
      angle = Math.atan2(dy,dx);
   });
 }
