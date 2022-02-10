/**
 * Geração da Nave do Vilão
 * @param  {color} corPrimaria - Cor do corpo da nave
 * @param  {color} corSecundaria - Cor da asa e do topo da nave
 * @param  {color} corTerciaria - Cor da base da nave
 * @return {THREE.Group} - A nave do vilão
 */

class NaveVilao {
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
           new THREE.MeshPhongMaterial({
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
           new THREE.MeshPhongMaterial({
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
           new THREE.MeshPhongMaterial({
             color: this.corTerciaria,
           }),
         ];
        this.nave = new THREE.Group();
        this.nave.castShadow = true;
        this.nave.userData = { vida: 2 };
        this.createNaveVilao();

        //make naves cast and receive shadows
        this.nave.traverse((object) => {
            object.castShadow = true;
            object.receiveShadow = true;
        })

        this.tempoDisparo;
        this.nave.removido = false;

        this.box = this.getCompoundBoundingBox();
        //const helper = new THREE.Box3Helper(this.box, 0xffff00);
        //this.nave.add(helper);

        this.xMin;
        this.xMax;
        this.yMin;
        this.yMax;
        this.zMin;
        this.zMax;

        this.velocidadeAtualZ;
        this.velocidadeDesejada;
        this.steering;
        this.velocidadeAtualY;
        this.velocidadeAtual = new THREE.Vector3();

        this.isReflecting = true;
        this.phongShader = false;
        this.gouraudShader = false;
        //Partes da nave para alterar o material
        this.corpoNave; // phong, corprimaria
        this.topoNave; //lambert, corsecundaria
        this.asaDireitaNave; //lambert, secundaria
        this.asaEsquerdaNave; //lambert, secundaria
        this.baseEsquerdaNave; //phong, corTerciaria
        this.baseDireitaNave; //phong, corTerciaria


    }
    createNaveVilao() {

        // Corpo da nave
        let corpo = new THREE.Mesh(new THREE.BoxGeometry(10, 30, 10), this.materialCorPrimaria);
       corpo.geometry.groups.forEach(function (face, i) {
         face.materialIndex = Math.floor(i % 3);
       });
        corpo.position.set(8, 15, 0);
        this.nave.add(corpo);
        this.corpoNave = corpo;


        // Topo da nave
        let topo = new THREE.Mesh(new THREE.ConeGeometry(7, 30, 4), this.materialCorSecundaria);
        topo.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        topo.position.set(8, 45, 0);
        topo.rotation.y = 0.8;
        this.nave.add(topo);
        this.topoNave = topo;

        // Asa direita da nave
        let asaDireira = new THREE.Mesh(new THREE.ConeGeometry(7, 18, 4), this.materialCorSecundaria);
        asaDireira.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        asaDireira.rotation.x = 0.3;
        asaDireira.rotation.z = -0.44;
        asaDireira.rotation.y = 0.8;
        asaDireira.position.set(1, 20, 0);
        this.nave.add(asaDireira);
        this.asaDireitaNave = asaDireira;

        // Asa esquerda da nave
        let asaEsquerda = new THREE.Mesh(new THREE.ConeGeometry(7, 18, 4), this.materialCorSecundaria);
        asaEsquerda.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        asaEsquerda.rotation.x = 0.3;
        asaEsquerda.rotation.z = 0.35;
        asaEsquerda.rotation.y = -0.8;
        asaEsquerda.position.set(15, 20, 0);
        this.nave.add(asaEsquerda);
        this.asaEsquerdaNave = asaEsquerda;

        // Base esquerda da nave
        let baseEsquerda = new THREE.Mesh(new THREE.BoxGeometry(5, 15, 5), this.materialCorTerciaria);
        baseEsquerda.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        baseEsquerda.position.set(15, 0, 0);
        this.nave.add(baseEsquerda);
        this.baseEsquerdaNave = baseEsquerda;

        // Base direita da nave
        let baseDireita = new THREE.Mesh(new THREE.BoxGeometry(5, 15, 5), this.materialCorTerciaria);
        baseDireita.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        baseDireita.position.set(1, 0, 0);
        this.nave.add(baseDireita);
        this.baseDireitaNave = baseDireita;

        //Canhao central
        let supensorioC = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 10, 32), this.materialCorTerciaria);
        supensorioC.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        supensorioC.position.set(8, 2, -9);
        supensorioC.rotation.x = 1.6;
        this.nave.add(supensorioC);
        let parte1C = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 30, 8), new THREE.MeshBasicMaterial({
            color: this.corPrimaria
        }));
        parte1C.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        let parte2C = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 10, 8), this.materialCorTerciaria);
        parte2C.geometry.groups.forEach(function (face, i) {
          face.materialIndex = Math.floor(i % 3);
        });
        this.canhaoC = new THREE.Group();

        this.canhaoC.add(parte1C);
        parte2C.position.set(0, 20, 0);
        this.canhaoC.add(parte2C);
        this.canhaoC.position.set(8, 15, -16);
        this.nave.add(this.canhaoC);
        this.nave.add(this.canhaoC);
        return this.nave;
    }

    /**
     * Retorna uma bounding box em volta da nave
     * @returns {THREE.Box3}
     */
    createBoundingBox() {
        var aabb = new THREE.Box3();
        aabb.setFromObject(this.nave);
        this.boxHelper = new THREE.Box3Helper(aabb, "white");

        return aabb;
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
        box.min.x = -10;
        box.max.x = 25;

        //y min e y max
        box.max.y = 60;
        box.min.y = -10;

        //z min e z max
        box.max.z = 15;
        box.min.z = -22;

        return box;
    }

    arrancar(velocidadeAtual, sentido, MODULO_ACELERACAO) {

        let acelerar = true;
        const MODULO_TRAVAGEM = 0.05;
        const VMAX = 20 * sentido;

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

    mudarParaBasic() {
        //make naves cast and receive shadows
        this.nave.traverse((object) => {

            if (object.material) {
                let corActual = object.material.color;
                object.material = new THREE.MeshBasicMaterial();
                object.material.color.setRGB(corActual.r, corActual.g, corActual.b);
            }

        })
    }

    mudarParaPhongLambert() {
        this.corpoNave.material = new THREE.MeshLambertMaterial({ color: this.corPrimaria });
        this.topoNave.material = new THREE.MeshPhongMaterial({ color: this.corSecundaria });
        this.asaDireitaNave.material = new THREE.MeshLambertMaterial({ color: this.corSecundaria });
        this.asaEsquerdaNave.material = new THREE.MeshLambertMaterial({ color: this.corSecundaria });
        this.baseEsquerdaNave.material = new THREE.MeshPhongMaterial({ color: this.corTerciaria });
        this.baseDireitaNave.material = new THREE.MeshPhongMaterial({ color: this.corTerciaria });
    }

    changeToGouraudShading() {
        this.nave.traverse((object) => {

            if (object.material) {
                let corActual = object.material.color;
                object.material = new THREE.MeshLambertMaterial();
                object.material.color.setRGB(corActual.r, corActual.g, corActual.b);
            }

        })
    }

    changeToPhongShading() {
        this.nave.traverse((object) => {

            if (object.material) {
                let corActual = object.material.color;
                object.material = new THREE.MeshPhongMaterial();
                object.material.color.setRGB(corActual.r, corActual.g, corActual.b);
            }

        })

    }


}