import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js"
import dotenv from "dotenv"
dotenv.config();
import passport from "passport";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(passport.initialize());

app.get("/",(req,res)=>res.send("Hello World"))
app.use("/users",userRouter)

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.listen(process.env.PORT, () => console.log(`server started on http://localhost:${process.env.PORT}`));
