import mongoose from 'mongoose';

let isConnected = 0;

async function dbConnect() {
  if (isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.DB_URI, {
    bufferCommands: false,
    dbName: process.env.DB_NAME,
  });

  isConnected = db.connections[0].readyState;
}

export default dbConnect;
