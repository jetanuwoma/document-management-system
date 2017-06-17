module.exports = (sequelize, DataTypes) => {
  const InvalidTokens = sequelize.define('ExpiredTokens',
    {
      token: {
        type: DataTypes.STRING,
        unique: true
      }
    });
  return InvalidTokens;
};
