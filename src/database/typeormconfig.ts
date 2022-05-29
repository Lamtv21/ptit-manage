import { configDatabase } from '../config/configuration'

const typeormConfig = Object.assign(
  {
    migrationsTableName: 'ptit_migrations',
    migrations: [__dirname + '/migration/*{.ts,.js}'],
    entities: [__dirname + '/entities/*{.ts,.js}'],
    cli: {
      entitiesDir: __dirname + '/entities',
      migrationsDir: __dirname + '/migration'
    }
  },
  configDatabase
)

export default typeormConfig
