'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'RoleId', 'roleId')
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.renameColumn('Users', 'roleId', 'RoleId')
  }
};
