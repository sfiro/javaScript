//  Se crea una distribución uniforme de puntos de forma rectangular por la distribución de puntos aleatorios

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
    
    var centerX = width/2,
        centerY = height/2;

   for (var i = 0; i < 1000; i++) {
    var x = utils.randomRange(centerX-100, centerX+100),
        y = utils.randomRange(centerY-100, centerY+100);
    context.beginPath();
    context.arc(x,y,1,0,Math.PI*2,false);
    context.fill();
   }
};
    