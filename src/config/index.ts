import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_SCHEMA: process.env.DATABASE_SCHEMA,
}