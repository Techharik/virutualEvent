import { connectDb } from "../config/db";

export async function initalizeApp() {
    console.log("Initializing Application");

    console.log('MonogoDB Connection');
    await connectDb();

}