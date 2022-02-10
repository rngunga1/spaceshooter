class Menu {
    constructor() {
        this.isPlaying = true;
        this.reload = false;
        
    }

    pause(start = false) {
        let d = document.getElementById("pause");

        let titulo = "JOGO EM PAUSE";
        let nomeBtn = "RETOMAR";

        if (start) {
            titulo = "BEM-VINDO";
            nomeBtn = "INICIAR";
        }

        d.innerHTML = "<div id='menu-pause'><h2>"+ titulo +"</h2></div>"
        this.startButton(nomeBtn);
        if(!start)
            this.restartButton();
    }

    play() {
        let d = document.getElementById("pause");
        d.innerHTML = "";
    }

    startButton(btn) {
        const buttonText = btn
        let button = document.createElement('div');
        button.setAttribute("class","box-11");

        let innerDiv = document.createElement('div');
        innerDiv.setAttribute('class', 'btn btn-one')

        let span = document.createElement('span');
        span.innerText = buttonText;
        innerDiv.appendChild(span);
        button.appendChild(innerDiv);
        document.getElementById("menu-pause").appendChild(button);
        button.onclick = () => {
            this.play();
            this.isPlaying = true;
            animate();
        }
    }

    restartButton() {
        const buttonText = "REINICIAR"
        let button = document.createElement('div');
        button.setAttribute("class","box-1");

        let innerDiv = document.createElement('div');
        innerDiv.setAttribute('class', 'btn btn-one')

        let span = document.createElement('span');
        span.innerText = buttonText;
        innerDiv.appendChild(span);
        button.appendChild(innerDiv);
        document.getElementById("menu-pause").appendChild(button);
        button.onclick = () => {
            this.play();
            this.isPlaying = true;
            this.reload = true;
            animate();
            
            //scene = backupScene;
        }
    }
}