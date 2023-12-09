
/**
 * Objeto "particle" que representa una partícula.
 * @property {Object} position - La posición de la partícula.
 * @property {Object} velocity - La velocidad de la partícula.
 * @property {Object} gravity - La gravedad aplicada a la partícula.
 * @property {number} mass - La masa de la partícula.
 * @property {number} radius - El radio de la partícula.
 * @property {number} bounce - El coeficiente de restitución de la partícula.
 */

var particle = {
    position: null,
    velocity: null,
    gravity: null,
    mass: 1,
    radius: 0,
    bounce: -1,

    create: function(x,y,speed,direction,grav){
        var obj = Object.create(this);
        obj.position = vector.create(x,y);
        obj.velocity = vector.create(0,0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0,grav || 0);
        return obj;
    },

    accelerate: function(accel){
        this.velocity.addTo(accel);
    },

    update: function(){
        this.velocity.addTo(this.gravity)
        this.position.addTo(this.velocity)
    }

}