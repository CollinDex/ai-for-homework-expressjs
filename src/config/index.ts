import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT ?? 8000,
  "api-prefix": "api/v1",
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  BASE_URL: process.env.BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY,
  SUPER_SECRET_KEY: process.env.SUPER_SECRET_KEY,
};

export default config;
