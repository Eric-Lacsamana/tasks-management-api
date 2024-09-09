import { createConnection } from 'typeorm';

async function testConnection() {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: true,
    });
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed', error);
  }
}

testConnection();
