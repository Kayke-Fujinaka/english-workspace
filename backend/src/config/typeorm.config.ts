import { DataSource } from 'typeorm';
import { Card } from '../cards/entities/card.entity';
import { Deck } from '../decks/entities/deck.entity';
import { env } from './environment.config';

export default new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: [Card, Deck],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
