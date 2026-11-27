// server.js
const app = require('./src/app');
const PORT = process.env.PORT || 3000;

// Cria um gerente inicial se ainda não existir nenhum usuário
usuariosModel.criarGerentePadrao();

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
