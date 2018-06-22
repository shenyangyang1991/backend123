'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('User', {
    wallet_id: {
      type: INTEGER(11).UNSIGNED,
    },
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
        attributes: ['wallet_id', 'nick_name', 'avatar_url', 'open_id'],
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
      app.ctx.logger.error(error);
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
      app.ctx.logger.error(error);
      return {
        error: true,
      };
    }
  }

  User.createUser = async function (user, t) {
    try {
      let row = await this.create(user, {
        fields: ['wallet_id', 'nick_name', 'avatar_url', 'open_id'],
        transaction: t,
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
      app.ctx.logger.error(error);
      return {
        error: true,
      };
    }
  }

  return User;
}