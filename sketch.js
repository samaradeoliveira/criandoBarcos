//importação de módulos
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//variáveis
var engine, world, backgroundImg, boat;
var canvas, angle, tower, ground, cannon;

//declaração da matriz para balas
var balls = [];

//declaração de matriz para barcos 
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  //chamar a função showBoats aqui embaixo, aluno


  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}



//analisar function para criação de barcos
/*function showBoats() {
  //se tiver algo na matriz do barco
  if (boats.length > 0) {
    if ( 
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300 
    ) {
      //definindo posições
      var positions = [-40, -60, -70, -20];
      //sorteio de posição para o barco
      var position = random(positions);
      //criando barco
      var boat = new Boat(width, height - 100, 170, 170, position);
      //adicionando ele na matriz
      boats.push(boat);
    }
    //for para exibir os barcos que estão na matriz
    for (var i = 0; i < boats.length; i++) {

      if (boats[i]) {
        //aplicando velocidade a cada barquinho
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
      }
    }
    //se não tiver nada na matriz do barco
  } else { 
    //criando barco adicionando na matriz
    var boat = new Boat(width, height - 60, 170, 170, -60);
    boats.push(boat);
  }
}*/

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
