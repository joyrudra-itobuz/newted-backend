import mongoose from "mongoose";
import "dotenv/config";

const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

try {
  mongoose.connect(
    `mongodb+srv://${userName}:${password}@${cluster}.mongodb.net/`
  );
} catch (error) {
  console.log(error);
}

export const db = mongoose.connection;

db.once("open", () => {
  console.log("Database CONNECTED SUCCESSFULLY ✅!");
});

db.on("connection", () => {
  console.log("Database CONNECTED! ✅");
});

db.on("error", async (err) => {
  console.log("OOPS Failed to CONNECT! ❌ \n Here's Your ERROR : ", err),
    " \nDisconnected!";
  await mongoose.disconnect();
});
