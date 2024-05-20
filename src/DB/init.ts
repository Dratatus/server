import mongoose from 'mongoose';
import connectDB from './connect.js';
import { User } from '../models/users.js'; 

const initDatabase = async () => {
  await connectDB();

  const users = [
    {
      id: 1,
      firstName: 'Tytus',
      lastName: 'Bomba',
      role: 'Admin',
      passwords: { email: 'tytus@example.com', password: 'password123' },
      avatar: ''
    },
    {
      id: 2,
      firstName: 'Romek',
      lastName: 'Atomek',
      role: 'Developer',
      passwords: { email: 'romek@example.com', password: 'password123' },
      avatar: ''
    },
    {
      id: 3,
      firstName: 'Alojzy',
      lastName: 'Mortadela',
      role: 'DevOps',
      passwords: { email: 'alojzy@example.com', password: 'password123' },
      avatar: ''
    }
  ];

  try {
    // Usunięcie istniejących danych i dodanie nowych
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Database initialized with sample data');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
};

initDatabase().catch(error => {
  console.error('Error initializing database:', error);
  process.exit(1);
});
