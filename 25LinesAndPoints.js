//  puntos y lineas en 3D

window.onload=function(){
    var canvas = document.getElementById("canvas");
      context = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;
    
    var utils = {

      lerp: function(norm,min,max){
          // linear interpolation
          return (max-min)*norm + min;
      },

      norm: function(value,min,max){
          // normalize
          return (value-min)/(max-min);
      },

      map: function(value,sourceMin,sourceMax,destMin,destMax){
          // map a value from one range to another
          var n = utils.norm(value,sourceMin,sourceMax);
          return utils.lerp(n,destMin,destMax)
      },

      clamp: function(value,min,max){
          // clamp a value to a range
          if(value > Math.max(min,max)) return max;
          if(value < Math.min(min,max)) return min;
          return value;
          //return Math.min(Math.max(value,min),max);
      },

      distance: function(p0,p1){
          // distance between two points
          var dx = p1.x - p0.x,
              dy = p1.y - p0.y;
          return Math.sqrt(dx*dx+dy*dy)
      },

      distanceXY: function(x0,y0,x1,y1){
          // distance between two points
          var dx = x1-x0,
              dy = y1-y0;
          return Math.sqrt(dx*dx+dy*dy);
      },

      circleCollision: function(c0,c1){
          // circle collision detection
          return utils.distance(c0,c1) <= c0.radius +  c1.radius;
      },

      circlePointCollision: function(x,y,circle){
          // circle-point collision detection
          return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius; 
      },

      pointInRect: function(x,y,rect){
          // point-rectangle collision detection
          return utils.inRange(x,rect.x,rect.x+rect.width) && 
                 utils.inRange(y, rect.y, rect.y+rect.height);
      },

      inRange: function (value,min,max){
          // value in range
          return value >= Math.min(min,max) && value <= Math.max(min,max);
      },

      rangeIntersect: function(min0,max0,min1,max1){
          // range intersection
          return Math.max(min0, max0) >= Math.min(min1, max1) && 
                 Math.min(min0, max0) <= Math.max(min1, max1);
      },
      rectIntersect: function(r0, r1){
          // rectangle intersection
          return utils.rangeIntersect(r0.x, r0.x+r0.width, r1.x, r1.x+r1.width) &&
                 utils.rangeIntersect(r0.y, r0.y+r0.height, r1.y, r1.y+r1.height);
      },
      randomRange: function(min,max){
          // random range
          return min + Math.random()*(max-min);
      },
      randomInt: function(min,max){
          // random integer
          return Math.floor(min+Math.random()*(max-min+1));
      },
      degreesToRads: function(degrees){
          // degrees to radians
          return degrees/180*Math.PI;
      },
      radsToDegrees: function(radians){
          // radians to degrees
          return radians*180/Math.PI;
      },

      roundToPlaces: function(value, places){
          // round to places
          var mult = Math.pow(10,places);
          return Math.round(value*mult)/mult;
      },
      roundNearest: function(value,nearest){
          // round to nearest
          return Math.round(value/nearest)*nearest;
      },
      randomDist: function(min,max,iterations){
          var total = 0;

          for(var i=0; i<iterations; i++){
              total += utils.randomRange(min,max);
          }
          return total/iterations;
      },

  };
  
    
    var fl = 300,
    		points = [];
          
    context.translate(width/2, height/2);
    
    points[0] = {x:-500, y:-500, z:1000};
    points[1] = {x:500, y:-500, z:1000};
    points[2] = {x:500, y:-500, z:500};
    points[3] = {x:-500, y:-500, z:500};
    points[4] = {x:-500, y:500, z:1000};
    points[5] = {x:500, y:500, z:1000};
    points[6] = {x:500, y:500, z:500};
    points[7] = {x:-500, y:500, z:500};
    
    function project(){
    		for (var i = 0; i < points.length; i++){
        	var p = points[i], 
          	  scale = fl / (fl + p.z);
              
          p.sx = p.x * scale;
          p.sy = p.y * scale;
        }
    }
    
    function drawLine(){
      var p = points[arguments[0]];
     	context.moveTo(p.sx, p.sy);
      
      for(var i=1; i< arguments.length; i++){
      	p = points[arguments[i]];
        context.lineTo(p.sx,p.sy);
      }
    }

    update();

    function update(){ 
        context.clearRect(-width/2, -height/2, width, height);
        
        project();
        context.beginPath();
        drawLine(0,1,2,3,0);
        drawLine(4,5,6,7,4);
        drawLine(0,4);
        drawLine(1,5);
        drawLine(2,6);
        drawLine(3,7);
        context.stroke();

        requestAnimationFrame(update);

    }
 
    
}
    
