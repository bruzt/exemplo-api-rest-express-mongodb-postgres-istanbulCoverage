const postgres = require('../../databases/postgres/postgresConnection');
const Sequelize = require('sequelize');

const userSchema = {
    name: 'TB_USERS',
    schema: {
        id: {
            type: Sequelize.INTEGER, // ID INT
            primaryKey: true, // PRIMARY KEY
            autoIncrement: true // GENERATED ALWAYS AS IDENTITY
        },
        username: {
            type: Sequelize.STRING, // NAME TEXT
            allowNull: false, // NOT NULL
            unique: true
        },
        email: {
            type: Sequelize.STRING, // POWER TEXT
            allowNull: false, // NOT NULL
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING, // POWER TEXT
            allowNull: false, // NOT NULL
            validate: {
                len: {
                    args: 3
                }
            }
        },

    },
    options: {
        //tableName: 'TB_USERS', // nome da tabela
        freezeTableName: true, // não altera o nome da tabela
        timestamps: true // cria capos createdAt e updatedAt
    }
};

const model = postgres.define(userSchema.name, userSchema.schema, userSchema.options);
model.sync(); // { logging: console.log }

module.exports = model;