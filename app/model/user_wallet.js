'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const UserWallet = app.model.define('UserWallet', {
    hfc: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
    hf: {
      type: INTEGER(11),
      allowNull: false,
      defaultValue: 0,
    },
  });

  UserWallet.createWallet = async function (wallet, t) {
    try {
      let row = await this.create(wallet, {
        fields: ['hfc', 'hf'],
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

  UserWallet.findById = async function (id) {
    try {
      let row = await this.findOne({
        where: {
          id
        },
        attributes: ['hfc', 'hf'],
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

  UserWallet.updateWallet = async function (id, wallet, t) {
    try {
      let row = await this.update(wallet, {
        where: {
          id,
        },
        transaction: t,
      });
      return row;
    } catch (error) {
      app.ctx.logger.error(error);
      return {
        error: true,
      };
    }
  }

  return UserWallet;
}