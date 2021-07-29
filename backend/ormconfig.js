const env = val => process.env[val];

module.exports = {
    type: 'postgres',
    host: '192.168.0.73',
    url: 'postgres://user:password@postgres:5432/db',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'db',
    synchronize: false,
    migrationsRun: true,
    logging: false,
    entities: [`src/**/models/*.entity.ts`],
    migrations: [`src/**/Migration/**/*.ts`],
    subscribers: [`src/**/*.subscriber.ts`],
    cli: {
        entitiesDir: `src/entity`,
        migrationsDir: `src/migration`,
        subscribersDir: `src/subscriber`,
    },
};
