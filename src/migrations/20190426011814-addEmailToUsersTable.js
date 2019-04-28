'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    Examples:
    return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    
    return queryInterface.addColumn('tableName', 'columnName', {
    */

    return queryInterface.addColumn('tb_users', 'email', { 

      type: Sequelize.STRING,
      
    }).then( () => {

      // queryInterface.sequelize.query(`UPDATE tb_users SET email = 'none' WHERE email is null`);
    
    }).then( () => {
      
      queryInterface.changeColumn('tb_users', 'email', { 
        type: Sequelize.STRING,
        // allowNull: false,
        unique: true
      
      });
    });
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.removeColumn('tb_users', 'email');
   
  }
};
