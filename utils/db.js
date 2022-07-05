import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.MYSQLDB_DB_NAME, process.env.MYSQLDB_USERNAME, process.env.MYSQLDB_PASSWORD, {
    host: process.env.MYSQLDB_HOST,
    port: process.env.MYSQLDB_PORT,
    dialect: 'mysql',
})


export default sequelize;