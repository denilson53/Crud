const Sequelize = require ('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({force:false}).then(()=>{
    console.log('tabela criada')
})
module.exports = Category;