import Head from 'next/head'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import HeaderStats from './Stats/HeaderStats';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title ? title + " - Shopping" : "Shopping"}</title>
                <meta name='description' content='Ecommerce Website' />
                <link rel="icon" type="image/x-icon" href="/ShoppingLogo.png" />
            </Head>
            <ToastContainer position='top-right' />
            <Navbar />
            <Sidebar />
            <div className='relative md:ml-64 bg-indigo-100 p-32'>
            </div>
            <main className='md:ml-64'>
                {children}
                <Footer />
            </main>

        </>
    )
}

