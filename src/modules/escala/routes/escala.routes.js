import express from 'express'
import EscalaController from "../controllers/escala.controller.js"

const router = express.Router();

router.get("/escalas/listar",EscalaController.listar) ;
router.get("/escalas/listar/:codigo",EscalaController.listarCodigo);

router.post("/escalas/cadastrar",EscalaController.cadastrar);

router.put("/escalas/editar/total/:codigo",EscalaController.editarTotal);
router.patch("/escalas/editar/parcial/:codigo",EscalaController.editarParcial);

router.delete("/escalas/excluir/todos",EscalaController.excluirTodos);
router.delete("/escalas/excluir/:codigo",EscalaController.excluirCodigo);

export default router;