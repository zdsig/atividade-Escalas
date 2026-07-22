import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pg

const conect = new Pool({

    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})

try {
    await conect.query(`select 1+1`)
    console.log("Conexão realizada com sucesso")
} catch (error) {
console.error({mensagem:"Erro ao iniciar o banco" , erro: error.message})
}

export default conect


