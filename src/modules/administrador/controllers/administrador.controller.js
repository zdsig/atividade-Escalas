import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
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
            const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/
            if (!regexSenha.test(senha)) {
                return resposta.status(403).json({ mensagem: "Senha invalida! A senha deve conter: 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caractere especial (ex: @, #, $, %)" })
            }
            const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
            if (!regexEmail.test(email)) {
                return resposta.status(403).json({ mensagem: "Email invalido! Por favor, informe um Email valido" })

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
class AdministradorController {
    static async cadastrar(requisicao, resposta) {
    }
    static async login(requisicao, resposta) {
        try {
            const { email, senha } = requisicao.body
            if (!email || !senha) {
                return resposta.status(403).json({ mensagem: "Forneça o e-mail e a senha para o login" })
            }
            const administrador = await AdministradorModel.buscarPorEmail(email)
            if (administrador.length === 0) {
                return resposta.status(400).json({ mensagem: "Usuario Não encontrado!" });
            }
            if (administrador.ativo === false) {
                return resposta.status(403).json({ mensagem: "Administrador inativo" })
            }
            const verificarSenha = await bcrypt.compareSync(senha, administrador.senha);
            if (!verificarSenha) {
                return resposta.status(403).json({ mensagem: "Email ou senha incorreta!" })
            }
            const token = jwt.sign(
                {
                    id: administrador.id,
                    nome: administrador.nome,
                    email: administrador.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_TEMPO_EXPIRACAO 
                }
            );
            return resposta.status(200).json({ mensagem: "Login realizado com sucesso.", token })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Error interno ao efetuar login", erro: error.message })

        }
    }
    static async perfil(requisicao, resposta){
        try {
            const administrador = await AdministradorModel.buscarPorEmail(requisicao.administrador.email)
            if(administrador.length === 0){
                return resposta.status(409).json({mensagem: "Usuario prescisa fazer login!"});
            }
            resposta.status(200).json(administrador)
        } catch (error) {
            resposta.status(500).json({ mensagem: "Error ao buscar perfil do usuario", erro: error.message })
        }
    }
}
