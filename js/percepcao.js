const iniciar = document.getElementById("iniciar");
const resp = document.querySelector("h3");
const teclas = document.querySelectorAll(".tecla");

let contador = 0;
let NotaAleatoria = "";
let NotaTocada = "";

const clicoumousedown = (tecla) => {
  if (NotaAleatoria !== "") {
    NotaTocada = tecla.getAttribute('data-nota');
    
    if (NotaTocada === NotaAleatoria) {
      contador++;
      resp.innerText = "Acertos: " + contador; 
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
});

iniciar.addEventListener("click", () => { 
  NotaAleatoria = teclas[RandomNumber() - 1].getAttribute('data-nota');
  tocarNota(NotaAleatoria);
  resp.innerText = "Acertos: " + contador;
});
