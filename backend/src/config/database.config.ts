import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { env, isProduction } from './environment.config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: env.DB_SYNC === 'true',
  logging: env.DB_LOGGING === 'true',
  autoLoadEntities: true,
  ssl: isProduction,
  extra: {
    max: 20,
    connectionTimeoutMillis: 10000,
  },
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: isProduction,
};
