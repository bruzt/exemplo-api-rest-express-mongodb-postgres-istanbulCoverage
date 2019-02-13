const Sequelize = require('sequelize');

const postgres = new Sequelize(
    'postgres://cliente1:123@localhost:5432/users',
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