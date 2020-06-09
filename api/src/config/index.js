const config = {
    env: 'dev',
    port: 3008,

    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASS || 'root',
      database: process.env.MYSQL_DB || 'commercial',
      port: process.env.MYSQL_PORT || 8889,
  },
  };
  
  
  module.exports = { config };