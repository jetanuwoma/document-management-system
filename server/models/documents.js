module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    permission: {
      type: DataTypes.TEXT,
      defaultValue: 'public'
    },

    ownerId: DataTypes.INTEGER
  },
    {
      classMethods: {
        associate(models) {
          Documents.belongsTo(models.Users, {
            onDelete: 'cascade',
            foreignKey: 'ownerId'
          });
        }
      }
    });
  return Documents;
};
