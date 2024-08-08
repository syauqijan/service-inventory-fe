'use client';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImage from '@/public/login-image.svg';
import Telkomsel from '@/public/telkomsel.svg';
import axios from 'axios';
import dotenv from 'dotenv';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

dotenv.config();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN}`, {
        email: email,
        password
      });
      if (response.status === 200) {
        const { token, expiresIn } = response.data;
        Cookies.set('authToken', token, { expires: expiresIn / 86400 });
        login(token);
        router.push('/dashboard');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.msg;
        if (errorMessage === 'No User Found') {
          setEmailError('No user found with this email.');
        } else if (errorMessage === 'Wrong Password') {
          setPasswordError('Incorrect password.');
        } else {
          toast.error('An error occurred while logging in');
        }
      }
    }
  };

  return (
    <div className='flex min-w-screen min-h-screen bg-neutral-100 justify-center items-center text-black'>
      <div className="w-[887px] h-[441px] px-[42px] py-[32px] bg-white text-black rounded-3xl shadow flex-row justify-start items-start gap-[38px] inline-flex">
        <div className=''>
          <Image src={logoImage} width={375} height={375} alt='logo-image' />
        </div>
        <div className='w-[418px] flex-col justify-center items-start inline-flex'>
          <form onSubmit={handleSubmit} className='w-full'>

            <Image src={Telkomsel} width={150} height={50} alt='logo-image' />

            <div className='text-2xl font-semibold mt-4 mb-2'>
              Login
            </div>
            <div className='w-full flex-col justify-start items-start mb-4'>
              <label htmlFor="email" className='text-sm font-medium '>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email' name="email" id="email" className='w-full border border-slate-300 rounded-md self-stretch pl-3 py-2' />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className='w-full flex-col justify-start items-start mb-6'>
              <label htmlFor="password" className='text-sm font-medium'>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password' name="password" id="password" className='w-full border border-slate-300 rounded-md self-stretch pl-3 pr-14 py-2' />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
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

export default Login;
