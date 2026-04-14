import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://smartcliff:Mern%40143@cluster0.hkb7jhx.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
