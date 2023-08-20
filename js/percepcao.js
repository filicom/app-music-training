const teclas = document.querySelectorAll(".tecla");
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
    tecla.style.background = "#ddd"
}
const clicoumouseup = (tecla) => {
    if (tecla.className.includes("preta")) {
        tecla.classList.remove("preta-pressionada")
        return;
    }
    tecla.style.background = "white"
}
teclas.forEach((tecla) => {
    tecla.addEventListener("mousedown", () => clicoumousedown(tecla))
    tecla.addEventListener("mouseup", () => clicoumouseup(tecla))
})