// grafica una funcion seno y muestra por la consola los valores asociados a la amplitud por cada
// iteración

window.onload=function(){
var canvas = document.getElementById("canvas");
  context = canvas.getContext("2d"),
          width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight;
 
  context.translate(0,height/2);
  context.scale(1,-1);
  for(var angle=0; angle< Math.PI*4; angle += 0.01){
    var x = angle*150, y =Math.sin(angle)*100;
    console.log(Math.sin(angle)*50);
    context.fillRect(x,y,5,5);
  }
}
