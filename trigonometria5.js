// figura del lisajous al hacer mover el eje Y al doble de la velocidad del eje X 

window.onload=function(){
var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  

   var centerX = width/2,
       centerY=height/2,
       xRadius = 200,
       yRadius = 200,
       xSpeed = 0.1,
       ySpeed = 0.2,
       xangle = 0,
       yangle = 0,
       x,y;
      
   render();
   
  function render(){
 
    context.clearRect(0,0,width,height);
    x = centerX + Math.cos(xangle)*xRadius;
    y = centerY + Math.sin(yangle)*yRadius;
    context.beginPath();
    context.arc(x,y,10,0,Math.PI*2,false);
    context.fill();
    
    xangle += xSpeed;
    yangle += ySpeed;
    requestAnimationFrame(render);
  }
 
}
