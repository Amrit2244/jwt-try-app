
// import mongoose from "mongoose";

// export async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI as string)
//         const connection = mongoose.connection;

//         connection.on('connected',()=>{
//             console.log(`DB IS CONNECTED :${connection.host}`)
//         });
//         connection.on('error',(err)=>{
//             console.error(`unable to connect to Db Error:${err}`);
//             process.exit(1) // 0 is used for if connected
            
//         });
//     } catch (error:any) {
//         console.error(`please Check DB URI Error:${error.message}`);
//         throw error;   
//     }};

import { error } from "console";
import mongoose from "mongoose";

let isConnected =false ; //track your connection

export async function Dbconnect (){
    if(isConnected){
        return
    }
    if (!process.env.MONGO_URL){
        throw new Error ('plase define the MONGO_URL')


    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        isConnected = db.connections[0].readyState=== 1;
        console.log('db is connected');

        
    } catch (error:any) {
        console.error('db connection error :',error.message);
        throw new Error('failed to connect to db ')
        
    }
}

