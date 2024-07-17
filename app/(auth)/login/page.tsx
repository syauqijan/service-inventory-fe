"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/dashboard');
  };
  return (
    <div className='flex min-w-screen min-h-screen bg-neutral-100 justify-center items-center text-black'>
      <div className="w-[502px] h-[323px] px-[42px] py-[32px] bg-white text-black rounded-3xl shadow flex-col justify-start items-start gap-2.5 inline-flex">
        <div className='text-2xl font-semibold'>
          Login
        </div>
        <div className='w-full flex-col justify-start items-start gap-1.5'>
          <label htmlFor="email" className='text-sm font-medium'>Email</label>
          <input type="email" placeholder='Enter your email' name="email" id="email" className='w-full border border-slate-300 rounded-md self-stretch pl-3 pr-14 py-2' />

        </div>
        <div className='w-full'>
          <label htmlFor="password" className='text-sm font-medium'>Password</label>
          <input type="password" placeholder='Enter your password' name="password" id="password" className='w-full border border-slate-300 rounded-md self-stretch pl-3 pr-14 py-2' />
        </div>
        <div className='flex w-full h-10 px-4 py-2 bg-slate-900 rounded-md justify-center items-center mt-4 ' onClick={handleLoginClick}>
          <button className=' w-full text-white rounded-[10px] p-2' >Login</button>
        </div>
      </div>
      
    </div>
  )
}

export default Login