class Status {
    init(tempo,vida,inimigos) {
        let d = document.getElementById("estado");
        d.innerHTML = "<h2>STATUS</h2><h3>Tempo: " + tempo + "</h3><h3>Inimigos: " + inimigos + "</h3><h3>Vida: " + vida + "</h3>"; 
    }

}