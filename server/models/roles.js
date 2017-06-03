module.exports = (sequelize, DataTypes) => {
  // Define Role DataTypes
  const Roles = sequelize.define('Roles', {
    title: { type: DataTypes.STRING, unique: true },
    read: { type: DataTypes.BOOLEAN, defaultValue: false },
    write: { type: DataTypes.BOOLEAN, defaultValue: false },
    delete: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  return Roles;
};
