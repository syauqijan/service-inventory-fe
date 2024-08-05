"use client";
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImage from '@/public/login-image.svg'
import logoPlaceholder from '@/public/logo.svg'
import Telkomsel from '@/public/telkomsel.svg'
import dotenv from 'dotenv';
dotenv.config();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
        const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN||'', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            login(data.token, data.expiresIn);
            router.push('/dashboard');
        } else {
            console.error(data.msg);
        }
      }
      catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div className='flex min-w-screen min-h-screen bg-neutral-100 justify-center items-center text-black'>
      <div className="w-[887px] h-[441px] px-[42px] py-[32px] bg-white text-black rounded-3xl shadow flex-row justify-start items-start gap-[38px] inline-flex">
        <div className=''>
          <Image src={logoImage} width={375} height={375} alt='logo-image'/>
        </div>
        <div className='w-[418px] flex-col justify-center items-start inline-flex'>
          <form onSubmit={handleSubmit} className='w-full'>

          <Image src={Telkomsel} width={150} height={50} alt='logo-image'/>

          <div className='text-2xl font-semibold mt-4 mb-2'>
            Login
          </div>
          <div className='w-full flex-col justify-start items-start mb-4 '>
            <label htmlFor="email" className='text-sm font-medium '>Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email' name="email" id="email" className='w-full border border-slate-300 rounded-md self-stretch pl-3 py-2' />

          </div>
          <div className='w-full flex-col justify-start items-start mb-6'>
            <label htmlFor="password" className='text-sm font-medium'>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password' name="password" id="password" className='w-full border border-slate-300 rounded-md self-stretch pl-3 pr-14 py-2' />
          </div>
          <div className='flex w-full h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center mt-4 '>
            <button type="submit" className=' w-full text-white rounded-[10px] p-2' >Login</button>
          </div>
          </form>
          </div>

      </div>
      
    </div>
  )
}

export default Login