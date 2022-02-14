const express = require('express');
const app = express(); // instancia o express
const data = require('./data.json'); // dados fake dos clientes. Aqui seria a conexao com o DB

app.use(express.json()); // aqui fala pro express usar json

app.get('/clients', function(req, res){ // req de request ou pedido e res de response ou resposta
    res.json(data)
});

app.get("/clients/:id", function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
  
    if (!client) return res.status(204).json();
  
    res.json(client);
  });

app.post('/clients/:id', function(req, res) {
    const { name, email } = req.body;
  
    // salvar
    res.json({ name, email });
});

app.put('/clients/:id', function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
  
    if (!client) return res.status(204).json();
  
    const { name } = req.body;
  
    client.name = name;
  
    res.json(client);
});

app.delete('/clients/:id', function(req, res) {
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id);
  
    res.json(clientsFiltered);
});

app.listen(3000, function() {
    console.log("server is running bitch!!!");
})