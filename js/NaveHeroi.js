/**
 * Geração da Nave do Heroi
 * @param  {color} corPrimaria - Cor do corpo da nave
 * @param  {color} corSecundaria- Cor da asa e do topo da nave
 * @param  {color} corTerciaria - Cor da base da nave
 * @return {THREE.Group} - A nave do heroi
 */
class NaveHeroi {
  constructor(corPrimaria, corSecundaria, corTerciaria) {
    this.corPrimaria = corPrimaria;
    this.corTerciaria = corTerciaria;
    this.corSecundaria = corSecundaria;
    this.materialCorPrimaria = [
      new THREE.MeshLambertMaterial({
        color: this.corPrimaria,
      }),
      new THREE.MeshBasicMaterial({
        color: this.corPrimaria,
      }),
    ];
    this.materialCorPrimaria = [
      new THREE.MeshLambertMaterial({
        color: this.corPrimaria,
      }),
      new THREE.MeshBasicMaterial({
        color: this.corPrimaria,
      }),
    ];
    this.materialCorSecundaria = [
      new THREE.MeshLambertMaterial({
        color: this.corSecundaria,
      }),
      new THREE.MeshBasicMaterial({
        color: this.corSecundaria,
      }),
    ];
    this.materialCorTerciaria = [
      new THREE.MeshLambertMaterial({
        color: this.corTerciaria,
      }),
      new THREE.MeshBasicMaterial({
        color: this.corTerciaria,
      }),
    ];
    this.nave = new THREE.Group();
    this.nave.userData = { vida: 3 };
    this.createNaveH();
    this.isReflecting = true;

    //make naves cast and receive shadows
    this.nave.traverse((object) => {
      object.castShadow = true;
      object.receiveShadow = true;
    });

    this.box = this.getCompoundBoundingBox();

    //const helper = new THREE.Box3Helper(this.box, 0xffff00);
    //this.nave.add(helper);

    //atributos da bounding box, convertidos para o refencial da nave
    this.xMin;
    this.xMax;
    this.yMin;
    this.yMax;
    this.zMin;
    this.zMax;

    //Partes da nave para mudar o material
    this.topoNave;
    this.corpoNave;
    this.baseNave;
    this.asaDireitaAnteriorNave;

    //Sombreamento
    this.gouraudShader = false;
    this.phongShader = false;
  }

  createNaveH() {
    // Topo da nave
    let topo = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 13, 20, 4),
      this.materialCorSecundaria
    );
    topo.position.set(0, 63, 0);
    topo.rotation.y = 0.78;
    this.nave.add(topo);
    this.topoNave = topo;

    // Corpo da nave
    let corpo = new THREE.Mesh(
      new THREE.BoxGeometry(20, 50, 17),
      this.materialCorPrimaria
    );
    corpo.geometry.groups.forEach(function (face, i) {
      face.materialIndex = Math.floor(i % 2);
    });
    corpo.position.set(0, 28, 0);
    this.nave.add(corpo);
    this.corpoNave = corpo;

    // Base da nave
    let base = new THREE.Mesh(
      new THREE.BoxGeometry(13, 4, 4),
      this.materialCorTerciaria
    );
      base.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    base.position.set(0, 1, 0);
    this.nave.add(base);
    this.baseNave = base;

    // Asa direita anterior da nave
    let asaDireiraAnterior = new THREE.Mesh(
      new THREE.ConeGeometry(10, 23, 4),
      this.materialCorSecundaria
    );
      asaDireiraAnterior.geometry.groups.forEach(function (face, i) {
      face.materialIndex = Math.floor(i % 2);
    });
    asaDireiraAnterior.rotation.x = 0.8;
    asaDireiraAnterior.rotation.z = 1.6;
    asaDireiraAnterior.rotation.y = 0.3;
    asaDireiraAnterior.position.set(-18, 20, 3);
    this.nave.add(asaDireiraAnterior);
    this.asaDireitaAnteriorNave = asaDireiraAnterior;

    // Asa direita posterior da nave
    let asaDireiraPosterior = new THREE.Mesh(
      new THREE.ConeGeometry(11, 40, 4),
      this.materialCorSecundaria
    );
      asaDireiraPosterior.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    asaDireiraPosterior.rotation.x = 0.8;
    asaDireiraPosterior.rotation.z = 1.6;
    asaDireiraPosterior.rotation.y = 0.3;
    asaDireiraPosterior.position.set(-18, 30, 3);
    this.nave.add(asaDireiraPosterior);

    // Asa esquerda anterior da nave
    let asaEsquerdaAnterior = new THREE.Mesh(
      new THREE.ConeGeometry(10, 23, 4),
      this.materialCorSecundaria
    );
      asaEsquerdaAnterior.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    asaEsquerdaAnterior.rotation.x = 0.8;
    asaEsquerdaAnterior.rotation.z = -1.6;
    asaEsquerdaAnterior.rotation.y = -0.3;
    asaEsquerdaAnterior.position.set(18, 20, 3);
    this.nave.add(asaEsquerdaAnterior);

    // Asa esquerda posterior da nave
    let asaEsquerdaPosterior = new THREE.Mesh(
      new THREE.ConeGeometry(11, 40, 4),
      this.materialCorSecundaria
    );
      asaEsquerdaPosterior.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    asaEsquerdaPosterior.rotation.x = 0.8;
    asaEsquerdaPosterior.rotation.z = -1.6;
    asaEsquerdaPosterior.rotation.y = -0.3;
    asaEsquerdaPosterior.position.set(18, 30, 3);
    this.nave.add(asaEsquerdaPosterior);

    // Asa na parte superior da nave
    let asaS = new THREE.Mesh(
      new THREE.ConeGeometry(5, 30, 4),
      this.materialCorSecundaria
    );
      asaS.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    asaS.rotation.x = 0.1;
    asaS.rotation.z = 0;
    asaS.rotation.y = 0;
    asaS.position.set(0, 18, -10);
    this.nave.add(asaS);

    //Canhao de baixo
    let suspensorioB = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 10, 32),
      this.materialCorSecundaria
    );
      suspensorioB.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    suspensorioB.position.set(0, 9, 12);
    suspensorioB.rotation.x = 1.6;
    this.nave.add(suspensorioB);
    this.parte1B = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6, 30, 8),
      new THREE.MeshBasicMaterial({
        color: this.corPrimaria,
      })
    );
      this.parte1B.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    let parte2B = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 10, 8),
      this.materialCorSecundaria
    );
      parte2B.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
      
    this.canhaoB = new THREE.Group();

    this.canhaoB.add(this.parte1B);
    parte2B.position.set(0, 20, 0);
    this.canhaoB.add(parte2B);
    this.canhaoB.position.set(0, 20, 20);
    this.nave.add(this.canhaoB);

    //Canhao da Direita
    let suspensorioR = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 20, 32),
      new THREE.MeshBasicMaterial({
        color: this.corTerciaria,
      })
    );
      suspensorioR.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    suspensorioR.position.set(-20, 25, -5);
    suspensorioR.rotation.x = 1.6;
    this.nave.add(suspensorioR);
    this.parte1R = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6, 30, 8),
      new THREE.MeshBasicMaterial({
        color: this.corPrimaria,
      })
    );
      this.parte1R.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });

    let parte2R = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 10, 8),
      this.materialCorSecundaria
    );
      parte2R.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    this.canhaoR = new THREE.Group();

    this.canhaoR.add(this.parte1R);
    parte2R.position.set(0, 20, 0);
    this.canhaoR.add(parte2R);
    this.canhaoR.position.set(-20, 35, -15);
    this.nave.add(this.canhaoR);

    //Canhao da Esquerda
    let suspensorioL = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2, 20, 32),
      new THREE.MeshBasicMaterial({
        color: this.corTerciaria,
      })
    );
      suspensorioL.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    suspensorioL.position.set(20, 25, -5);
    suspensorioL.rotation.x = 1.6;
    this.nave.add(suspensorioL);

    this.parte1L = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6, 30, 8),
      new THREE.MeshBasicMaterial({
        color: this.corPrimaria,
      })
    );
      this.parte1L.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    let parte2L = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 10, 8),
      this.materialCorSecundaria
    );
      parte2L.geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % 2);
      });
    this.canhaoL = new THREE.Group();

    this.canhaoL.add(this.parte1L);
    parte2L.position.set(0, 20, 0);
    this.canhaoL.add(parte2L);
    this.canhaoL.position.set(20, 35, -15);
    this.nave.add(this.canhaoL);
  }

  getCompoundBoundingBox() {
    var box = null;

    //Percorre todo o grafo do grupo nave
    this.nave.traverse(function (obj3D) {
      var geometry = obj3D.geometry;
      if (geometry === undefined) {
        return;
      }

      geometry.computeBoundingBox();
      if (box === null) {
        box = geometry.boundingBox;
      } else {
        box.union(geometry.boundingBox);
      }
    });

    //x min e x max
    box.min.x = -35;
    box.max.x = 35;

    //y min e y max
    box.max.y = 75;
    box.min.y = -5;

    //z min e z max
    box.max.z = 23;
    box.min.z = -23;

    return box;
  }

  mudarParaBasic() {
    //make naves cast and receive shadows
    this.nave.traverse((object) => {
      if (object.material) {
        let corActual = object.material.color;
        console.log(corActual);
        object.material = new THREE.MeshBasicMaterial();
        object.material.color.setRGB(corActual.r, corActual.g, corActual.b);
      }
    });
  }

  mudarParaBasicLambert() {
    this.nave.traverse((object) => {
      if (object.material) {
        let corActual = object.material.color;
        let materials = [
          new THREE.MeshLambertMaterial({
            color: corActual,
          }),
          new THREE.MeshBasicMaterial({
            color: corActual,
          }),
        ];
        object.material = materials;
        // object.material.color.setRGB(corActual.r, corActual.g, corActual.b);
      }
    });
  }

  changeToGouraudShading() {
    this.nave.traverse((object) => {
      if (object.material) {
        let corActual = object.material.color;
        object.material = new THREE.MeshLambertMaterial();
        object.material.color.setRGB(corActual.r, corActual.g, corActual.b);
      }
    });
  }

  changeToPhongShading() {
    this.nave.traverse((object) => {
      if (object.material) {
        let corActual = object.material.color;
        object.material = new THREE.MeshPhongMaterial();
        object.material.color.setRGB(corActual.r, corActual.g, corActual.b);
      }
    });
  }

  resetMaterial() {
    this.createNaveH();
  }
}
