import ui from "./ui.js"
import api from "./api.js"


const btnCancelar = document.querySelector("#botao-cancelar");

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.querySelector("#pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.querySelector("#pensamento-id").value;    
    const conteudo = document.querySelector("#pensamento-conteudo").value;    
    const autoria = document.querySelector("#pensamento-autoria").value;  

    try {
        if(id) {
            await api.editarPensamento({id, conteudo, autoria})
            ui.renderizarPensamentos()
        } else {
            await api.salvarPensamento({conteudo, autoria})
            ui.renderizarPensamentos()
        }
    } catch  {
        alert("Erro ao salvar pensamentos");
        throw Error
    }
}

btnCancelar.addEventListener("click", (evento) => {
    evento.preventDefault();
    const conteudo = document.querySelector("#pensamento-conteudo");    
    const autoria = document.querySelector("#pensamento-autoria");  
    conteudo.value = "";
    autoria.value = "";

})