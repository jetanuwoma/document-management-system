module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        unique: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      permission: {
        type: Sequelize.TEXT,
        defaultValue: 'public'
      },
      OwnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Documents',
          key: 'id',
          as: 'OwnerId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Documents');
  }
};
