import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    bcrypt_rounds: process.env.BCRYPT_ROUNDS,
    database_url: process.env.DATABASE_URL,
    accessTokenSecrete: process.env.ACCESS_TOKEN_SECRETE,
    refreshTokenSecrete: process.env.REFRESH_TOKEN_SECRETE,
    resetPasswordSecrete: process.env.RESET_PASSWORD_SECRETE,
    accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE,
    refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE,
    sslcommerzStoreId: process.env.SSLCOMMERZ_STORE_ID,
    sslcommerzSecretId: process.env.SSLCOMMERZ_SECRET_KEY,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
}
