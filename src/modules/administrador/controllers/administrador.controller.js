import bcrypt from "bcryptjs";
import AdministradorModel from "../models/administrador.model.js";

class AdministradorController {
    static async cadastrar(requisicao, resposta) {
        try {
            const { id, nome, email, senha } = requisicao.body
            if (!id || !nome || !email || !senha) {
                return resposta.status(400).json({ mensagem: "Todos os Campos são obrigatorios!" })
            }
            const totalAdmin = await AdministradorModel.contarAdmins()
            if (totalAdmin > 0) {
                return resposta.status(409).json({ mensagem: "Administrador ja cadastrado" })
            }
            if (senha.lenght < 8) {
                return resposta.status(403).json({ mensagem: "A Senha deve ter no Minimo 8 Caracteres" })
            }
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/
            if (!regex.test(senha)) {
                return resposta.status(403).json({ mensagem: "Senha invalida! A senha deve conter: 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial (ex: @, #, $, %)" })
            }
            const salt = bcrypt.genSaltSync(10);
            const hashSenha = bcrypt.hashSync(senha, salt);
            const administrador = await AdministradorModel.cadastrar(id, nome, email, senha = hashSenha)
            return resposta.status(201).json({ mensagem: "Usuario administrador criado com sucesso!" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao cadastrar administrador", erro: error.message })


        }
    }
}