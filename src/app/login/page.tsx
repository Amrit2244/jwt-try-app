    'use client';
    import axios from 'axios';
    import {useRouter} from 'next/navigation';
    import { useState } from 'react';

    import { useReducer } from "react";

    export default function Login(){
        const router = useRouter();
        const[email,setEmail]= useState("");
        const[password, setPassword]=useState('');
        const [error,setError]=useState('')
        const [successMessage,setSuccessMessage]= useState("");

        const handleLogin = async(e:React.FormEvent) => {
            e.preventDefault();
            setError(""); //to clear previous errors
            setSuccessMessage("")// to clear the previous message
            try {
                const res = await axios.post('http://localhost:3000/api/auth/login',{
                    email,
                    password,
                })
                if(res.status >= 200 && res.status < 300){
                    console.log('login Sucess');
                    setSuccessMessage('login is successfully!!!')
                    router.push('/protected');
                    
                }else{
                    setError('Unexpected response from server')
                };
                

            } catch (error :any) {
                console.error(`Invalid credentials pls try again Error:${error.message}`);
                setError('invalid creadentails , pls try again');
                
            }
        


        }


        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="emial"name='email'placeholder='abc@gmail.com'value={email}onChange={(e)=>{setEmail(e.target.value)}} />
                    <input type="password"name='password'placeholder='Enter Password' value={password}onChange={(e)=>{setPassword(e.target.value)}} />
                    <button type='submit'>click here to login</button>

                </form>
                {error && <p style={{color:'red'}}>{error} </p>}
                {successMessage && <p className='text-green-500'> {successMessage}  </p>}
            </div>

        )
    }