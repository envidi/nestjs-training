export default () => ({
  port: parseInt(process.env.DB_PORT),
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});
