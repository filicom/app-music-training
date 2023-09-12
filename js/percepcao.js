const iniciar = document.getElementById("iniciar");
const novamente = document.getElementById("tentar-novamente");
const resp = document.querySelector("h3");
const teclas = document.querySelectorAll(".tecla");
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
    tecla.classList.remove("teclaCorreta");
  });
}

const clicoumousedown = (tecla) => {
  if (primeiraTentativa) {
    NotaTocada = tecla.getAttribute('data-nota'); //armazena a nota a qual é selecionada pelo atributo

    if (NotaTocada === NotaAleatoria) {
      contador++;
      resp.innerText = "Acertos: " + contador;
      primeiraTentativa = false;
    } else if (NotaTocada !== NotaAleatoria) {
      
        teclas[NotaAleatoria - 1].classList.add("teclaCorreta"); // Tecla correta
      
      primeiraTentativa = false; // Se a nota errada foi tocada, desabilita a primeira tentativa
    }
  }

  tocarNota(tecla.getAttribute('data-nota')); //chamamento da função para que a nota seja tocada

  if (tecla.className.includes("preta")) {
    tecla.classList.add("preta-pressionada"); // muda o estilo da nota pressionada
    return;
  }
  tecla.classList.add("branca-pressionada");
};

const clicoumouseup = (tecla) => {
  if (tecla.className.includes("preta")) {
    tecla.classList.remove("preta-pressionada");  //remove o estilo da nota que havia sido pressionada
    return;
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
  contador = 0
  resp.innerText = "Acertos: " + contador;
  resetTeclas()
})

