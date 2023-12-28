// funcion que crea un circulo de radio constante el cual cambia su opacidad con respecto con una función seno

window.onload=function(){
var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  

   var centerY = height * 0.5,
  		centerX = width * 0.5,
      offset = 0.5,
      baseAlpha = 0.5,
      alpha = 0,
      speed = 0.05,
      angle = 0;
      
   render();
   
  function render(){
  
  	var alpha = baseAlpha+ Math.sin(angle) * offset;
    
    context.fillStyle = "rgba(0,0,0,"+alpha+")";
    context.clearRect(0,0,width,height);
    context.beginPath();
    context.arc(centerX,centerY,100,0,Math.PI*2,false);
    context.fill();
    
    angle += speed;
    requestAnimationFrame(render);
  }
 
}
