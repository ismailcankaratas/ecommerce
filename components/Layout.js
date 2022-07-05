import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import HeaderBanner from './HeaderBanner'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ title, children }) {
    const [notice, setNotice] = useState(false);
    return (
        <>
            <Head>
                <title>{title ? title + ' - Ecommerce' : "Ecommerce"}</title>
                <meta name='description' content='Ecommerce Website' />
                <link rel="icon" type="image/x-icon" href="/ShoppingLogo.png" />
            </Head>
            <ToastContainer position='top-right' />
            <div>
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}
