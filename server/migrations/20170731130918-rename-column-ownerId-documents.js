'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Documents', 'OwnerId', 'ownerId')
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.renameColumn('Documents', 'ownerId', 'OwnerId')
  }
};
