import mongoose from 'mongoose'

let isConnected = 0;

async function dbConnect() {
  if (isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGODB_URI!, { dbName: 'NoBOT' })

  isConnected = db.connections[0].readyState;
}

export default dbConnect