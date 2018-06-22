'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getOpenIdByCode(code) {
    const { ctx } = this;

    let app_id = 'wxf4ae9ddb9ec77f2e';
    let app_secret = 'dacb0d4c7f111f4e7428d4ea03ae21b0';
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${app_id}&secret=${app_secret}&js_code=${code}&grant_type=authorization_code`;

    try {
      let resp = await ctx.curl(url);
      const { status, data } = resp;
      let jsonStr = data.toString('UTF-8');
      let json = JSON.parse(jsonStr);
      if (status == '200') {
        if (json.errcode) {
          return null;
        }
        return json;
      } else {
        return null;
      }
    } catch (error) {
      ctx.logger.error(error);
      return null;
    }
  }
  async sign(action, user) {
    const { ctx } = this;
    const { open_id } = user;

    if (action == 'login') {
      let userSinge = await ctx.model.User.findByOpenId(open_id);
      if (userSinge && !userSinge.error) {
        return userSinge;
      } else if (userSinge && userSinge.error) {
        // error
        return null;
      } else {
        try {
          let newUser = await ctx.model.transaction(async (t) => {
            let uw = await ctx.model.UserWallet.createWallet({}, t);
            if (!uw || uw.error) {
              // error
              throw new Error('创建用户钱包失败');
            }
            user.wallet_id = uw.id;
            let nu = await ctx.model.User.createUser(user, t);
            if (!nu || nu.error) {
              // error
              throw new Error('创建用户失败');
            }
            return nu;
          });
          return newUser;
        } catch (error) {
          ctx.logger.error(error);
          return null;
        }
      }
    } else if (action == 'update') {
      let row = await ctx.model.User.updateUser(open_id, user);
      if (row && !row.error) {
        return row;
      } else {
        // error
        return null;
      }
    }
  }
}

module.exports = UserService;