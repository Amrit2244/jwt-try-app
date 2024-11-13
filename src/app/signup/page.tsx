"use client";

import axios from 'axios';

import {useRouter} from 'next/navigation';
import {useState} from 'react';


export default function SignUp (){
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault(); // to prevent from reload
        setError(""); // clear previous errors
        try {
            if(!email ||!password){
                setError('pls enter email or password')
                return
            }
            const res = await axios.post('http://localhost:3000/api/auth/signup',{
                email,
                password
            })
            if (res.status >= 200 && res.status < 300) {
                console.log('SignUp success!!');
                router.push('/login');
            } else {
                setError('Unexpected error from server');
            }
            
        } catch (error:any) {
            // to handle the axios errors
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);

            }else{
                setError('Invalid credential or server error')
            }console.error(error);
            

        }

    }




    return(
        <div>
            <h1>SignUP</h1>
            <form onSubmit={handleSubmit}>
                <input type="email"name='email'placeholder='Enter email id 'value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" name='password'placeholder='enter password'value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type='submit'>Submit</button>
            </form>
                {error && <p style={{color:'red'}}> {error} </p>}
            </div>
    )
}