import conect from "../../../config/database.js"
class EscalaModel {
    static async cadastrar(codigo, identidadeMilitar, dataServico, tipoServico) {
        const values = [codigo, identidadeMilitar, dataServico, tipoServico]
        const query = `insert into escala (codigo,identidadeMilitar,dataServiço,tipoServico) values($1,$2,$3,$4) RETURNING* `
        const resultado = await conect.query(query, values)
        return resultado.rows[0]
    }
    static async listar() {
        const query = `select * from escala`
        const resultado = await conect.query(query)
        return resultado;
    }

    static async listarCodigo() {
        const values = [codigo]
        const query = `select * from escala where codigo = $1`
        const resultado = await conect.query(query, values)
        return resultado;
    }

    static async editarTotal(codigo, identidadeMilitar, dataServico, tipoServico) {
        const escala = await EscalaModel.listarCodigo(codigo);
        if (escala.length === 0) {
            return null;
        }
        const values = [codigo, identidadeMilitar, dataServico, tipoServico]
        const query = `update escala
        set dataServico = $2 , tipoServico = $3
        where codigo = $1 returning`
        const resultado = await conect.query(query, values)
        return resultado.rows[0]
    }
    static async editarParcial(codigo, identidadeMilitar, dataServico, tipoServico) {
        const escala = await EscalaModel.listarCodigo(codigo);
        if (escala.length === 0) {
            return null;
        }
        const values = [codigo, identidadeMilitar, dataServico, tipoServico]
        const query = `update escala
        set dataServico = coalesce($2,dataServico) , tipoServico = coalesce($3,tipoServico)
        where codigo = $1 returning*;`
        const resultado = await conect.query(query, values)
        return resultado.rows[0]
    }
    static async excluirCodigo(codigo) {
        const escala = await EscalaModel.listarCodigo(codigo);
        if (escala.length === 0) {
            return null;
        }
        const values = [codigo]
        const query = `delete from escala where codigo = $1 returning*`
        const resultado = await conect.query(query, values)
        return resultado.rows[0]
    }

    static async excluirTodos(){
        const query = `delete from evento returning*`
        const resultado = await conect.query(query)
        return resultado.rows
    }
}

export default EscalaModel;