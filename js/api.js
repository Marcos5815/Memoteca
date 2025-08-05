const api = {
    async buscaPensamentos () {
        try {
            const response = await axios.get("http://localhost:3000/pensamentos");
            return await response.data;
        }
        catch {
            alert("Erro ao buscar pensamentos");
            throw error;
        }
    },

    async salvarPensamento (pensamento) {
        try {
            const response = await axios.post("http://localhost:3000/pensamentos",pensamento);
            return await response.data;
        }
        catch {
            alert("Erro ao salvar pensamentos");
            throw error;
        }
    },

    async buscaPensamentoPorId (id) {
        try {
            const response = await axios.get(`http://localhost:3000/pensamentos/${id}`);
            return await response.data;
        }
        catch {
            alert("Erro ao buscar pensamento");
            throw error;
        }
    },

    async editarPensamento (pensamento) {
        try {
            const response = await axios.put(`http://localhost:3000/pensamentos/${pensamento.id}`, pensamento);
            return await response.data;
        }
        catch {
            alert("Erro ao editar pensamentos");
            throw error;
        }
    },
    async excluirPensamento (id) {
        try {
            const response = await axios.delete(`http://localhost:3000/pensamentos/${id}`);
            return await response.data;
        }
        catch {
            alert("Erro ao excluir pensamentos");
            throw error;
        }
    },


    
}

export default api;