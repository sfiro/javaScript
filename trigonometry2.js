//funcion que cambia dinamicamente el radio de un circulo, desde cero hasta un valor determinado

window.onload=function(){
var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth,
  height = canvas.height = window.innerHeight;
  
  
   var centerY = height * 0.5,
  		centerX = width * 0.5,
      offset = height * 0.4,
      baseRadius = 0,
      speed = 0.05,
      radius = 0,
      angle = 0;
  
  render();
  
  function render(){
  	var radius = baseRadius+ Math.abs(Math.sin(angle)) * offset;
    
    context.clearRect(0,0,width,height);
    context.beginPath();
    context.arc(centerX,centerY,radius,0,Math.PI*2,false);
    context.fill();
    
    angle += speed;
    requestAnimationFrame(render);
  }

}
