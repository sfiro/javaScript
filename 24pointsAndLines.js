//  Linea graficada en perspectiva 3D formando una espiral ascendente. 

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
    		points = [],
        numPoints = 200,
        centerZ = 1000,
        radius = 1000,
        baseAngle = 0,
        rotationSpeed = 0.01;

    for(var i = 0; i < numPoints; i++){
        var point = {
            angle: 0.2 * i,
            y: 2000-4000/numPoints * i + Math.random() * 500
        };
        point.x = Math.cos(point.angle + baseAngle)*radius;
        point.z = centerZ + Math.sin(point.angle + baseAngle)*radius;
        points.push(point);
    }
    
    context.translate(width/2, height/2);
    context.font = "200px Arial";
    
    document.body.addEventListener("mousemove", function(event) {
      rotationSpeed = (event.clientX - width / 2) * 0.00005;
      ypos = (event.clientY - height / 2) * 2;
    });

    update();

    function update(){
    		baseAngle += rotationSpeed;
        context.clearRect(-width/2, -height/2, width, height);
        
        context.beginPath();
        for(var i = 0; i < numPoints; i++){
            var point = points[i],
                perspective = fl/(fl+point.z);

            context.save();
            context.scale(perspective, perspective);
            context.translate(point.x, point.y);
            
            if (i == 0){
            	context.moveTo(0,0);
            }
            else{
            	context.lineTo(0,0);
            }
    
            context.restore();
            point.x = Math.cos(point.angle + baseAngle) * radius;
            point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
        }
        context.stroke();
        requestAnimationFrame(update);
    }  
}
    
