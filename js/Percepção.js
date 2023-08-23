const frm = document.querySelector("form")  //formulário com os botões
const resp = document.querySelector("h3")  //saída para contador de acertos



frm.addEventListener("submit", (e) => {
    e.preventDefault()                      //submit para gerar nota aleatória
 tocarNota(RandomNumber())
    
})

const tocarNota = (nota) => {
    const audio = new Audio(`../notas/${nota}.wav`)   //busca da nota no arquivo de audio
    audio.play()
}

const RandomNumber = () => {
  return  Math.floor(Math.random()*25) + 1     //gera numero aleatório entre 1 e 25
}
