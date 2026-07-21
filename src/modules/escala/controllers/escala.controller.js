import EscalaModel from "../models/escala.models.js"

class EscalaController {
    static async cadastrar(requisicao, resposta) {
        try {
            const { codigo, identidadeMilitar, dataServico, tipoServico } = requisicao.body
            if (!codigo || !identidadeMilitar) {
                return resposta.status(400).json({ mensagem: "Todos os campos são obrigatorios!" })
            }
            const escala = await EscalaModel.cadastrar(codigo, identidadeMilitar, dataServico, tipoServico)
            resposta.status(200).json({ mensagem: "Escala publicada com sucesso!" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao publicar Escala de Serviço!", erro: error.message })
        }
    }
    static async listar(requisicao, resposta) {
        try {
            const escalas = await EscalaModel.listar()
            if (escalas.rows.length === 0) {
                return resposta.status(200).json({ mensagem: "Nenhuma Escala publicada" })
            }
            resposta.status(200).json(escalas.rows);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao encontrar Escala ", erro: error.message })
        }
    }
    static async listarCodigo(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const escala = await EscalaModel.listarCodigo(codigo)
            if (!escala) {
                resposta.status(404).json({ mensagem: "Escala não encontrada" })
            }
            resposta.status(200).json(escala.rows);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao Encontrar Escala", erro: error.message });
        }
    }
    static async editarTotal(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const identidadeMilitar = requisicao.params.identidadeMilitar
            const { novaDataServico, novoTipoServico } = requisicao.body
            const escala = await EscalaModel.editarTotal(codigo, identidadeMilitar, novaDataServico, novoTipoServico)
            if (!escala) {
                return resposta.status(200).json({ mensagem: "Escala não encontrada" })
            }
            resposta.status(200).json(escala);

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar Escala!", erro: error.message })
        }
    }
    static async editarParcial(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo
            const { novaDataServico, novoTipoServico } = requisicao.body
            const escala = await EscalaModel.editarParcial(codigo, novaDataServico, novoTipoServico)
            return resposta.status(200).json({ mensagem: "Escala editada com sucesso" })
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar Escala!", erro: error.message })
        }
    }
    static async excluirTodos(requisicao, resposta) {
        try {
            await EscalaModel.excluirTodos();
            resposta.status(200).json({ mensagem: "Todas as escalas foram excluidas" })

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir todas as escalas!", erro: error.message })
        }
    }
    static async excluirCodigo(requisicao, resposta) {
        try {
            const codigo = requisicao.params.codigo

            const escala = await EscalaModel.excluirCodigo(codigo);

            if (!escala) {
                return resposta.status(404).json({ mensagem: "Escala Não encontrada!" });
            }
            resposta.status(200).json({ mensagem: "Escala excluido com sucesso!" });

        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao excluir escala", erro: error.message })
        }
    }

}

export default EscalaController