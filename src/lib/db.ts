import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache || {
  conn: null,
  promise: null,
}

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDb (): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;
  
  if (!cached.conn) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    const mongooseInstance = await cached.promise;

    if (!mongooseInstance) {
      throw new Error("Failed to connect database");
    }

    cached.conn = mongooseInstance;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};
