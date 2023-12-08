// Função para redirecionar o usuário para a página de usuário logado
function redirecionarParaPaginaUsuarioLogado() {
    window.location.href = 'usuarioLogado.html';
}

// Função para validar o formulário de login
function validarLogin() {
    const usernameInput = document.getElementById('username');

    if (usernameInput.value.trim() === '') {
        alert('Por favor, insira seu e-mail.');
        return;
    }

    // Obter a lista de clientes do localStorage
    const listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Encontrar o cliente com base no e-mail
    const cliente = listaClientes.find(cliente => cliente.email === usernameInput.value);

    if (!cliente) {
        alert('Usuário não encontrado. Verifique o e-mail fornecido.');
        return;
    }

    // Redirecione para a página de usuário logado
    redirecionarParaPaginaUsuarioLogado();
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const loginButton = document.getElementById('loginButton');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário padrão
        validarLogin();
    });

    loginButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do botão
        validarLogin();
    });
});
