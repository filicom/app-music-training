const frm = document.querySelector("form")  //formulário com os botões
const resp = document.querySelector("h3")  //saída para contador de acertos
const teclas = document.querySelectorAll(".tecla");      //seleciona todas teclas


teclas.forEach((tecla) => {
  tecla.addEventListener("mousedown", () => clicoumousedown(tecla))        //evento para cada tecla após clicar
  tecla.addEventListener("mouseup", () => clicoumouseup(tecla))
})

const clicoumousedown = (tecla) => {
  tocarNota(tecla.getAttribute('data-nota'))     //altera estilo da tecla após clicar

  if (tecla.className.includes("preta")) {
      tecla.classList.add("preta-pressionada")
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

const tocarNota = (nota) => {
  const audio = new Audio(`../notas/${nota}.wav`)   //busca da nota no arquivo de audio
  audio.play()
}

const RandomNumber = () => {
return  Math.floor(Math.random()*25) + 1     //gera numero aleatório entre 1 e 25
}

frm.addEventListener("submit", (e) => {
    e.preventDefault()                      //submit para gerar nota aleatória
 tocarNota(RandomNumber())
    
})





