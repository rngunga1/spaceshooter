/**
 * Geração do Plano
 * @return {void}
 */
class Plano {
  constructor() {
    this.largura = 1500;
    this.altura = 200;
    this.monalisa = new THREE.TextureLoader().load("./assets/monalisa.jpg");
    this.o_grito = new THREE.TextureLoader().load("./assets/o_grito.jpg");
    this.chaoBase = new THREE.TextureLoader().load(
      "./assets/Metal_Plate_009_COLOR.jpg"
    );
    this.chaoNorm = new THREE.TextureLoader().load(
      "./assets/Metal_Plate_009_NORM.jpg"
    );

    this.createPlano();

    this.planoBaixo;
    this.planoCima;
    this.planoDireita;
    this.planoEsquerda;
    this.planoFrente;
    this.planoTras;

    this.planoEsquerdaBox = {
      zMax: this.planoEsquerda.position.z,
      zMin: this.planoEsquerda.position.z,
    };

    this.planoDireitaBox = {
      zMax: this.planoDireita.position.z,
      zMin: this.planoDireita.position.z,
    };

    this.planoFrenteBox = {
      xMax: this.planoFrente.position.x,
      xMin: this.planoFrente.position.x,
    };

    this.planoTrasBox = {
      xMax: this.planoTras.position.x,
      xMin: this.planoTras.position.x,
    };

    this.isReflecting = true;

    //Sombreamento
    this.gouraudShader = false;
    this.phongShader = false;
  }
  createPlano() {
    /* Plano da esquerda */
    let planoL = new THREE.Mesh(
      new THREE.PlaneGeometry(this.largura, this.altura),
      new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        //color: '#0a0826'
        color: "grey",
        map: this.monalisa,
      })
    );
    planoL.position.set(0, this.altura / 4, -this.largura / 2);
    scene.add(planoL);
    planoL.geometry.computeBoundingBox();

    this.planoEsquerda = planoL;

    /* Plano da frente */
    let planoFront = new THREE.Mesh(
      new THREE.PlaneGeometry(this.largura, this.altura),
      new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide,
        color: "#0a0826",
      })
    );
    planoFront.geometry.computeBoundingBox();
    planoFront.rotation.y = Math.PI / 2;
    planoFront.position.set(this.largura / 2, this.altura / 4, 0);
    scene.add(planoFront);
    this.planoFrente = planoFront;

    /* Plano de tras*/
    let planoBack = new THREE.Mesh(
      new THREE.PlaneGeometry(this.largura, this.altura),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: "#0a0826",
      })
    );
    planoBack.rotateY(THREE.Math.degToRad(90));
    planoBack.position.set(-this.largura / 2, this.altura / 4, 0);
    scene.add(planoBack);
    planoBack.geometry.computeBoundingBox();

    this.planoTras = planoBack;

    /* Plano de cima */
    let planoTopo = new THREE.Mesh(
      new THREE.PlaneGeometry(this.largura, 1000),
      new THREE.MeshBasicMaterial({
        //color: '#0a0826'
        color: "black",
        side: THREE.DoubleSide,
      })
    );
    planoTopo.rotateX(THREE.Math.degToRad(90));
    planoTopo.position.set(0, 500, 0);
    //scene.add(planoTopo);
    this.planoCima = planoTopo;

    /* Plano de baixo*/
    let bottomPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(this.largura, this.largura, 512, 512),
      new THREE.MeshPhongMaterial({
        // color: "grey",
        side: THREE.DoubleSide,
        map: this.chaoBase,
        bumpMap: this.chaoNorm,
      })
    );
    bottomPlane.rotateX(THREE.Math.degToRad(90));
    bottomPlane.position.set(0, -100, 0);
    bottomPlane.receiveShadow = true;
    scene.add(bottomPlane);
    this.planoBaixo = bottomPlane;

    /* Plano da direita */
    let planoR = new THREE.Mesh(
      new THREE.PlaneGeometry(this.largura, this.altura),
      new THREE.MeshPhongMaterial({
        //color: '#0a0826'
        color: "grey",
        map: this.o_grito,
        side: THREE.DoubleSide,
      })
    );
    planoR.position.set(0, this.altura / 4, this.largura / 2);
    scene.add(planoR);
    this.planoDireita = planoR;
  }

  mudarParaBasic() {
    this.planoBaixo.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: this.chaoBase,
      normalScale: 1.5,
      normalMap: this.chaoNorm,
      //displacementMap: this.chaoDisp,
    });

    this.planoDireita.material = new THREE.MeshBasicMaterial({
      map: this.o_grito,
      side: THREE.DoubleSide,
    });

    this.planoEsquerda.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: this.monalisa,
    });

    this.planoFrente.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });

    this.planoTras.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });
  }

  mudarParaLambert() {
    this.planoBaixo.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: this.chaoBase,
      normalScale: 1.5,
      normalMap: this.chaoNorm,
    });

    this.planoDireita.material = new THREE.MeshLambertMaterial({
      //color: '#0a0826'
      color: "grey",
      map: this.o_grito,
      side: THREE.DoubleSide,
    });

    this.planoEsquerda.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: "grey",
      map: this.monalisa,
    });

    this.planoFrente.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });

    this.planoTras.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });
  }

  changeToGouraudShading() {
    this.mudarParaLambert();
  }

  changeToPhongShading() {
    this.planoBaixo.material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: "#64d3e7",
    });

    this.planoDireita.material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });

    this.planoEsquerda.material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });

    this.planoFrente.material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });

    this.planoTras.material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: "#0a0826",
    });
  }

  ativarIluminacao() {
    this.createPlano();
  }
}
