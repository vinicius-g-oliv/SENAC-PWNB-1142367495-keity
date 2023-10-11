
function validarEmail() {
	console.log('Evento onblur chamado');
    var email = document.getElementById('username').value;
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (regex.test(email)) {
        alert('Email válido!');
    } else {
        alert('Email inválido. Por favor, insira um email válido.');
    }
}

// Função para redirecionar o usuário para a página de usuário logado
function redirecionarParaPaginaUsuarioLogado() {
       window.location.href = 'usuarioLogado.html';
}

// Função para validar o formulário de login
function validarLogin() {
	const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    redirecionarParaPaginaUsuarioLogado();
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const loginButton = document.getElementById('loginButton');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário padrão
        validarLogin();
    });
    
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do botão
        validarLogin();
    });
});







