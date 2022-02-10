/**
 * Geração das Estrelas
 * @return {THREE.Group} - Conjunto de estrelas
 */
 class Estrelas {
    constructor() {
        this.estrelasPosicao();
    }
    estrelas() {

        // Criação da Constelação
        var estrelas = new THREE.Group();

        /** 
         * Criação de 2000 estrelas brancas dentro do plano
         * em posições aleatorias
         */
        for (let i = 1; i <= 2000; i++) {
            let x = Math.floor(Math.random() * (-738 - 738) + 738);
            let y = Math.floor(Math.random() * (-738 - 738) + 738);
            let z = Math.floor(Math.random() * (-738 - 738) + 738);

            // Criação de uma estrela
            let estrela = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial());
            estrela.position.set(x, y, 0);
            estrelas.add(estrela);

            let estrelaDB = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({
                color: '#2b61bb'
            }));
            estrelaDB.position.set(y, z, x);
            estrelas.add(estrelaDB);

            let estrelaLB = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({
                color: '#13c4fc'
            }));
            estrelaLB.position.set(z, x, y);
            estrelas.add(estrelaLB);
        }

        /** 
         * Criação de 1000 estrelas azuis dentro do plano
         * em posições aleatorias
         */



        return estrelas;
    }

    /**
     * Adição das constelações no plano
     * @return {void}
     */
    estrelasPosicao() {


        let estrelasFundo = this.estrelas();
        estrelasFundo.position.set(0, 0, -400);
        scene.add(estrelasFundo);

        let estrelasR = this.estrelas();
        estrelasR.rotateY(1.57079633);
        estrelasR.position.set(400, 0, 0);
        scene.add(estrelasR);

        let estrelasBottom = this.estrelas();
        estrelasBottom.rotateX(1.57079633);
        estrelasBottom.position.set(0, -40, 0);
        scene.add(estrelasBottom);
    }
}