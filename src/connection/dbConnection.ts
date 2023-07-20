import mongoose from "mongoose";
import "dotenv/config";

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

mongoose.connect(
  `mongodb+srv://${userName}:${password}@${cluster}.mongodb.net/`
);

export const db = mongoose.connection;

db.once("open", () => {
  console.log("Database CONNECTED SUCCESSFULLY ✅!");
});

db.on("connection", () => {
  console.log("Database CONNECTED! ✅");
});

db.on("error", (err) => {
  console.log("OOPS Failed to CONNECT! ❌ \n Here's Your ERROR : ", err);
});
