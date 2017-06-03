module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    content: DataTypes.TEXT,

    permission: {
      type: DataTypes.TEXT,
      defaultValue: 'public'
    },

    OwnerId: DataTypes.INTEGER
  },
    {
      classMethods: {
        associate(models) {
          Documents.belongsTo(models.Users, {
            onDelete: 'cascade',
            foreignKey: 'OwnerId'
          });
        }
      }
    });
  return Documents;
};
