export const environment = {
  production: false,
  redis: {
    host: 'localhost',
    port: 6379,
    // db: parseInt(process.env.REDIS_DB, 10),
    // password: process.env.REDIS_PASSWORD,
    keyPrefix: 'th_',
  },
};
