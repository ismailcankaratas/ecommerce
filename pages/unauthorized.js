import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

export default function Unauthorized() {
    const router = useRouter();
    const { message } = router.query;
    return (
        <Layout title={message}>
            <div className='flex flex-col text-xl items-center justify-center h-[80vh]'>
                <h1 className='text-4xl'>{message}</h1>
                {message && <div className='mb-4 text-red-500'>Erişim Reddedildi</div>}
                <button className="mx-4 h-10 w-44 border rounded-md text-white text-base bg-indigo-600 hover:bg-indigo-400 transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800" onClick={() => router.back()}>
                    Geri git
                </button>
            </div>
        </Layout>
    )
}
