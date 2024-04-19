import mongoose from 'mongoose';

const uri: string = 'mongodb://localhost:27017';

export const initDb = async () => {
  try {
    await mongoose.connect(uri, {
      user: 'root',
      pass: 'nodegmp',
      dbName: 'layered-arch-nosql',
    });
    console.log('Succesfully connected to MongoDB');
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.log('An error occurred while connecting to MongoDB');
    }
  }
};
