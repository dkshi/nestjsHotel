import { Appeal } from '../src/appeals/appeals.entity';
import { Guest } from '../src/guests/guests.entity';
import { Room } from '../src/rooms/rooms.entity';
import { DataSource } from 'typeorm';

const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'jk355ky88',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
});
export default ormConfig;
