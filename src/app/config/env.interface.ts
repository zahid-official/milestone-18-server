interface EnvConfig {
  DB_URL: string;
  PORT: number;
  NODE_ENV: "development" | "production";
  FRONTEND_URL: string;

  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRESIN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRESIN: string;

  BCRYPT_SALT_ROUNDS: number;
  EXPRESS_SESSION_SECRET: string;

  DEFAULT_ADMIN_EMAIL: string;
  DEFAULT_ADMIN_PASSWORD: string;

  CLOUDINARY: {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
  };
}

export default EnvConfig;
