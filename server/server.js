import express, { json, urlencoded } from "express";
import mongoose from "mongoose";


const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/users",userRouter)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(5000, () => console.log("server started"));
