const teclas = document.querySelectorAll(".tecla");
teclas.forEach((tecla) => {
    tecla.addEventListener("mousedown", () => clicoumousedown(tecla))
    tecla.addEventListener("mouseup", () => clicoumouseup(tecla))
})
const tocarNota = (nota) => {
    const audio = new Audio(`../notas/${nota}.wav`)
    audio.play()
}

const clicoumousedown = (tecla) => {
    tocarNota(tecla.getAttribute('data-nota'))

    if (tecla.className.includes("preta")) {
        tecla.classList.add("preta-pressionada")
        return;
    }
    tecla.classList.add("branca-pressionada")

}
const clicoumouseup = (tecla) => {
    if (tecla.className.includes("preta")) {
        tecla.classList.remove("preta-pressionada")
        return;
    }
    tecla.classList.remove("branca-pressionada")
}
