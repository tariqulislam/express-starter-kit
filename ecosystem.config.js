module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'express-starter-kit',
      script    : 'bin/www',
      instances : "max",
      exec_mode : 'cluster',
      watch     : true,
      env_development: {
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
