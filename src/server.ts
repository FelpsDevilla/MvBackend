import app from "@/app/app.js";
import 'reflect-metadata';
import dotenv from "dotenv";

if(process.env.NODE_ENV != "prod"){
    dotenv.config();
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server started at " + PORT)
})