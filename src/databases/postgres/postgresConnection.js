const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const postgres = new Sequelize(
    //'postgres://cliente1:123@localhost:5432/users',
    `${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`,
    {
        quoteIdentifiers: false, // torna nomes das tabelas e atributo case-insensitive
        operatorsAliases: false,
        logging: false,
        ssl: false,
        dialectOptions: {
            ssl: false
        }
    }
);

module.exports = postgres;