//  Se crea una distribución uniforme de puntos en elipse

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
      
    
    var centerX = width/2,
        centerY = height/2
        maxXRadius = 300,
        maxYRadius = 100;

   for (var i = 0; i < 1000; i++) {
    var xRadius = utils.randomRange(0, maxXRadius),
        yRadius = utils.randomRange(0, maxYRadius),
        angle = utils.randomRange(0, 2*Math.PI),
        x = centerX + Math.cos(angle)*xRadius,
        y = centerY + Math.sin(angle)*yRadius;

    // for (var i = 0; i < 100; i++) {
    //     var angle = utils.randomRange(0, 2*Math.PI),
    //         x = centerX + Math.cos(angle)*maxXRadius,
    //         y = centerY + Math.sin(angle)*maxYRadius;


    context.beginPath();
    context.arc(x,y,1,0,Math.PI*2,false);
    context.fill();
   }
};
    