import "dotenv/config";
import EnvConfig from "./env.interface";

const loadEnvs = (): EnvConfig => {
  // Check missing envs
  const requiredEnvs: string[] = [
    "DB_URL",
    "PORT",
    "NODE_ENV",
    "FRONTEND_URL",

    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRESIN",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRESIN",

    "EXPRESS_SESSION_SECRET",
    "BCRYPT_SALT_ROUNDS",

    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
  ];

  requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing the required enviroment variable : ${key}`);
    }
  });

  // Return validated envs
  return {
    DB_URL: process.env.DB_URL as string,
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    FRONTEND_URL: process.env.FRONTEND_URL as string,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRESIN: process.env.JWT_ACCESS_EXPIRESIN as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRESIN: process.env.JWT_REFRESH_EXPIRESIN as string,

    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

const envVars = loadEnvs();
export default envVars;
