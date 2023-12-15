//  Se crea una distribución uniforme de puntos de forma circular 

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
      
    
    var centerX = width/2,
        centerY = height/2
        maxRadius = 300;

   for (var i = 0; i < 1000; i++) {
    var radius = utils.randomRange(0, maxRadius),
        angle = utils.randomRange(0, 2*Math.PI),
        x = centerX + Math.cos(angle)*radius,
        y = centerY + Math.sin(angle)*radius;

    context.beginPath();
    context.arc(x,y,1,0,Math.PI*2,false);
    context.fill();
   }
};
    