'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('items', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true
      },
      userid: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      groups: {
        type: Sequelize.TEXT
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('items');
  }
};
