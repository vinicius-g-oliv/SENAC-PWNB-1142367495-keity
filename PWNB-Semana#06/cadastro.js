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

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10) {
        primeiroDigito = 0;
    }
    if (primeiroDigito !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10) {
        segundoDigito = 0;
    }
    if (segundoDigito !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
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

function redirecionarParaPaginaUsuarioLogado() {
       window.location.href = 'usuarioLogado.html';
}

// Função para validar o formulário de login
function validarCadastro() {
	   
    redirecionarParaPaginaUsuarioLogado();
}

/*document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const loginButton = document.getElementById('loginButton');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário padrão
        validarCadastro();
    });
    
    cadastrar.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do botão
        validarCadastro();
    });
});*/
