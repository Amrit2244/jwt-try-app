import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";


// this function can ne async if we have to use await 

export async function middleware (request:Request){
    const cookie = cookies().get
}