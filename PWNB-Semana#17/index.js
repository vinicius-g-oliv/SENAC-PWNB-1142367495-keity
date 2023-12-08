const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Simulando o cadastro em um array de objetos
let clientes = [];

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Endpoints

// Inclusão de cliente (Método POST)
app.post('/clientes', (req, res) => {
  const novoCliente = req.body;
  clientes.push(novoCliente);
  res.json({ mensagem: 'Cliente adicionado com sucesso', cliente: novoCliente });
});

// Ler cliente específico (Método GET)
app.get('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const cliente = clientes.find((c) => c.id === clienteId);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
});

// Lista de todos os clientes (Método GET)
app.get('/clientes', (req, res) => {
  res.json(clientes);
});

// Alteração de cliente (Método PUT)
app.put('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const clienteIndex = clientes.findIndex((c) => c.id === clienteId);
  if (clienteIndex !== -1) {
    clientes[clienteIndex] = { ...clientes[clienteIndex], ...req.body };
    res.json({ mensagem: 'Cliente atualizado com sucesso', cliente: clientes[clienteIndex] });
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
});

// Exclusão de cliente (Método DELETE)
app.delete('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  clientes = clientes.filter((c) => c.id !== clienteId);
  res.json({ mensagem: 'Cliente excluído com sucesso' });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
