const escalas = document.getElementById("escalas") //itens do select
const tom = document.getElementById("tom")

const teclas = document.querySelectorAll(".tecla");      //seleciona todas teclas
const visualizar = document.querySelector("#visualizar") //botão visualizar

class EscalaMusical {
    constructor(escala, tom) { //na prática deste codigo vai envolver o select escala/tom
        this.escala = escala
        this.tom = tom
    }

    MontarEscala() { //método para montar escala, chama os demais metodos de acordo com a condição
        if (this.escala === "EscalaMaior") {
            return this.MontarEscalaMaior()
        } else if (this.escala === "EscalaMenor") {
            return this.MontarEscalaMenor()
        }else if (this.escala === "EscalaMenorHarmonica") {
            return this.MontarEscalaMenorHarmonica()
        }else if (this.escala === "EscalaMenorMelodica") {
            return this.MontarEscalaMenorMelodica()
        }
    }

    MontarEscalaMaior() {
        const intervalos = [2, 2, 1, 2, 2, 2, 1] 

        const notas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        const NotaInicial = notas.indexOf(this.tom)

        const EscalaMaiorFormada = [this.tom]
        let NotaAtual = NotaInicial

        for (let i = 0; i < intervalos.length; i++) {
            NotaAtual += intervalos[i] 
            EscalaMaiorFormada.push(notas[NotaAtual])
        }

        return EscalaMaiorFormada
    }
    //método para montar escala menor
    MontarEscalaMenor() {
        //vetor com a fórmula tom e semitom da escala musical
        const intervalos = [2, 1, 2, 2, 1, 2, 2]
        //números que representa a escala cromática de acordo como arquivo .wav
        const notas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        //obter a primeira nota da tonalidade, a qual o tom tem o value = number
        const NotaInicial = notas.indexOf(this.tom)
        //vetor escala menor formada para ser incrementada posteriormente
        const EscalaMenorFormada = [this.tom]
        //primeira nota irá começar pelo próprio tom
        let NotaAtual = NotaInicial
        //incrementar cada item do vetor intervalo ao decorrer do vetor
        for (let i = 0; i < intervalos.length; i++) {
            //a partir da nota atual, será adicionado o próximo número correspondente ao intervalo
            NotaAtual += intervalos[i]
            //adiciona ao vetor EscalaMenorFormada as notas existentes na escala escolhida
            EscalaMenorFormada.push(notas[NotaAtual])
        }
        return EscalaMenorFormada
    }

    MontarEscalaMenorHarmonica() {
        const intervalos = [2, 1, 2, 2, 1, 3, 1] 

        const notas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        const NotaInicial = notas.indexOf(this.tom)

        const EscalaMenorHarmonicaFormada = [this.tom]
        let NotaAtual = NotaInicial

        for (let i = 0; i < intervalos.length; i++) {
            NotaAtual += intervalos[i] 
            EscalaMenorHarmonicaFormada.push(notas[NotaAtual])
        }

        return EscalaMenorHarmonicaFormada
    }

    MontarEscalaMenorMelodica() {
        const intervalos = [2, 1, 2, 2, 2, 2, 1] 

        const notas = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
        const NotaInicial = notas.indexOf(this.tom)

        const EscalaMenorMelodicaFormada = [this.tom]
        let NotaAtual = NotaInicial

        for (let i = 0; i < intervalos.length; i++) {
            NotaAtual += intervalos[i] 
            EscalaMenorMelodicaFormada.push(notas[NotaAtual])
        }

        return EscalaMenorMelodicaFormada
    }
}



visualizar.addEventListener("click", () => {
    const escalaSelecionada = escalas.value
    const tomSelecionado = tom.value
    // Limpar as marcações anteriores
    teclas.forEach((tecla) => {
        tecla.classList.remove("escalaPreta")
        tecla.classList.remove("escalaBranca")
    })
    // NotasDaEscala é um vetor contendo as notas musicais em números de acordo com escala/tom
    const NotasDaEscala = (new EscalaMusical(escalaSelecionada, tomSelecionado)).MontarEscala()
    //laço para cada nota tocada da escala e mudança de cor
    for (let i = 0; i < NotasDaEscala.length; i++) {
        setTimeout(() => {
            tocarNota(NotasDaEscala[i]);
            MudarCorNota(NotasDaEscala[i])
        }, i * 800);
    }

})

teclas.forEach((tecla) => {
    tecla.addEventListener("mousedown", () => clicoumousedown(tecla))        //evento para cada tecla após clicar
    tecla.addEventListener("mouseup", () => clicoumouseup(tecla))

    tecla.addEventListener("mouseout", () => clicoumouseup(tecla)); //evento necessário para que ao arrastar o mouse a tecla não permaneça selecionada
    tecla.addEventListener("mouseleave", () => clicoumouseup(tecla));
})
const clicoumousedown = (tecla) => {
    tocarNota(tecla.getAttribute('data-nota'))     //toca a nota

    if (tecla.className.includes("preta")) {
        tecla.classList.add("preta-pressionada")  //altera estilo da tecla após clicar
        return;
    }
    tecla.classList.add("branca-pressionada")

}
const clicoumouseup = (tecla) => {
    if (tecla.className.includes("preta")) {            //altera estilo da tecla após clicar
        tecla.classList.remove("preta-pressionada")
        return;
    }
    tecla.classList.remove("branca-pressionada")
}

const tocarNota = (nota) => {                           //busca da nota no arquivo de audio
    const audio = new Audio(`../notas/${nota}.wav`)
    audio.play()
}

const MudarCorNota = (nota) => {
    const teclaCorrespondente = document.querySelector(`[data-nota="${nota}"]`);

    if (teclaCorrespondente) {
        if (teclaCorrespondente.classList.contains("preta")) {
            teclaCorrespondente.classList.add("escalaPreta"); // altera estilo da tecla após tocar a nota
        } else {
            teclaCorrespondente.classList.add("escalaBranca");
        }
    }
}




