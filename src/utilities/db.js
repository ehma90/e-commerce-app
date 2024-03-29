import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.MONGODB_URI === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

function covertDocToObj(doc) {
  if (!doc) {
    return doc;
  }
  if (doc._id) {
    doc._id = doc._id.toString();
  }
  if (doc.createdAt) {
    doc.createdAt = doc.createdAt.toString();
  }
  if (doc.updatedAt) {
    doc.updatedAt = doc.updatedAt.toString();
  }
  return doc;
}

const db = { connect, disconnect, covertDocToObj };
export default db;
