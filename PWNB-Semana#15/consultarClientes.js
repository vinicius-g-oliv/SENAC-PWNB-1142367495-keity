// Função para carregar a tabela de clientes a partir do localStorage
function carregarTabelaClientes() {
    var tabelaClientes = document.getElementById("tabelaClientes");

    // Obter a lista de clientes do localStorage
    var listaClientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Limpar a tabela
    tabelaClientes.innerHTML = "<tr><th>Nome</th><th>Sobrenome</th><th>Data de Nascimento</th><th>CEP</th><th>Endereço</th><th>Número</th><th>UF</th><th>Ações</th></tr>";

    // Adicionar cada cliente à tabela
    listaClientes.forEach(function(cliente, index) {
        var row = tabelaClientes.insertRow();
        row.insertCell(0).textContent = cliente.nome;
        row.insertCell(1).textContent = cliente.sobrenome;
        row.insertCell(2).textContent = cliente.aniversario;
        row.insertCell(3).textContent = cliente.cep;
        row.insertCell(4).textContent = cliente.endereco;
        row.insertCell(5).textContent = cliente.numero;
        row.insertCell(6).textContent = cliente.uf;

        // Adicionar coluna de ações com botões de editar e excluir
        var cellAcoes = row.insertCell(7);
        var btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", function() {
            editarCliente(index);
        });
        cellAcoes.appendChild(btnEditar);

        var btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", function() {
            excluirCliente(index);
        });
        cellAcoes.appendChild(btnExcluir);
    });
}

function editarCliente(index) {
    // Obter a lista de clientes do localStorage
    var listaClientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Obter o cliente com base no índice
    var cliente = listaClientes[index];

    // Preencher os campos do formulário de cadastro com os dados do cliente
    document.getElementById("nome").value = cliente.nome;
    document.getElementById("sobrenome").value = cliente.sobrenome;
    document.getElementById("aniversario").value = cliente.aniversario;
    document.getElementById("cep").value = cliente.cep;
    document.getElementById("endereco").value = cliente.endereco;
    document.getElementById("numero").value = cliente.numero;
    document.getElementById("uf").value = cliente.uf;

    // Remover o cliente da lista (opcional, dependendo da lógica desejada)
    listaClientes.splice(index, 1);

    // Atualizar a lista no localStorage
    localStorage.setItem("clientes", JSON.stringify(listaClientes));

    // Redirecionar para a página de cadastro (opcional, dependendo da lógica desejada)
    window.location.href = "cadastro.html";
}

// Função para excluir um cliente
function excluirCliente(index) {
    // Obter a lista de clientes do localStorage
    var listaClientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Remover o cliente com base no índice
    listaClientes.splice(index, 1);

    // Atualizar a lista no localStorage
    localStorage.setItem("clientes", JSON.stringify(listaClientes));

    // Recarregar a tabela
    carregarTabelaClientes();
}

var btnVoltar = document.getElementById("voltar");
btnVoltar.addEventListener("click", function (e) {
    window.location.href = "cadastro.html";
});

// Chamar a função para carregar a tabela quando a página for carregada
document.addEventListener("DOMContentLoaded", carregarTabelaClientes);
