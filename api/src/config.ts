import * as dotenv from 'dotenv';

dotenv.config({ path: '.env', encoding: 'utf8'});

export interface IConfig {
  port: number;
  debugLogging: boolean
  jwtSecret: string
  databaseUrl: string
}

const config: IConfig = {
  port: process.env.PORT || 3000,
  debugLogging: process.env.NODE_ENV == 'development',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/apidb',
}

export { config }
