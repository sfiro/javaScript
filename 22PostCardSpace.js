//  se crea un canvas con elementos en perpectiva que se acercan a la camara

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
    
    var fl = 300,
        shapes = [],
        numShapes = 100;

    for(var i = 0; i < numShapes; i++){
        var shape = {
            x: utils.randomRange(-1000,1000),
            y: utils.randomRange(-1000,1000),
            z: utils.randomRange(0,10000)
        };
        shapes.push(shape);
    }
    
    context.translate(width/2, height/2);

    update();

    function update(){
        context.clearRect(-width/2, -height/2, width, height);
        for(var i = 0; i < numShapes; i++){
            var shape = shapes[i];
            var perspective = fl/(fl+shape.z);

            context.save();
            context.translate(shape.x*perspective, shape.y*perspective);
            context.scale(perspective, perspective);
            context.fillRect(-100,-100,200,200);
            context.restore();

            shape.z -= 5;
            if(shape.z < 0){
                shape.z = 10000;
            }

        }
        requestAnimationFrame(update);

    }
    
}
    