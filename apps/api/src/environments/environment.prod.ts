export const environment = {
  production: true,
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    db: parseInt(process.env.REDIS_DB, 10),
    password: process.env.REDIS_PASSWORD,
    keyPrefix: 'th_',
  },
};
