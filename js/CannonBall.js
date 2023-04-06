class CannonBall {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    //matriz trajetória aula c24
    //guarda o rastro da bala
    this.trajectory = [];
    World.add(world, this.body);
  }

  shoot() {
    var newAngle = cannon.angle - 28;
    newAngle = newAngle * (3.14 / 180)
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)
    });
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();

    //atividade adicional aula c24.

    //para pegar o rastro da bala de cahaão em movimento e guardar na matriz trajetória
    if (this.body.velocity.x > 0 && pos.x > 210) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }

    //percorre a matriz trajetória para colocar imagem em cada rastro com tamanho 5,5
    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
