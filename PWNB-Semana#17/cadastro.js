var scriptBuscarRuaPorCep = document.createElement('script');
scriptBuscarRuaPorCep.src = 'caminho/para/buscarRuaPorCep.js';
document.head.appendChild(scriptBuscarRuaPorCep);

var frmCadCliente = document.getElementById("frm-cad-cliente");
var frmCepInput = document.getElementById("cep");
var frmRuaInputId = "endereco"; 


function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || !validarDigitosRepetidos(cpf)) {
        return false;
    }
    
    return true;
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');
    if (cnpj.length !== 14 || !validarDigitosRepetidos(cnpj)) {
        return false;
    }

    return true;
}

function validarDigitosRepetidos(numero) {
    return !/^(\d)\1+$/.test(numero);
}

function exibirErro(campo, mensagem) {
    // Exibir mensagem de erro
    campo.classList.add('erro');
    alert(mensagem);
}

function limparErro(campo) {
    // Remover mensagem de erro, se existir
    campo.classList.remove('erro');
}

function validarCampoComMascara(campo, validarFuncao, mensagemErro) {
    campo.addEventListener("blur", function () {
        limparErro(campo);

        var valorCampo = campo.value.trim().replace(/\D/g, '');

        if (valorCampo !== "" && !validarFuncao(valorCampo)) {
            exibirErro(campo, mensagemErro);
        }
    });
}

// Adiciona eventos de validação para CPF e CNPJ
validarCampoComMascara(document.getElementById("cpf"), validarCPF, "CPF inválido. Por favor, insira um CPF válido.");
validarCampoComMascara(document.getElementById("cnpj"), validarCNPJ, "CNPJ inválido. Por favor, insira um CNPJ válido.");


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

async function criarSenhaCriptografada(senha, salt) {
    const encoder = new TextEncoder();
    const senhaBuffer = encoder.encode(senha);

    const derivedKey = await crypto.subtle.importKey(
        "raw",
        senhaBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000, // Ajuste o número de iterações conforme necessário
            hash: "SHA-256"
        },
        derivedKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const hashBuffer = await crypto.subtle.exportKey("raw", key);
    const hashHex = arrToHex(new Uint8Array(hashBuffer));

    return { hash: hashHex };
}

function arrToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}


function validarEmail() {
	console.log('Evento onblur chamado');
    var email = document.getElementById('email').value;
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (regex.test(email)) {
        alert('Email válido!');
    } else {
        alert('Email inválido. Por favor, insira um email válido.');
    }
}

function verificarSenha(senha) {
    // Verifica se a senha tem pelo menos 8 dígitos
    if (senha.length < 8) {
        alert('Senha inválida: A senha deve conter pelo menos 8 caracteres.');
        return false;
    }

    // Verifica se a senha contém pelo menos um caractere especial
    var caractereEspecialEncontrado = false;
    var caracteresEspeciais = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    for (var i = 0; i < senha.length; i++) {
        if (caracteresEspeciais.test(senha[i])) {
            caractereEspecialEncontrado = true;
            break;
        }
    }

    if (!caractereEspecialEncontrado) {
        alert('Senha inválida: A senha deve conter pelo menos um caractere especial.');
        return false;
    }

    return true;
}

frmCadCliente.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validarCep()) {
        return;
    }

    var cpfValue = document.getElementById("cpf").value.trim().replace(/\D/g, '');
    var cnpjValue = document.getElementById("cnpj").value.trim().replace(/\D/g, '');

    if (cpfValue !== "" && !validarCPF(cpfValue)) {
        exibirErro(document.getElementById("cpf"), "CPF inválido. Por favor, insira um CPF válido.");
        return;
    }

    if (cnpjValue !== "" && !validarCNPJ(cnpjValue)) {
        exibirErro(document.getElementById("cnpj"), "CNPJ inválido. Por favor, insira um CNPJ válido.");
        return;
    }

    // Obter os dados do formulário
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var aniversario = document.getElementById("aniversario").value;
    var email = document.getElementById("email").value;
    var cpf = document.getElementById("cpf").value;
    var rg = document.getElementById("rg").value;
    var cep = document.getElementById("cep").value;
    var endereco = document.getElementById("endereco").value;
    var numero = document.getElementById("numero").value;
    var uf = document.getElementById("uf").value;
    var ramo = document.getElementById("ramo").value;
    var nomeEmpresa = document.getElementById("nomeEmpresa").value;
    var dataCriacao = document.getElementById("dataCriacao").value;
    var cnpj = document.getElementById("cnpj").value;
    var descricao = document.getElementById("descricao").value;
    var redes = document.getElementById("redes").value;
    var senha = document.getElementById("senha").value;

    // Gerar um novo salt para cada senha
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // Criar senha criptografada
    var { hash } = await criarSenhaCriptografada(senha, salt);

    var cliente = {
        nome: nome,
        sobrenome: sobrenome,
        aniversario: aniversario,
        email: email,
        cpf: cpf,
        rg: rg,
        cep: cep,
        endereco: endereco,
        numero: numero,
        uf: uf,
        ramo: ramo,
        nomeEmpresa: nomeEmpresa,
        dataCriacao: dataCriacao,
        cnpj: cnpj,
        descricao: descricao,
        redes: redes,
        salt: arrToHex(salt), // Armazenar o salt como hexadecimal
        senha: hash // Armazenar o hash da senha
    };

    // Obter a lista de clientes existente no localStorage ou inicializar uma lista vazia
    var listaClientes = JSON.parse(localStorage.getItem("clientes")) || [];

    // Adicionar o novo cliente à lista
    listaClientes.push(cliente);

    // Armazenar a lista atualizada no localStorage
    localStorage.setItem("clientes", JSON.stringify(listaClientes));

    // Redirecionar para a página de consulta
    window.location.href = "consultarClientesPage.html";
});


var btnListarClientes = document.getElementById("listar");
btnListarClientes.addEventListener("click", function (e) {
    e.preventDefault();
    // Redirecione para a página de consulta
    window.location.href = "consultarClientesPage.html";
});