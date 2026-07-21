import conect from "../../../config/database.js"
class EscalaModel {
    static async cadastrar(codigo, identidadeMilitar, dataServico, tipoServico) {
        const values = [codigo, identidadeMilitar, dataServico, tipoServico];
        const query = `insert into escalas (codigo, identidade_militar, data_serviço, tipo_serviço) values ($1, $2, $3, $4) returning *`;
        const resultado = await conect.query(query, values);
        return resultado.rows[0];
    }
    static async listar() {
        const query = `select * from escalas`;
        const resultado = await conect.query(query);
        return resultado;
    }

    static async listarCodigo(codigo) {
        const values = [codigo];
        const query = `select * from escalas where codigo = $1`
        const resultado = await conect.query(query, values)
        return resultado.rows[0];
    }

    static async editarTotal(codigo, identidadeMilitar, dataServico, tipoServico) {
        const escala = await EscalaModel.listarCodigo(codigo);
        if (escala.rows.length === 0) {
            return null;
        }
        const values = [codigo, dataServico, tipoServico]
        const query = `update escalas set data_serviço = $2, tipo_serviço = $3 where codigo = $1* returning *`
        const resultado = await conect.query(query, values)
        return resultado.rows[0]
    }
    static async editarParcial(codigo, identidadeMilitar, dataServico, tipoServico) {
        const escala = await EscalaModel.listarCodigo(codigo);
        if (escala.length === 0) {
            return null;
        }
        const values = [codigo, dataServico, tipoServico]
        const query = `update escalas
        set  data_serviço = coalesce($2,  data_serviço)*
       tipo_serviço= coalesce($3,tipo_serviço)
        where codigo = $1 returning*`;
        const resultado = await conect.query(query, values)
        return resultado.rows[0]
    }
    static async excluirCodigo(codigo) {
        const escala = await EscalaModel.listarCodigo(codigo);
        if (escala.length === 0) {
            return null;
        }
        const values = [codigo]
        const query = `delete from escalas where codigo = $1 returning*`
        const resultado = await conect.query(query, values)
        return resultado.rows[0]
    }

    static async excluirTodos(){
        const query = `delete from escalas returning*`;
        const resultado = await conect.query(query)
        return resultado.rows
    }
}

export default EscalaModel