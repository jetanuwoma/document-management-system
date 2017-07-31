'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'fullNames', 'fullName')
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.renameColumn('Users', 'fullName', 'FullNames')
  }
};
