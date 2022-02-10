/**
 * @fileoverview Cena Simples Interativa com Câmaras Fixas
 * @author 20180811@isptec.co.ao (Budy Vieira)
 * @author 20171342@isptec.co.ao (Denise Teixeira)
 * @author 20181339@isptec.co.ao (Pérsida Baila)
 * @author 20180163@isptec.co.ao (Rafael Ngunga)
 */

var backupScene;

let scene, renderer, naveH, naveV;
var naveV1, naveV2;
var plano;
var menu;
var estado;
var start;
var play;

let listaNaveViloes = [];


let box, mesh;

let step2 = 0;
var tempo = 0;

let step = 0;
let timer = 0; //Para o movimento das naves inimigas
let aleatorio = 0.02;
let sentidoAleatorio = 1;

let velocidadeH;
let calculoIluminacaoAtivado = true;

/* Câmeras */
let camera, cameraLateral, cameraCima, cameraHeroi, camera360, cameraBall;
let time;
let canhaoH;
let iluminacao;

// Número de naves inimigas
const NAVE_INIMIGA = 7;

//Velocidade das balas
const VELOCIDADEH = 10;
const VELOCIDADEV = -20;

// Variavel que mantem o canhão selecionado
let canhaoSelecionado = null;

// Array contendo todas as bolas do Heroi
var ballsArrayH = [];

// Array contendo todas as bolas dos Vilões
var ballsArrayV = [];

let girar = false;
let moverCamera = false;



/**
 * Cria a Cena
 * @return {void}
 */

function createScene() {
  "use strict";
  scene = new THREE.Scene();
  velocidadeH = new THREE.Vector3();


  //const orbitCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

  // Câmera de cima
  cameraCima = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    1,
    7000
  );
  cameraCima.position.set(-200, 700, 0);
  cameraCima.lookAt(scene.position);
  cameraCima.zoom = 6;

  // Câmera dp Heroi

  cameraHeroi = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    1000
  );
  cameraHeroi.position.set(-200, 0, 0);
  cameraHeroi.lookAt(scene.position);
  cameraHeroi.zoom = 1;

  // Câmera lateral

  cameraLateral = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    6000
  );
  cameraLateral.position.set(0, 20, 400);
  cameraLateral.lookAt(scene.position);
  cameraLateral.zoom = 1;

  // Câmera que gira 360 a volta da cena

  camera360 = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    7000
  );
  camera360.position.set(0, 100, 500);
  camera360.lookAt(scene.position);
  camera360.zoom = 1;

  // Câmera que segue a bola na cena
  cameraBall = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  // Câmera a ser renderizada inicialmente
  camera = cameraCima;
  camera.zoom = 1;

  // Para orientação dos eixos
  const axesHelper = new THREE.AxesHelper(500);
  // scene.add(axesHelper);

  // Nave do Heroi
  naveH = new NaveHeroi("#001863", "#B8F3EC", "#001863");
  naveH.nave.position.set(-280, 0, 0);
  naveH.nave.rotateX(1.57079633);
  naveH.nave.rotateZ(-1.57079633);
  scene.add(naveH.nave);

  // Nave do Vilão
  createNavesInimigas();

  // Geração do Plano
  plano = new Plano();

  // Geração das Estrelas
  //  let estrelas = new Estrelas();

  //Adicionar velocidades aleatórioas às naves inimigas
  listaNaveViloes.forEach((element) => {
    //element.velocidade = 1 + Math.floor(Math.random() * 3);
    element.velocidadeZ =
      Math.ceil(Math.random() * 7) * (Math.round(Math.random()) ? 1 : 1);
    element.velocidadeY =
      Math.ceil(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1);
  });

  iluminacao = new Iluminacao();

  const controls = new OrbitControls(cameraLateral, renderer.domElement);

  
}
/**
 * Geração do Holofote
 * @return {THREE.Group} - o holofote
 */

/**
 * Geração da Nave do Heroi
 * @param  {color} corPrimaria - Cor do corpo da nave
 * @param  {color} corSecundaria- Cor da asa e do topo da nave
 * @param  {color} corTerciaria - Cor da base da nave
 * @return {THREE.Group} - A nave do heroi
 */

// Criação das naves inimigas
function createNavesInimigas() {
  for (let i = -4; i < NAVE_INIMIGA - 4; i++) {
    let naveV = new NaveVilao("#660606", "#b1b1b1", "#b1b1b1");
    //naveV.nave.tempoDisparo = Math.floor(Math.random() * (-1 - 1) + 1) * Math.abs(NAVE_INIMIGA-i);
    aux = Math.abs(i) % 2 == 0 ? 450 : 350;
    naveV.nave.position.set(aux, 0, i * 50);
    naveV.nave.rotateX(1.57079633);
    naveV.nave.rotateZ(1.57079633);
    scene.add(naveV.nave);
    listaNaveViloes.push(naveV);

    //naveV.nave.position.z = 0;

    const material1 = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const material2 = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const geometry = new THREE.BoxGeometry(10, 10, 10);

    const mesh = new THREE.Mesh(geometry, [material1, material2]);

    scene.add(mesh);
  }
}

/**
 * Funcão inicial
 * @return {void}
 */
function init() {
  "use strict";

   menu = new Menu();
   estado = new Status();
   start = new Start();
   play = true;

  // Criação da renderização
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // Criação da Cena
  createScene();

  // Renderização da Cena
  render();

  window.onkeydown = window.onkeyup = tecla;
}

let map = [];

// Global de velocidade
// velocidade
// função
// sentido = 1 aceleração positiva | sentido = -1 aceleração negativa
// acelerar = true -> aumentar módulo aceleração | acelerar = false reduzir módulo aceleração

function fVelocidade(veloc, velocidadeAtual, sentido, acelerar = true) {
  const MODULO_ACELERACAO = 0.6;
  const MODULO_TRAVAGEM = 0.6;
  const VMAX = veloc * sentido;

  var aceleracao = MODULO_ACELERACAO * sentido;
  var travagem = MODULO_TRAVAGEM * sentido;

  if (acelerar == false) {
    if (velocidadeAtual == 0) {
      return 0;
    }

    var v0, v1;
    v0 = velocidadeAtual;
    v1 = velocidadeAtual - travagem;

    // Verifica se as velocidades têm sinais diferentes
    // Se tiverem é porque a velocidade já passou pelo 0
    if (v1 * v0 < 0) {
      return 0;
    }

    return v1;
  }

  velocidadeAtual += aceleracao;

  if (Math.abs(velocidadeAtual) >= Math.abs(VMAX)) {
    return VMAX;
  }

  return velocidadeAtual;
}
/**
 * Comportamento ao pressionar e soltar a tecla
 * @param  {KeyEvent} e - Tecla pessionada
 * @return {void}
 */

// Classe da bola
class Bolas {
  constructor(velocidade_x, velocidade_y, colisao, tempo, removido) {
    /*         this.velocidade_x = velocidade_x;
            this.velocidade_y = velocidade_y;
            this.colisao = colisao;
            this.tempo = tempo;
            this.removido = removido; */

    this.ball = new THREE.Group();
    this.ball.userData = {
      velocidade_x: velocidade_x,
      velocidade_y: velocidade_y,
      colisao: colisao,
      tempo: tempo,
      removido: removido,
    };

    this.createBall(velocidade_x);
    this.box = this.getCompoundBoundingBox();
    //const helper = new THREE.Box3Helper(this.box, 0xffff00);
    //this.ball.add(helper);

    this.ball.traverse((object) => {
      object.castShadow = true;
      object.receiveShadow = true;
    });

    //atributos da bounding box, convertidos para o refencial da bola
    this.xMin;
    this.xMax;
    this.yMin;
    this.yMax;
    this.zMin;
    this.zMax;
  }

  createBall(velocidade) {
    const geometry = new THREE.SphereGeometry(10, 10, 10);
    let cor = "blue";

    if (velocidade === VELOCIDADEV)
      cor = "red";

    const material = new THREE.MeshBasicMaterial({ color: cor });
    const sphere = new THREE.Mesh(geometry, material);

    this.ball.add(sphere);

    return this.ball;
  }

  getCompoundBoundingBox() {
    var box = null;

    //Percorre todo o grafo do grupo nave
    //this.ball.traverse(function (obj3D) {
    //console.log(this.ball.children[0].geometry);
    var geometry = this.ball.children[0].geometry;
    if (geometry === undefined) {
      return;
    }

    geometry.computeBoundingBox();
    if (box === null) {
      box = geometry.boundingBox;
    } else {
      box.union(geometry.boundingBox);
    }
    //});

    //x min e x max
    box.min.x = -7;
    box.max.x = 7;

    //y min e y max
    box.max.y = 7;
    box.min.y = -7;

    //z min e z max
    box.max.z = 7;
    box.min.z = -7;

    return box;
  }
}


// Função que cria a bola (tiro)
function initBall(velocidade_x, velocidade_y) {
  const sphere = new Bolas(velocidade_x, velocidade_y, 0, 0, false);
  //sphere.userData = new Bolas(3, -2, 0, 0, false);
  return sphere;
}

function shoot(canhao) {
  let Ball = initBall(VELOCIDADEH, -5);

  if (canhao == null || canhao == naveH.canhaoB) {
    canhao = naveH.canhaoB;

    naveH.parte1B.material.color.set(0xffffff);
    naveH.parte1R.material.color.set("#001863");
    naveH.parte1L.material.color.set("#001863");

    Ball.ball.position.set(
      naveH.nave.position.x - canhao.position.x + 50,
      naveH.nave.position.y - canhao.position.y,
      naveH.nave.position.z - canhao.position.z + 20
    );
  } else if (canhao == naveH.canhaoL) {
    canhao = naveH.canhaoL;
    Ball.ball.position.set(
      naveH.nave.position.x - canhao.position.x + 85,
      naveH.nave.position.y - canhao.position.y + 50,
      naveH.nave.position.z - canhao.position.z - 35
    );
  } else {
    canhao = naveH.canhaoR;

    Ball.ball.position.set(
      naveH.nave.position.x - canhao.position.x + 45,
      naveH.nave.position.y - canhao.position.y + 50,
      naveH.nave.position.z - canhao.position.z + 5
    );
  }
  ballsArrayH.push(Ball.ball);
  scene.add(Ball.ball);
}

// Função para seguir a ultima bola

function followBall() {
  if (ballsArrayH.length > 0) {
    cameraBall.position.set(
      ballsArrayH[ballsArrayH.length - 1].position.x - 5,
      ballsArrayH[ballsArrayH.length - 1].position.y,
      ballsArrayH[ballsArrayH.length - 1].position.z
    );

    cameraBall.lookAt(ballsArrayH[ballsArrayH.length - 1].position);
    cameraBall.zoom = 1;
  }
}

function tecla(e) {
  "use strict";

  if (e.type == "keyup") {
    map[e.code] = false;
  } else {
    map[e.code] = true;

    // Impossível ir para cima e para baixo em simultâneo
    if (e.code == "ArrowUp") {
      map["ArrowDown"] = false;
    } else if (e.code == "ArrowDown") {
      map["ArrowUp"] = false;
    }

    // Impossível ir para a esquerda para a direita em simultâneo
    if (e.code == "ArrowLeft") {
      map["ArrowRight"] = false;
    } else if (e.code == "ArrowRight") {
      map["ArrowLeft"] = false;
    }

    // Verifica cada uma das opções possiveis
    switch (e.code) {
      case "Digit1": // Tecla 1
        iluminacao.onOffHolofote(1);
        break;
      case "Digit2": // Tecla 2
        iluminacao.onOffHolofote(2);
        break;
      case "Digit3": // Tecla 3
        iluminacao.onOffHolofote(3);
        break;
      case "Digit4": // Tecla 4
        iluminacao.onOffHolofote(4);
        break;
      case "Digit5": // Tecla 5
        camera = cameraCima;
        girar = false;
        moverCamera = false;
        break;
      case "Digit6": // Tecla 6
        cameraHeroi.position.z = naveH.nave.position.z;
        camera = cameraHeroi;
        girar = false;
        moverCamera = true;
        break;
      case "Digit7": // Tecla 7
        camera = cameraBall;
        girar = false;
        moverCamera = false;
        followBall();
        break;
      case "Digit8": // Tecla 8
        camera = camera360;

        girar = true;
        moverCamera = false;
        break;
      case "KeyN": // LetraN
        scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.material.wireframe = !node.material.wireframe;
          }
        });
        break;
      case "Digit0": // Tecla 0
        camera = cameraLateral;
        girar = false;
        moverCamera = false;
        break;
      case "Space": // Tecla Espaço
        //console.log("To shoot")
        shoot(canhaoSelecionado);
        break;
      case "KeyE":
        canhaoH = naveH.canhaoR;
        canhaoSelecionado = canhaoH;
        naveH.parte1R.material.color.set(0xffffff);
        naveH.parte1B.material.color.set("#001863");
        naveH.parte1L.material.color.set("#001863");
        break;
      case "KeyW":
        canhaoH = naveH.canhaoB;
        canhaoSelecionado = canhaoH;
        naveH.parte1B.material.color.set(0xffffff);
        naveH.parte1R.material.color.set("#001863");
        naveH.parte1L.material.color.set("#001863");
        //console.log(canhaoH.position);
        break;
      case "KeyQ":
        canhaoH = naveH.canhaoL;
        canhaoSelecionado = canhaoH;
        naveH.parte1L.material.color.set(0xffffff);
        naveH.parte1R.material.color.set("#001863");
        naveH.parte1B.material.color.set("#001863");
        break;
      case "KeyA":
        iluminacao.onOffGlobal();
        break;

      case "KeyD":
        iluminacao.onOffEsquerdaLP();
        break;
      case "KeyP":
        iluminacao.onOffDireitaLP();
        break;
      case "KeyM":
        //Mudar o material dos planos
        if (plano.isReflecting) {
          plano.mudarParaBasic();
          plano.isReflecting = false;
          calculoIluminacaoAtivado = false;
        } else {
          plano.ativarIluminacao();
          plano.isReflecting = true;
          calculoIluminacaoAtivado = true;
        }

        console.log(calculoIluminacaoAtivado);

        //Mudar o material da nave
        if (naveH.isReflecting) {
          naveH.mudarParaBasic();
          naveH.isReflecting = false;
        } else {
          naveH.resetMaterial();
          naveH.isReflecting = true;
        }

        //Mudar o material das naves dos vilões
        listaNaveViloes.forEach((object) => {
          if (object.isReflecting) {
            object.mudarParaBasic();
            object.isReflecting = false;
          } else {
            object.mudarParaPhongLambert();
            object.isReflecting = true;
          }
        });

        break;
      case "KeyK":
        //Só é possível alternar o tipo de sombreamento se o calculo da iluminação estiver ativado
        if (calculoIluminacaoAtivado) {
          //Alternar tipo de sombreamento dos planos
          if (plano.gouraudShader) {
            plano.changeToPhongShading();
            plano.gouraudShader = false;
            plano.phongShader = true;
          } else {
            plano.changeToGouraudShading();
            plano.gouraudShader = true;
            plano.phongShader = false;
          }

          //Alternar tipo de sombreamento da nave do heroi
          if (naveH.gouraudShader) {
            naveH.changeToPhongShading();
            naveH.gouraudShader = false;
            naveH.phongShader = true;
          } else {
            naveH.changeToGouraudShading();
            naveH.gouraudShader = true;
            naveH.phongShader = false;
          }

          //Alternar tipo de sombreamento das naves dos vilões
          listaNaveViloes.forEach((object) => {
            if (object.gouraudShader) {
              object.changeToPhongShading();
              object.phongShader = true;
              object.gouraudShader = false;
            } else {
              object.changeToGouraudShading();
              object.phongShader = false;
              object.gouraudShader = true;
            }
          });
        }
        break;
      case 'KeyS':
        if (menu.isPlaying == true) {
          menu.pause();
          menu.isPlaying = false;
        } else {
          menu.play();
          menu.isPlaying = true;
          animate();
        }

        break;
      default:
        //console.log(e.code);
        break;
    }
  }
}

/**
 * Rotacao da camera
 * @return {void}
 */
function rodarCamera() {
  let x = camera.position.x;
  let z = camera.position.z;
  let velocidade = 0.05;

  camera.position.x = x * Math.cos(velocidade) + z * Math.sin(velocidade);
  camera.position.z = z * Math.cos(velocidade) - x * Math.sin(velocidade);

  camera.lookAt(scene.position);
}

function detectarColisoes() {
  /** Converter os min e os maxs para o referencial do centro da cena**/
  naveH.zMin = naveH.nave.position.z - naveH.box.max.x;
  naveH.zMax = naveH.nave.position.z - naveH.box.min.x;
  naveH.xMax = naveH.nave.position.x - naveH.box.min.z;
  naveH.xMin = naveH.nave.position.x - naveH.box.max.z;
  naveH.yMax = naveH.nave.position.y - naveH.box.min.y;
  naveH.yMin = naveH.nave.position.y - naveH.box.max.y;

  //Converter os min e os max das naves dos inimigos, para o referencial da cena
  listaNaveViloes.forEach((element) => {
    element.zMin = element.nave.position.z - element.box.max.x;
    element.zMax = element.nave.position.z - element.box.min.x;
    element.xMax = element.nave.position.x - element.box.min.z;
    element.xMin = element.nave.position.x - element.box.max.z;
    element.yMax = element.nave.position.y - element.box.min.y + 12;
    element.yMin = element.nave.position.y - element.box.max.y + 45;
  });

  //Detectar colisões 2 a 2
  let qtdViloes = listaNaveViloes.length;
  for (let i = 0; i < qtdViloes - 1; i++) {
    let nave1 = listaNaveViloes[i];

    for (j = i + 1; j < qtdViloes; j++) {
      let nave2 = listaNaveViloes[j];

      naveV1 = nave1;
      naveV2 = nave2;

      //Se colisão no eixo z
      if (
        ((nave1.zMax >= nave2.zMin && nave1.zMax <= nave2.zMax) ||
          (nave1.zMin <= nave2.zMax && nave1.zMin >= nave2.zMin)) &&
        ((nave1.xMax >= nave2.xMin && nave1.xMax <= nave2.xMax) ||
          (nave1.xMin <= nave2.xMax && nave1.xMin >= nave2.xMin)) &&
        ((nave1.yMax >= nave2.yMin && nave1.yMax <= nave2.yMax) ||
          (nave1.yMin <= nave2.yMax && nave1.yMin >= nave2.yMin))
      ) {
        //Reagir

        //Vector de colisão
        let vCollision = {
          x: nave2.nave.position.z - nave1.nave.position.z,
          y: nave2.nave.position.y - nave1.nave.position.y,
        };

        //Comprimento do vector de colisão
        let distance = Math.sqrt(
          vCollision.x * vCollision.x + vCollision.y * vCollision.y
        );

        //Normalizar vector colisão
        let vCollisionNorm = {
          x: vCollision.x / distance,
          y: vCollision.y / distance,
        };

        //Velocidade relativa entre as naves que colidiram
        let vRelativeVelocity = {
          x: nave1.velocidadeZ - nave2.velocidadeZ,
          y: nave1.velocidadeY - nave2.velocidadeY,
        };
        let speed =
          vRelativeVelocity.x * vCollisionNorm.x +
          vRelativeVelocity.y * vCollisionNorm.y;

        if (speed < 0) {
          break;
        }

        nave1.velocidadeZ -= speed * vCollisionNorm.x;
        nave1.velocidadeY -= speed * vCollisionNorm.y;
        nave2.velocidadeZ += speed * vCollisionNorm.x;
        nave2.velocidadeY += speed * vCollisionNorm.y;
      }
    }
  }

  //Colisões nave do herói, parede
  /*if (naveH.zMin <= plano.planoEsquerdaBox.zMin) {
    naveH.nave.position.z = plano.planoEsquerdaBox.zMin;
  }*/
}

/**
 * Movimento das naves
 * @return {void}
 */
 function mover() {
  if (map["ArrowUp"] || map["ArrowDown"]) {
    sentido = map["ArrowUp"] ? 1 : -1;
    velocidadeH.setX(fVelocidade(VELOCIDADEH,velocidadeH.x, sentido));
  } else {
    let sentido = velocidadeH.y > 0 ? 1 : -1;
    velocidadeH.setX(fVelocidade(VELOCIDADEH,velocidadeH.x, sentido, false));
  }

  if (map["ArrowLeft"] || map["ArrowRight"]) {
    let sentido = map["ArrowRight"] ? 1 : -1;
    velocidadeH.setZ(fVelocidade(VELOCIDADEH,velocidadeH.z, sentido));
  } else {

    let sentido = velocidadeH.z > 0 ? 1 : -1;
    velocidadeH.setZ(fVelocidade(VELOCIDADEH,velocidadeH.z, sentido, false));
  }
}


// Geração das balas do Vilao
function ballV() {
  var maximum = 6;
  var minimum = 0;
  var randomnumber;
  do{
    randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  } while(listaNaveViloes[randomnumber].nave.removido);

  let Ball = initBall(VELOCIDADEV,-5);
  Ball.ball.position.set(listaNaveViloes[randomnumber].nave.position.x - listaNaveViloes[randomnumber].canhaoC.position.x - 40,
                      naveH.nave.position.y - naveH.canhaoB.position.y + 30,
                      listaNaveViloes[randomnumber].nave.position.z - listaNaveViloes[randomnumber].canhaoC.position.z);
  ballsArrayV.push(Ball.ball);

  for (let i = 0; i < ballsArrayV.length; i++)
    if (!ballsArrayV[i].userData.removido)
      scene.add(ballsArrayV[i]);
     
}

//Movimento das bolas dos vilões
function moveBallV(){
  

  for (let i = 0; i < ballsArrayV.length; i++) {
      
      ballsArrayV[i].rotateX += ballsArrayV[i].userData.velocidade_x;
      if (ballsArrayV[i].position.x > -400 && ballsArrayV[i].userData.velocidade_x === VELOCIDADEV && !ballsArrayV[i].userData.removido) {
        
          ballsArrayV[i].position.x += fVelocidade(VELOCIDADEV,ballsArrayV[i].userData.velocidade_x, 1);

      } else if (ballsArrayV[i].position.x < -395 && ballsArrayV[i].userData.velocidade_x === VELOCIDADEV && !ballsArrayV[i].userData.removido) {
          
          ballsArrayV[i].position.x += fVelocidade(VELOCIDADEV,ballsArrayV[i].userData.velocidade_x, 1);

          ballsArrayV[i].userData.velocidade_x = 3;   

      } else if (ballsArrayV[i].userData.velocidade_x === 3 && !ballsArrayV[i].userData.removido) {

          ballsArrayV[i].position.x += fVelocidade(VELOCIDADEV,ballsArrayV[i].userData.velocidade_x, -1, false);
          ballsArrayV[i].position.y += fVelocidade(VELOCIDADEV,ballsArrayV[i].userData.velocidade_y, -1, false); 

      } 
      
      if (ballsArrayV[i].position.y <= -90 && !ballsArrayV[i].userData.removido) {
          ballsArrayV[i].userData.velocidade_x = 0;               
      } 

      if (ballsArrayV[i].position.y <= -90 ) {
        setInterval(function () {
          timeCounterV(i)
        }, 1000);
  
        if (ballsArrayV[i].userData.tempo >= 3 && !ballsArrayV[i].userData.removido) {
          scene.remove(ballsArrayV[i]);
          ballsArrayV[i].userData.removido = true;
        }
      }
     


      /** Converter os min e os maxs para o referencial do centro da cena**/
    //console.log(ballsArrayV[i].children[0].geometry.boundingBox.max)
    ballsArrayV[i].zMin = ballsArrayV[i].position.z - ballsArrayV[i].children[0].geometry.boundingBox.max.x
    ballsArrayV[i].zMax = ballsArrayV[i].position.z - ballsArrayV[i].children[0].geometry.boundingBox.min.x
    ballsArrayV[i].xMax = ballsArrayV[i].position.x - ballsArrayV[i].children[0].geometry.boundingBox.min.z
    ballsArrayV[i].xMin = ballsArrayV[i].position.x - ballsArrayV[i].children[0].geometry.boundingBox.max.z
    ballsArrayV[i].yMax = ballsArrayV[i].position.y - ballsArrayV[i].children[0].geometry.boundingBox.min.y
    ballsArrayV[i].yMin = ballsArrayV[i].position.y - ballsArrayV[i].children[0].geometry.boundingBox.max.y

    for (let j = i + 1; j < ballsArrayV.length; j++) {
      distance_x = Math.abs(ballsArrayV[i].position.x - ballsArrayV[j].position.x);
      distance_y = Math.abs(ballsArrayV[i].position.y - ballsArrayV[j].position.y);
      distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y);

      if (distance <= 10) { // Raio da esfera é 5 portanto, Ra + Rb >= d 
        ballsArrayV[i].colisao = 1;
        ballsArrayV[i].userData.velocidade_x *= -1;
        ballsArrayV[i].userData.velocidade_y *= -1;
      }

      //window.console.log(distance)

    }

    
      let bola = ballsArrayV[i];
      let nave = naveH;

   // console.log("Bola xMax: " + bola.xMax + " >= " + "Nave xMin: " + nave.xMin + " <==> " + "Bola xMax: " + bola.xMax + " <= " + "Nave xMax: " + nave.xMax);
    //console.log("Bola yMax: " + bola.yMax + " >= " + "Nave yMin: " + nave.yMin + " <==> " + "Bola yMin: " + bola.yMin + " <= " + "Nave yMax: " + nave.yMax);
    //console.log("Bola zMax: " + bola.zMax + " >= " + "Nave zMin: " + nave.zMin + " <==> " + "Bola zMax: " + bola.zMax + " <= " + "Nave zMax: " + nave.zMax);

      if (!bola.userData.removido && !nave.nave.removido) {
        if ((bola.xMax >= nave.xMin && bola.xMin <= nave.xMax) && 
            (bola.zMax >= nave.zMin && bola.zMin <= nave.zMax) &&
            (bola.yMax >= nave.yMin && bola.yMin <= nave.yMax)) {
          nave.nave.userData.vida -= 1;
          scene.remove(bola);
          bola.userData.removido = true;
          if (nave.nave.userData.vida <= 0) {
            /*scene.remove(nave);
            scene.remove(nave.nave);
            nave.nave.removido = true;*/
            alert("Morreste!!");
            location.reload();
          }
        }
      }

  
      
  }
}



// Movimento das balas do Heroi
function ballMov() {
  for (let i = 0; i < ballsArrayH.length; i++) {
    ballsArrayH[i].rotateX += ballsArrayH[i].userData.velocidade_x;
    if (ballsArrayH[i].position.x < 500 && ballsArrayH[i].userData.velocidade_x === VELOCIDADEH && !ballsArrayH[i].userData.removido) {

      ballsArrayH[i].position.x += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_x, 1);

      if (camera == cameraBall) {
        camera.position.x += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_x - 1, 1);
      }

    } else if (ballsArrayH[i].position.x > 500 && ballsArrayH[i].userData.velocidade_x === VELOCIDADEH && !ballsArrayH[i].userData.removido) {

      ballsArrayH[i].position.x += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_x, 1);

      if (camera == cameraBall) {
        camera.position.x += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_x - 1, 1);
      }
      ballsArrayH[i].userData.velocidade_x = -3;

    } else if (ballsArrayH[i].userData.velocidade_x === -3 && !ballsArrayH[i].userData.removido) {

      ballsArrayH[i].position.x += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_x, -1, false);
      ballsArrayH[i].position.y += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_y, -1, false);

      if (camera == cameraBall) {
        camera.position.x += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_x + 1, -1);
        camera.position.y += fVelocidade(VELOCIDADEH,ballsArrayH[i].userData.velocidade_y + 1, -1);
      }

    }

    if (ballsArrayH[i].position.y <= -90 && !ballsArrayH[i].userData.removido) {
      ballsArrayH[i].userData.velocidade_x = 0;
    }

    if (ballsArrayH[i].position.y > 90 && ballsArrayH[i].colisao == 1) {
      ballsArrayH[i].userData.velocidade_y *= -1;
    }

    if (ballsArrayH[i].position.x < -100 && ballsArrayH[i].colisao == 1) {
      ballsArrayH[i].userData.velocidade_x *= -1;
    }


    if (ballsArrayH[i].position.y <= -90) {
      setInterval(function () {
        timeCounter(i)
      }, 3000);

      if (ballsArrayH[i].userData.tempo >= 3 && !ballsArrayH[i].userData.removido) {
        scene.remove(ballsArrayH[i]);
        ballsArrayH[i].userData.removido = true;
      }
    }


    /** Converter os min e os maxs para o referencial do centro da cena**/
    // console.log(ballsArrayH[i].children[1])
    ballsArrayH[i].zMin = ballsArrayH[i].position.z - ballsArrayH[i].children[0].geometry.boundingBox.max.x
    ballsArrayH[i].zMax = ballsArrayH[i].position.z - ballsArrayH[i].children[0].geometry.boundingBox.min.x
    ballsArrayH[i].xMax = ballsArrayH[i].position.x - ballsArrayH[i].children[0].geometry.boundingBox.min.z
    ballsArrayH[i].xMin = ballsArrayH[i].position.x - ballsArrayH[i].children[0].geometry.boundingBox.max.z
    ballsArrayH[i].yMax = ballsArrayH[i].position.y - ballsArrayH[i].children[0].geometry.boundingBox.min.y
    ballsArrayH[i].yMin = ballsArrayH[i].position.y - ballsArrayH[i].children[0].geometry.boundingBox.max.y

    for (let j = i + 1; j < ballsArrayH.length; j++) {
      distance_x = Math.abs(ballsArrayH[i].position.x - ballsArrayH[j].position.x);
      distance_y = Math.abs(ballsArrayH[i].position.y - ballsArrayH[j].position.y);
      distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y);

      if (distance <= 10) { // Raio da esfera é 5 portanto, Ra + Rb >= d 
        ballsArrayH[i].colisao = 1;
        ballsArrayH[i].userData.velocidade_x *= -1;
        ballsArrayH[i].userData.velocidade_y *= -1;
      }

      //window.console.log(distance)

    }



    for (let j = 0; j < listaNaveViloes.length; j++) {
      let bola = ballsArrayH[i];
      let nave = listaNaveViloes[j];
      if (!bola.userData.removido && !nave.nave.removido) {
        if ((bola.xMax >= nave.xMin && bola.xMax <= nave.xMax) && (bola.yMax >= nave.yMin && bola.yMax <= nave.yMax)
          && (bola.zMax >= nave.zMin && bola.zMax <= nave.zMax)) {
          nave.nave.userData.vida -= 1;
          scene.remove(bola);
          bola.userData.removido = true;

          if (nave.nave.userData.vida <= 0) {
            nave.nave.removido = true;
            scene.remove(nave.nave);
            scene.remove(nave);   
          }
        }
      }


    }
  }
}

function timeCounter(i) {
  ballsArrayH[i].userData.tempo++;
}

function timeCounterV(i) {
  ballsArrayV[i].userData.tempo++;
}

// choque bola - bola
function manage_bounce(ball, ball2) {
  /* dx = ball.position.x-ball2.position.x;
  dy = ball.position.y-ball2.position.y;
  collisionision_angle = Math.atan2(dy, dx);
  magnitude_1 = Math.sqrt(ball.userData.velocidade_x*ball.userData.velocidade_x
                         +ball.userData.velocidade_y*ball.userData.velocidade_y);
  magnitude_2 = Math.sqrt(ball2.userData.velocidade_x*ball2.userData.velocidade_x
                         +ball2.userData.velocidade_y*ball2.userData.velocidade_y);
  direction_1 = Math.atan2(ball.userData.velocidade_y, ball.userData.velocidade_x);
  direction_2 = Math.atan2(ball2.userData.velocidade_y, ball2.userData.velocidade_x);
  new_xspeed_1 = magnitude_1*Math.cos(direction_1-collisionision_angle);
  new_yspeed_1 = magnitude_1*Math.sin(direction_1-collisionision_angle);
  new_xspeed_2 = magnitude_2*Math.cos(direction_2-collisionision_angle);
  new_yspeed_2 = magnitude_2*Math.sin(direction_2-collisionision_angle);
  final_xspeed_1 = (new_xspeed_1*new_xspeed_2);
  final_xspeed_2 = (new_xspeed_1*new_xspeed_2);
  final_yspeed_1 = new_yspeed_1;
  final_yspeed_2 = new_yspeed_2;
  ball.xspeed = Math.cos(collisionision_angle)*final_xspeed_1+Math.cos(collisionision_angle+Math.PI/2)*final_yspeed_1;
  ball.yspeed = Math.sin(collisionision_angle)*final_xspeed_1+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_1;
  ball2.xspeed = Math.cos(collisionision_angle)*final_xspeed_2+Math.cos(collisionision_angle+Math.PI/2)*final_yspeed_2;
  ball2.yspeed = Math.sin(collisionision_angle)*final_xspeed_2+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_2; */
}


//Contar número de inimigos

function countInimigos(listaInimigos) {
  var inimigos = 0;
  for (let i = 0; i < listaInimigos.length; i++){
    if (!listaInimigos[i].nave.removido)
      inimigos++;
  }
  return inimigos;
}


function apagar() {

scene = undefined
renderer = undefined
naveH = undefined
naveV = undefined
naveV1 = undefined
naveV2 = undefined
plano = undefined;
estado = undefined;
play = undefined;

listaNaveViloes = [];


box = undefined
mesh = undefined;
step2 = 0;


step = 0;
timer = 0; //Para o movimento das naves inimigas
aleatorio = 0.02;
sentidoAleatorio = 1;

velocidadeH = undefined;
calculoIluminacaoAtivado = true;

/* Câmeras */
camera = undefined
cameraLateral = undefined 
cameraCima = undefined 
cameraHeroi = undefined 
camera360 = undefined 
cameraBall = undefined;
time = undefined;
canhaoH = undefined;
iluminacao = undefined;



// Variavel que mantem o canhão selecionado
canhaoSelecionado = null;

// Array contendo todas as bolas do Heroi
ballsArrayH = [];

// Array contendo todas as bolas dos Vilões
ballsArrayV = [];

girar = false;
moverCamera = false;
}




/**
 * Animação das naves
 * @return {void}
 */
function animate() {
 
  
  if (menu.isPlaying == false) {
    return;
  } 

  if (menu.reload){
    menu.reload = false;
    
    //init();
    //animate();
  }

  ballMov();
  //Movimento da bola do vilão
  if (ballsArrayV.length > 0)
    moveBallV();

  //Impedir as naves de chegar aos limites da cena

  listaNaveViloes.forEach((element) => {
    element.nave.position.z += element.velocidadeZ;
    //element.nave.position.y += element.velocidadeY;

    //console.log(timer);
    if (timer == 10) {
      aleatorio = Math.random() * (0.02 + 0.02) - 0.02;
      if (aleatorio < 0) {
        sentidoAleatorio = -1;
      } else {
        sentidoAleatorio = 1;
      }
      //aleatorio = (Math.round(Math.random()) ? - 0.02 : 0.02);
      //console.log(aleatorio);
    }
    //element.velocidadeAtual.setY(element.arrancar(element.velocidadeAtual.y, sentidoAleatorio, 0));
    //element.velocidadeAtual.setZ(element.arrancar(element.velocidadeAtual.z, sentidoAleatorio, 0));
    //element.nave.position.add(element.velocidadeAtual);

    if (element.nave.position.z <= plano.planoEsquerdaBox.zMin || element.nave.position.z >= plano.planoDireitaBox.zMin - 5) {
      if (element.nave.position.z <= plano.planoEsquerdaBox.zMin) {
        element.nave.position.z = plano.planoEsquerdaBox.zMin;
      } else if (element.nave.position.z >= plano.planoDireitaBox.zMin - 5) {
        element.nave.position.z = plano.planoDireitaBox.zMin - 5
      }
      element.velocidadeZ = -element.velocidadeZ;
    }

    if (element.nave.position.y < -100 || element.nave.position.y > 350) {
      if (element.nave.position.y < -100) {
        element.nave.position.y = -100;
      } else if (element.nave.position.y > 350) {
        element.nave.position.y = 350;
      }
      element.velocidadeY = -element.velocidadeY;
    }


  })
  //Se a nave do heroi chegar no limite direito
  if (naveH.zMax >= plano.planoDireitaBox.zMin) {
    velocidadeH.setZ(-1);
  }

  //Se a nave do heroi chegar no limite esquerdo
  if (naveH.zMin <= plano.planoEsquerdaBox.zMax) {
    velocidadeH.setZ(1);
  }

  //Se a nave do herói chegar em x = 0
  if (naveH.xMax >= -10) {
    velocidadeH.setX(-1);
  } 

  //Se a nave do herói chegar no limite de trás
  if (naveH.xMin <= -500) {
    velocidadeH.setX(1);
  }

 

  naveH.nave.position.add(velocidadeH);
  if (moverCamera) {
    camera.position.add(velocidadeH);
  }
  mover();

  if (girar) {
    rodarCamera();
  }
  render();
  requestAnimationFrame(animate);

  step += 0.1;
  step2 += 3;

  //box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );
  detectarColisoes();

  if (timer > 0)
  estado.init(naveH.nave.userData.vida, countInimigos(listaNaveViloes));

  if (timer > 0)
  estado.init(tempo,naveH.nave.userData.vida, countInimigos(listaNaveViloes));

  timer = (timer + 1) % 11;
  
  if (countInimigos(listaNaveViloes) == 0 && listaNaveViloes.length > 0){
    listaNaveViloes = [];
    console.log(listaNaveViloes.length)
    alert("Parabens");
    location.reload();
  }

  if (!start.inicio) {
    menu.pause(true);
    menu.isPlaying = false;
    start.inicio = true;
  }
  

}

/**
 * Renderização da cena
 * @return {void}
 */
function render() {
  "use strict";
  renderer.render(scene, camera);
}


setInterval(function() {
  if (menu.isPlaying) {
    ballV(); // tiro dos vilões
    tempo++;
  }
  
 }, 1000);