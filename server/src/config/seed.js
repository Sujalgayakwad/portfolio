import dotenv from 'dotenv';
import { DataStore } from '../utils/dataStore.js';

dotenv.config();

console.log('🌱 Seeding Sujal Cyber Portfolio CMS data...');

async function runSeed() {
  try {
    await DataStore.factoryReset();
    console.log('✅ Seeding complete! Original portfolio content initialized successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

runSeed();
