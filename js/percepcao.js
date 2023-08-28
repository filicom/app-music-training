const iniciar = document.getElementById("iniciar");
const novamente = document.getElementById("tentar-novamente");
const resp = document.querySelector("h3");
const teclas = document.querySelectorAll(".tecla");

let contador = 0;
let NotaAleatoria = "";
let NotaTocada = "";
let primeiraTentativa = true; //  variável para controlar a primeira tentativa

const clicoumousedown = (tecla) => {
  if (primeiraTentativa) {
    NotaTocada = tecla.getAttribute('data-nota');

    if (NotaTocada === NotaAleatoria) {
      contador++;
      resp.innerText = "Acertos: " + contador;
      primeiraTentativa = false;
    } else {
      primeiraTentativa = false; // Se a nota errada foi tocada, desabilita a primeira tentativa
    }
  }
 
  tocarNota(tecla.getAttribute('data-nota'));

  if (tecla.className.includes("preta")) {
    tecla.classList.add("preta-pressionada");
    return;
  }
  tecla.classList.add("branca-pressionada");
};

const clicoumouseup = (tecla) => {
  if (tecla.className.includes("preta")) {
    tecla.classList.remove("preta-pressionada");
    return;
  }
  tecla.classList.remove("branca-pressionada");
};

const tocarNota = (nota) => {
  const audio = new Audio(`../notas/${nota}.wav`);
  audio.play();
};

const RandomNumber = () => {
  return Math.floor(Math.random() * 25) + 1;
};

teclas.forEach((tecla) => {
  tecla.addEventListener("mousedown", () => clicoumousedown(tecla));
  tecla.addEventListener("mouseup", () => clicoumouseup(tecla));
  tecla.addEventListener("mouseout", () => clicoumouseup(tecla));
  tecla.addEventListener("mouseleave", () => clicoumouseup(tecla));
});

iniciar.addEventListener("click", () => {
  NotaAleatoria = teclas[RandomNumber() - 1].getAttribute('data-nota')
  tocarNota(NotaAleatoria);
  resp.innerText = "Acertos: " + contador;
  primeiraTentativa = true; // Reseta a primeira tentativa ao clicar em "Iniciar"
});

novamente.addEventListener("click", () => {
  contador = 0
  resp.innerText = "Acertos: " + contador;
})