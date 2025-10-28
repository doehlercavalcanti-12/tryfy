export interface AppConfig {
  port: number;
  databaseUrl: string;
  redisUrl: string;
  isTest: boolean;
}

export default (): AppConfig => {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const isTest = nodeEnv === 'test';

  return {
    port: Number(process.env.PORT ?? 3000),
    databaseUrl: process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5432/tryfy',
    redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
    isTest
  };
};
