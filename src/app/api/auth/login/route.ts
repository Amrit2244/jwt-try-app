import { Dbconnect } from '@/config/connectDB';
import { validateEmail } from '@/helper/validateEmail';
import { validatePassword } from '@/helper/validatePassword';
import bcript from 'bcryptjs';
import { User } from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function POST(request:Request){
    await Dbconnect ();
    try {
       //extract the data request
       const body = await request.json();
       const {email,password} = body 

       // validate the data
       if (!validateEmail(email)||!validatePassword(password)){
            return new Response(JSON.stringify({Error:'Invalid email or password'}),{status:400})
       }
       //loke for user in database
       const user = await User.findOne({email});

       if(!user){
        return new Response(JSON.stringify({Error:'User Does Not Found'}),{status:404})
       }

       //match the password 
       const isMatched = await bcript.compareSync(password,user.password)
       if(!isMatched){
        return new Response(JSON.stringify({Error:'Invalid Password'}),{status:400})
       };
       //sign the token
       const token = jwt.sign({userid:user._id,email:user.email},process.env.JWT_SECRET as string,{expiresIn:'1h'});
       // set token in cookie
       const response = NextResponse.json({message:'login success!!'})
       await response.cookies.set('token',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',path:'/'});
       return response;

    }catch (error) {
        console.error(error);
        return new Response(JSON.stringify({Error:'Server Error'}),{status:500})

    }};   