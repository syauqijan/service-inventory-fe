'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ErrorFail401 = () => {
    const router = useRouter();

    return(
        <div className='h-screen bg-white text-black'>
            <div className="bg-whitetext-sm font-normal flex flex-col box-border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white w-1/4">
                <div className='grid grid-cols-1 place-items-center place-content-center'>
                    <Image src="/401.png" width={170} height={170} alt="Picture of the author" />
                    <h1 className='text-center text-2xl font-semibold mt-4'>Authorization Required - 401</h1>
                    <h3 className='text-lg mt-1 font-medium text-center'>You have attempted to access a page for which you are not authorized</h3>
                    <button className='bg-red-500 w-full mt-4 p-2 text-white rounded-md' onClick={() => router.back()}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorFail401;