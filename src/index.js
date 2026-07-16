import express from "express";
import dotenv from "dotenv";
import router from "./modules/escalas/routes/escala.routes.js";

dotenv.config();

const app = express();

app.use(express.json())

app.use(router)

const port = process.env.PORTA;

app.get("/", (requisicao, resposta) => {
  try {
    resposta.status(200).json({
      mensagem: "API funcionando com sucesso!",
      status: "ok",
      date: new Date().toLocaleString("pt-BR", { timeZone: "America/Recife" })
    })
  } catch (error) {
    resposta.status(500).json({ mensagem: "Erro ao subir o servidor!", erro: error.mensagem });
  }

})


app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});
