import express, { json, urlencoded } from "express";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(5000, () => console.log("server started"));
