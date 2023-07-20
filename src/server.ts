import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Db } from "mongodb";
import "dotenv/config";
import { db } from "./connection/dbConnection";
import userRoutes from "./routes/userRoutes";

db;

export const app = express();

app.use(cors());
app.use(express.json());

/* Adding User Routes */

app.use(userRoutes);

app.get("/hello", (req, res, next) => {
  res.status(200).send({
    data: "HELLO From Server! 😁👋🏻 ",
    message: "OK",
    success: true,
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new Error("Page Not found!"));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(404).send({
      data: null,
      message: err.message,
      success: false,
    });
  }
});

export const server = app.listen(process.env.PORT || 7700, () => {
  console.log(`Server Running on PORT : http://localhost:${process.env.PORT}/`);
});
