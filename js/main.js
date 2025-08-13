import ui from "./ui.js"
import api from "./api.js"


const btnCancelar = document.querySelector("#botao-cancelar");

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.querySelector("#pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);

    const inputBusca = document.querySelector("#campo-busca");
    inputBusca.addEventListener("input", manipularBusca);

})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.querySelector("#pensamento-id").value;    
    const conteudo = document.querySelector("#pensamento-conteudo").value;    
    const autoria = document.querySelector("#pensamento-autoria").value; 
    const data = document.querySelector("#pensamento-data").value; 

    if(!validarData(data)){
        alert("Não é permitido o cadastro de datas futuras");
        return
    }

    try {
        if(id) {
            await api.editarPensamento({id, conteudo, autoria, data})
            ui.renderizarPensamentos()
        } else {
            await api.salvarPensamento({conteudo, autoria, data})
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

async function manipularBusca() {
    const termoBusca = document.querySelector("#campo-busca").value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
        console.log(pensamentosFiltrados)
    } catch (error) {
        alert("Erro ao realizar busca");
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual
}