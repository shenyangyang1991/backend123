'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529116418521_6484';

  // add your config here
  config.middleware = [];

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '0',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'backend123',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: '',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  };

  config.security = {
    csrf: {
      enable: false
    },
  };

  return config;
};
