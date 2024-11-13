
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log(`DB IS CONNECTED :${connection.host}`)
        });
        connection.on('error',(err)=>{
            console.error(`unable to connect to Db Error:${err}`);
            process.exit(1) // 0 is used for if connected
            
        });
    } catch (error:any) {
        console.error(`please Check DB URI Error:${error.message}`);
        throw error;   
    }};


