const postgres = require('../../databases/postgres/postgresConnection');
const Sequelize = require('sequelize');

const userSchema = {
    name: 'TB_USERS',
    schema: {
        id: {
            type: Sequelize.INTEGER, // ID INT
            allowNull: false, // NOT NULL
            primaryKey: true, // PRIMARY KEY
            autoIncrement: true // GENERATED ALWAYS AS IDENTITY
        },
        username: {
            type: Sequelize.STRING, // NAME TEXT
            allowNull: false, // NOT NULL
            unique: true
        },
        password: {
            type: Sequelize.STRING, // POWER TEXT
            allowNull: false // NOT NULL
        },

    },
    options: {
        tableName: 'TB_USERS', // nome da tabela
        freezeTableName: true, // não altera o nome da tabela
        timestamps: true // cria capos createdAt e updatedAt
    }
};

const model = postgres.define(userSchema.name, userSchema.schema, userSchema.options);
model.sync();

module.exports = model;