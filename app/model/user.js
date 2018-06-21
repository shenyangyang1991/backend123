'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('User', {
    nick_name: {
      type: STRING(16),
      allowNull: false,
    },
    avatar_url: {
      type: STRING,
      allowNull: false,
    },
    open_id: {
      type: STRING,
      allowNull: false,
    },
  });

  User.findByOpenId = async function (open_id) {
    try {
      let row = await this.findOne({
        where: {
          open_id
        },
        attributes: ['nick_name', 'avatar_url', 'open_id'],
      });
      if (row) {
        let result = row.get({
          plain: true,
        });
        return result;
      } else {
        return null;
      }
    } catch (error) {
      return {
        error: true,
      };
    }
  }

  User.updateUser = async function (open_id, user) {
    try {
      let row = await this.update(user, {
        where: {
          open_id,
        },
      });
      return row;
    } catch (error) {
      return {
        error: true,
      };
    }
  }

  User.saveUser = async function (user) {
    try {
      let row = await this.create(user, {
        fields: ['nick_name', 'avatar_url', 'open_id'],
      });
      if (row) {
        let result = row.get({
          plain: true,
        });
        return result;
      } else {
        return null;
      }
    } catch (error) {
      return {
        error: true,
      };
    }
  }

  return User;
}