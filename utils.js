// Desc: utility functions

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
        var n = norm(value,sourceMin,sourceMax);
        return lerp(n,destMin,destMax)
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
        return distance(c0,c1) <= c0.radius +  c1.radius;
    },

    circlePointCollision: function(x,y,circle){
        // circle-point collision detection
        return distanceXY(x, y, circle.x, circle.y) < circle.radius; 
    },

    pointInRect: function(x,y,rect){
        // point-rectangle collision detection
        return inRange(x,rect.x,rect.x+rect.width) && 
               inRange(y, rect.y, rect.y+rect.height);
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
        return rangeIntersect(r0.x, r0.x+r0.width, r1.x, r1.x+r1.width) &&
               rangeIntersect(r0.y, r0.y+r0.height, r1.y, r1.y+r1.height);
    }
};