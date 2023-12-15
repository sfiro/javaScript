//  Se crean multiples objetos que rota alrededor de otros objetos

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

    var results = [];

    for(var i = 0; i < 100; i++){
        results[i] = 0; 
    }
        
    update();
        
    function update(){

        addResult3Term();
        draw();
        requestAnimationFrame(update);
    }

    function addResult2Term(){
        var r0 = utils.randomRange(0,100),
            r1 = utils.randomRange(0,100),
            result = Math.floor((r0+r1)/2);
        results[result]++;
    }
    function addResult3Term(){
        var iterations = 3,
            total = 0;
        for(var i=0; i<iterations; i++){
            total += utils.randomRange(0,100);
        }
        result = Math.floor(total/iterations);
        results[result]++;
    }

    function draw(){
        var w = width/results.length;
        for (var i = 0; i <= results.length; i++) {
            var h = results[i]*-10;
            context.fillRect(w*i,height, w, h);
        }
    }
    
};
    