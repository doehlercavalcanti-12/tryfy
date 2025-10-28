export interface AppConfig {
  port: number;
  databaseUrl: string;
  redisUrl: string;
}

export default (): AppConfig => ({
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/tryfy',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379'
});
