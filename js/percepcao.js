const iniciar = document.getElementById("iniciar");
const novamente = document.getElementById("tentar-novamente");
const resp = document.querySelector("#resp");
const tentativa = document.querySelector("#tentativa");
const teclas = document.querySelectorAll(".tecla");
let tentativas = 10;
let contador = 0;
let NotaAleatoria = "";
let NotaTocada = "";
let primeiraTentativa = true; //  variável para controlar a primeira tentativa

const tocarNota = (nota) => {
  const audio = new Audio(`../notas/${nota}.wav`);
  audio.play();
};

const RandomNumber = () => {
  return Math.floor(Math.random() * 25) + 1;
};

const resetTeclas = () => {
  teclas.forEach((tecla) => {
    tecla.classList.remove("teclaBrancaCorreta");
    tecla.classList.remove("teclaPretaCorreta");
  });
}
const tentarNovamente = () => {
  contador = 0
  resp.innerText = "Acertos: " + contador;
  
}
const notaPressionada = (tecla) => {
  tocarNota(tecla.getAttribute('data-nota')); //chamamento da função para que a nota seja tocada
  if (tecla.className.includes("preta")) {
    tecla.classList.add("preta-pressionada"); // muda o estilo da nota pressionada
  }
  tecla.classList.add("branca-pressionada");
}
const clicoumousedown = (tecla) => {
  notaPressionada(tecla)


  if (primeiraTentativa) {
    NotaTocada = tecla.getAttribute('data-nota'); //armazena a nota a qual é selecionada pelo atributo

    if (NotaTocada === NotaAleatoria) {
      contador++;
      resp.innerText = "Acertos: " + contador;
      primeiraTentativa = false;
    } else if (NotaTocada !== NotaAleatoria) {
      if (teclas[NotaAleatoria - 1].classList.contains("preta")) {
        teclas[NotaAleatoria - 1].classList.add("teclaPretaCorreta"); // Tecla correta irá mudar de cor
      } else if (teclas[NotaAleatoria - 1].classList.contains("branca")) {
        teclas[NotaAleatoria - 1].classList.add("teclaBrancaCorreta"); // Tecla correta irá mudar de cor
      }
      primeiraTentativa = false; // após a nota errada ser tocada mesmo clicando na certa não irá incrementar o contador
      if (tentativas > 0) {
        tentativas--
        tentativa.innerText = "Tentativas: " + tentativas
      } else if (tentativas === 0) {
        notaPressionada(tecla)
        tentarNovamente()
        tentativa.innerText = "Tentativas: 10"
        setTimeout(() => {
          alert("Tentativas esgotadas, tente novamente!");
          resetTeclas()
          tentativas = 10
        }, 1200); // Atrasa a execução do alert
      }
    }
  }

};

const clicoumouseup = (tecla) => {
  if (tecla.className.includes("preta")) {
    tecla.classList.remove("preta-pressionada");  //remove o estilo da nota que havia sido pressionada

  }
  tecla.classList.remove("branca-pressionada");
};

teclas.forEach((tecla) => {    //percorre e adiciona eventos em cada tecla
  tecla.addEventListener("mousedown", () => clicoumousedown(tecla));
  tecla.addEventListener("mouseup", () => clicoumouseup(tecla));

  tecla.addEventListener("mouseout", () => clicoumouseup(tecla)); //evento necessário para que ao arrastar o mouse a tecla não permaneça selecionada
  tecla.addEventListener("mouseleave", () => clicoumouseup(tecla));
});

iniciar.addEventListener("click", () => {
  NotaAleatoria = teclas[RandomNumber() - 1].getAttribute('data-nota') //gera nota aleatória em número da tecla
  tocarNota(NotaAleatoria); // exibe audio da nota aleatória
  resp.innerText = "Acertos: " + contador;
  primeiraTentativa = true; // Reseta a primeira tentativa ao clicar em "Iniciar"

  //limpa marcações feitas nas teclas
  resetTeclas()
});

novamente.addEventListener("click", () => {
  tentarNovamente()
  resetTeclas()
})


