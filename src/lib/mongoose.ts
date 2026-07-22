import mongoose from 'mongoose';

declare global {
  var mongooseGlobal: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = globalThis.mongooseGlobal ?? { conn: null, promise: null };
globalThis.mongooseGlobal = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.DATABASE_URL;
    if (!uri) throw new Error('DATABASE_URL environment variable is not set');
    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
