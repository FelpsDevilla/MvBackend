import app from "@/app/app.js";
import 'reflect-metadata';
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server started at " + PORT)
});