//  Se crea la funcion distance y distanceXY, para determinar la hipotenusa entre dos puntos y así hacer un aplicativo.

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

      for(var i = 0; i < 200; i++){
          context.beginPath();
          context.fillStyle = "red";
          context.arc(utils.randomRange(0,width*0.33),
                      utils.randomRange(0,height),
                      utils.randomRange(10,40),
                      0,Math.PI*2,false);
          context.fill();

          context.beginPath();
          context.fillStyle = "green";
          context.arc(utils.randomRange(width*0.33,width*0.66),
                      utils.randomRange(0,height),
                      utils.randomRange(10,40),
                      0,Math.PI*2,false);
          context.fill();

          context.beginPath();
          context.fillStyle = "blue";
          context.arc(utils.randomRange(width*0.66,width),
                      utils.randomRange(0,height),
                      utils.randomRange(10,40),
                      0,Math.PI*2,false);
          context.fill();       
      }
    
};
    