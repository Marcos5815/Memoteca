import api from "./api.js"

const ui = {

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscaPensamentoPorId(pensamentoId);
        document.querySelector("#pensamento-id").value = pensamento.id;
        document.querySelector("#pensamento-conteudo").value = pensamento.conteudo;
        document.querySelector("#pensamento-autoria").value = pensamento.autoria;
        document.querySelector("#pensamento-data").value = pensamento.data.
        toISOString().split("T")[0];
        document.querySelector("#form-container").scrollIntoView()
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {
        const listaPensamentos = document.querySelector("#lista-pensamentos");
        listaPensamentos.innerHTML = "";

        try {
            let pensamentosParaRenderizar;
            if(pensamentosFiltrados){
                pensamentosParaRenderizar = pensamentosFiltrados
            } else {
                pensamentosParaRenderizar = await api.buscaPensamentos();
            }
            
            pensamentosParaRenderizar.forEach(ui.adicionarPensamentoNaLista);
        } catch {
            alert("Erro ao renderizar pensamentos");
        }

    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.querySelector("#lista-pensamentos");

        const li = document.createElement("li");
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");
        
        const iconeAspas = document.createElement("img");
        iconeAspas.src = "./assets/imagens/aspas-azuis.png";
        iconeAspas.alt = "Aspas azuis";
        iconeAspas.classList.add("icone-aspas");

        const pensamentoConteudo = document.createElement("div");
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const pensamentoAutoria = document.createElement("div");
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria");

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timezone: "UTC"
        }

        const pensamentoData = document.createElement("div");
        const dataFormatada = pensamento.data.toLocaleDateString("pt-BR", options);
        const dataComRegex = dataFormatada.replace(/^(\w)/, (match) => match.toUpperCase());

        pensamentoData.textContent = dataComRegex;
        pensamentoData.classList.add("pensamento-data");

        
        
        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "./assets/imagens/icone-editar.png";
        iconeEditar.alt = "Botão de editar";
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            const confirmar = confirm("O card será excluído, deseja continuar ?")
            if(confirmar) {
                try {
                    await api.excluirPensamento(pensamento.id);
                    ui.renderizarPensamentos();
                } catch  {
                    alert("Erro ao excluir pensamento");
                }
            }
        }

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            try {
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito);
                ui.renderizarPensamentos();
            } catch (error) {
                alert("Erro ao atualizar pensamento");
            }
        }

        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = pensamento.favorito ? 
        "./assets/imagens/icone-favorito.png" :
        "./assets/imagens/icone-favorito_outline.png";
        iconeFavorito.alt = "Icone de favorito"
        botaoFavorito.appendChild(iconeFavorito);

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "./assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Botão de excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito);
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(pensamentoData);
        li.appendChild(icones);
        listaPensamentos.appendChild(li);


    }
}

export default ui;