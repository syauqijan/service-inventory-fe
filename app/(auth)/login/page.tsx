"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImage from '@/public/login-image.svg'
import logoPlaceholder from '@/public/logo.svg'

const Login = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/dashboard');
  };
  return (
    <div className='flex min-w-screen min-h-screen bg-neutral-100 justify-center items-center text-black'>
      <div className="w-[887px] h-[441px] px-[42px] py-[32px] bg-white text-black rounded-3xl shadow flex-row justify-start items-start gap-[38px] inline-flex">
        <div className=''>
          <Image src={logoImage} width={375} height={375} alt='logo-image'/>
        </div>
        <div className='w-[418px] flex-col justify-center items-start self-center gap-2.5 inline-flex'>
          <Image src={logoPlaceholder} width={150} height={50} alt='logo-image'/>

          <div className='text-2xl font-semibold pt-2'>
            Login
          </div>
          <div className='w-full flex-col justify-start items-start gap-1.5'>
            <label htmlFor="email" className='text-sm font-medium'>Email</label>
            <input type="email" placeholder='Enter your email' name="email" id="email" className='w-full border border-slate-300 rounded-md self-stretch pl-3 py-2' />

          </div>
          <div className='w-full'>
            <label htmlFor="password" className='text-sm font-medium'>Password</label>
            <input type="password" placeholder='Enter your password' name="password" id="password" className='w-full border border-slate-300 rounded-md self-stretch pl-3 pr-14 py-2' />
          </div>
          <div className='flex w-full h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center mt-4 ' onClick={handleLoginClick}>
            <button className=' w-full text-white rounded-[10px] p-2' >Login</button>
          </div>
          </div>
      </div>
      
    </div>
  )
}

export default Login