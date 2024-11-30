import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

async function main() {
  try {
    console.log('Attempting to connect to the database...');
    await mongoose.connect(config.database_url as string);
    console.log('Database connection established successfully.');

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

main();
