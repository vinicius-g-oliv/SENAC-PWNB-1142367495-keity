
var scriptBuscarRuaPorCep = document.createElement('script');
scriptBuscarRuaPorCep.src = 'caminho/para/buscarRuaPorCep.js';
document.head.appendChild(scriptBuscarRuaPorCep);

var frmCadCliente = document.getElementById("frm-cad-cliente");
var frmCepInput = document.getElementById("cep");
var frmRuaInputId = "endereco"; 

function validarCEPFormato(cep) {
    return /^\d{5}-\d{3}$/.test(cep);
}

function validarCep() {
    var frmCepCliente = frmCepInput.value.trim();

    if (frmCepCliente !== "" && !validarCEPFormato(frmCepCliente)) {
        alert("Formato de CEP inválido. Por favor, use o formato nnnnn-nnn, onde n é um dígito numérico.");
        frmCepInput.focus();
        frmCepInput.value = "";
        return false;
    }

    return true;
}

function buscarRuaPorCep(cep, ruaInputId) {
    var apiUrl = "https://viacep.com.br/ws/" + cep + "/json/";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                var ruaInput = document.getElementById(ruaInputId);
                ruaInput.value = data.logradouro;
            } else {
                alert("CEP não encontrado");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar rua:", error);
            alert("Erro ao buscar rua.");
        });
}

frmCepInput.addEventListener("blur", function() {
    if (validarCep()) {
        var cep = frmCepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            buscarRuaPorCep(cep, frmRuaInputId);
        }
    }
});

frmCadCliente.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarCep()) {
        return;
    }

    // Obtenha os dados do formulário
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var aniversario = document.getElementById("aniversario").value;
    var cep = frmCepInput.value;
    var endereco = document.getElementById("endereco").value;
    var numero = document.getElementById("numero").value;
    var uf = document.getElementById("uf").value;

    // Crie um objeto com os dados do cliente
    var cliente = {
        nome: nome,
        sobrenome: sobrenome,
        aniversario: aniversario,
        cep: cep,
        endereco: endereco,
        numero: numero,
        uf: uf
    };

    // Obtenha a lista de clientes existente no localStorage ou inicialize uma lista vazia
    var listaClientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Adicione o novo cliente à lista
    listaClientes.push(cliente);

    // Armazene a lista atualizada no localStorage
    localStorage.setItem("clientes", JSON.stringify(listaClientes));

    // Redirecione para a página de consulta
    window.location.href = "consultarClientesPage.html";
});

var btnListarClientes = document.getElementById("listar");
btnListarClientes.addEventListener("click", function (e) {
    e.preventDefault();
    // Redirecione para a página de consulta
    window.location.href = "consultarClientesPage.html";
});
