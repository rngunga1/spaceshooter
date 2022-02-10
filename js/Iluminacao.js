class Iluminacao {
  constructor() {
    //Holofotes
    this.holofote1 = new Holofote();
    this.holofote1.position.set(500, 600, -500);

    this.holofote2 = new Holofote();
    this.holofote2.position.set(500, 600, 500);

    this.holofote3 = new Holofote();
    this.holofote3.position.set(-500, 600, -500);

    this.holofote4 = new Holofote();
    this.holofote4.position.set(-500, 600, 500);

    //Iluminacao global
    this.iluminacaoGlobal = new THREE.DirectionalLight(0xffffff, 1);
    this.iluminacaoGlobal.position.y = 500;
    this.iluminacaoGlobal.position.z = 0;
    this.iluminacaoGlobal.position.x = 100;

    this.iluminacaoGlobal.castShadow = true;
    scene.add(this.iluminacaoGlobal);

    this.iluminacaoGlobal.shadow.camera = new THREE.OrthographicCamera(
      -500,
      500,
      500,
      -500,
      1,
      3000
    );
    this.iluminacaoGlobal.shadow.mapSize.width = 1024; // default
    this.iluminacaoGlobal.shadow.mapSize.height = 1024; // default

    //luzes pontuais
    //Luzes da esquerda
    this.lp1L = new LuzPontual();
    this.lp2L = new LuzPontual();
    this.lp3L = new LuzPontual();

    this.lp1L.luz.position.set(0, 140, -690);
    this.lp1L.luz.rotation.x = 0.4;

    this.lp2L.luz.position.set(-350, 140, -690);
    this.lp2L.luz.rotation.x = 0.4;

    this.lp3L.luz.position.set(350, 140, -690);
    this.lp3L.luz.rotation.x = 0.4;

    //Luzes da direita
    this.lp1R = new LuzPontual();
    this.lp2R = new LuzPontual();
    this.lp3R = new LuzPontual();

    this.lp1R.luz.position.set(0, 140, 690);
    this.lp1R.luz.rotation.x = -0.4;
    this.lp1R.luz.rotation.y = 2.8;

    this.lp2R.luz.position.set(-350, 140, 690);
    this.lp2R.luz.rotation.x = -0.4;
    this.lp2R.luz.rotation.y = 2.8;

    this.lp3R.luz.position.set(350, 140, 690);
    this.lp3R.luz.rotation.x = -0.4;
    this.lp3R.luz.rotation.y = 2.8;
  }
  onOffHolofote(id) {
    if (id == 1) {
      this.holofote1.children[2].intensity == 0
        ? ((this.holofote1.children[2].intensity = 15),
          this.holofote1.children[0].material.color.set("white"))
        : ((this.holofote1.children[2].intensity = 0),
          this.holofote1.children[0].material.color.set("black"));
    } else if (id == 2) {
      this.holofote2.children[2].intensity == 0
        ? ((this.holofote2.children[2].intensity = 15),
          this.holofote2.children[0].material.color.set("white"))
        : ((this.holofote2.children[2].intensity = 0),
          this.holofote2.children[0].material.color.set("black"));
    } else if (id == 3) {
      this.holofote3.children[2].intensity == 0
        ? ((this.holofote3.children[2].intensity = 15),
          this.holofote3.children[0].material.color.set("white"))
        : ((this.holofote3.children[2].intensity = 0),
          this.holofote3.children[0].material.color.set("black"));
    } else {
      this.holofote4.children[2].intensity == 0
        ? ((this.holofote4.children[2].intensity = 15),
          this.holofote4.children[0].material.color.set("white"))
        : ((this.holofote4.children[2].intensity = 0),
          this.holofote4.children[0].material.color.set("black"));
    }
  }
  onOffGlobal() {
    if (this.iluminacaoGlobal.intensity == 0) {
      this.iluminacaoGlobal.intensity = 1;
    } else {
      this.iluminacaoGlobal.intensity = 0;
    }
  }
  onOffEsquerdaLP() {
    this.lp1L.luz.children[2].intensity == 0
      ? ((this.lp1L.luz.children[2].intensity = 6),
        this.lp1L.luz.children[0].material.color.set("white"))
      : ((this.lp1L.luz.children[2].intensity = 0),
        this.lp1L.luz.children[0].material.color.set("black"));

    this.lp2L.luz.children[2].intensity == 0
      ? ((this.lp2L.luz.children[2].intensity = 6),
        this.lp2L.luz.children[0].material.color.set("white"))
      : ((this.lp2L.luz.children[2].intensity = 0),
        this.lp2L.luz.children[0].material.color.set("black"));

    this.lp3L.luz.children[2].intensity == 0
      ? ((this.lp3L.luz.children[2].intensity = 6),
        this.lp3L.luz.children[0].material.color.set("white"))
      : ((this.lp3L.luz.children[2].intensity = 0),
        this.lp3L.luz.children[0].material.color.set("black"));
  }
  onOffDireitaLP() {
    this.lp1R.luz.children[2].intensity == 0
      ? ((this.lp1R.luz.children[2].intensity = 6),
        this.lp1R.luz.children[0].material.color.set("white"))
      : ((this.lp1R.luz.children[2].intensity = 0),
        this.lp1R.luz.children[0].material.color.set("black"));

    this.lp2R.luz.children[2].intensity == 0
      ? ((this.lp2R.luz.children[2].intensity = 6),
        this.lp2R.luz.children[0].material.color.set("white"))
      : ((this.lp2R.luz.children[2].intensity = 0),
        this.lp2R.luz.children[0].material.color.set("black"));

    this.lp3R.luz.children[2].intensity == 0
      ? ((this.lp3R.luz.children[2].intensity = 6),
        this.lp3R.luz.children[0].material.color.set("white"))
      : ((this.lp3R.luz.children[2].intensity = 0),
        this.lp3R.luz.children[0].material.color.set("black"));
  }
}

/**
 * Geração do Holofote - Auxiliar
 * @return {THREE.Group} - o holofote
 */
class Holofote {
  constructor() {
    return this.createHolofote();
  }
  createHolofote() {
    let holofote = new THREE.Group();
    let lampada = new THREE.Mesh(
      new THREE.SphereGeometry(15, 32, 16),
      new THREE.MeshBasicMaterial({ color: "white" })
    );
    holofote.add(lampada);
    let corpo = new THREE.Mesh(
      new THREE.ConeGeometry(30, 30, 32),
      new THREE.MeshBasicMaterial({ color: "grey" })
    );
    corpo.position.set(0, 15, 0);
    holofote.add(corpo);

    let spotLight = new THREE.SpotLight("white", 20, 700, 90);
    spotLight.position.set(0, -30, 0);
    holofote.add(spotLight);
    scene.add(holofote);
    return holofote;
  }
}
class LuzPontual {
  constructor() {
    this.luz = new THREE.Group();
    this.createLuzPontual();
  }
  createLuzPontual() {
    let lampada = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({ color: "white" })
    );
    lampada.position.set(0, -5, 0);
    this.luz.add(lampada);
    let suporte = new THREE.Mesh(
      new THREE.CylinderGeometry(3, 3, 40),
      new THREE.MeshBasicMaterial({ color: "black" })
    );

    suporte.position.set(0, 0, -24);
    suporte.rotation.x = 1.5;
    this.luz.add(suporte);

    let pointLight = new THREE.PointLight("grey", 6, 360);
    pointLight.position.set(0, -5, 0);

    this.luz.add(pointLight);
    scene.add(this.luz);
  }
}
