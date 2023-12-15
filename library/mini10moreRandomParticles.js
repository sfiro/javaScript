//  Se crea una animación de particulas que parten de un centro con velocidades y direcciones aleatorias 

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
      
    
    var particles = [];

    // particulas con velocidad en X y Y definida en un rango rectangular
//    for (var i = 0; i < 200; i++) {
//         var p = particle.create(width/2, height/2, 0, 0);
//         p.vx = utils.randomRange(-1, 1);
//         p.vy = utils.randomRange(-1, 1);    
//         particles.push(p);
//    };

    for (var i = 0; i < 200; i++) {
        var p = particle.create(width/2, height/2, 0, 0,0.1);
        p.setSpeed(utils.randomRange(0, 10));
        p.setHeading(utils.randomRange(0, Math.PI*2));    
        particles.push(p);
    };

    update();

    function update(){
        context.clearRect(0,0,width,height);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.update();
            context.beginPath();
            context.arc(p.x,p.y,3,0,Math.PI*2,false);
            context.fill();
        };

        requestAnimationFrame(update);
    }


};
    