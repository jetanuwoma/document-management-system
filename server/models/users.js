import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      unique: true,
      type: DataTypes.STRING,
      validate: { is: /\w+$/i }
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { is: /\w+$/i }
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Users.belongsTo(models.Roles, {
          onDelete: 'CASCADE',
          foreignKey: 'roleId'
        });
      }
    },
    instanceMethods: {
      /**
       * validate plain password against user's hashed password
       * @method
       * @param {String} password
       * @returns {Boolean} Validity of passowrd
       */
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * Hash input password using bcrypt
       * @method
       * @returns {void} no return
       */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },

    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return Users;
};
