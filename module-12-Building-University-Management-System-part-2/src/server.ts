import { Server } from 'http';
import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
let server: Server;

async function main() {
  try {
    console.log('Attempting to connect to the database...');
    await mongoose.connect(config.database_url as string);
    console.log('Database connection established successfully.');

    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

main();
process.on('unhandledRejection', () => {
  console.log(` unhandledRejection is Detected , process exit`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on('uncaughtException', () => {
  console.log(` uncaughtException is Detected , process exit`);
  process.exit(1);
});
