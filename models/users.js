const { Sequelize} = require('sequelize');
const sequelize = require('../utils/db');

const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
{
    tableName: 'users'
}
);



module.exports = users;