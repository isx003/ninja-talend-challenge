import { Sequelize, Dialect } from "sequelize";

const DB_NAME = process.env.DB_NAME as string
const DB_USER = process.env.DB_USER as string
const DB_PASS = process.env.DB_PASS as string

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as Dialect,
})

try {
  async () => await connection.authenticate()
} catch (error) {
  console.error("Unable to connect to the database:", error)
}

export default connection;