import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import HeaderBanner from './HeaderBanner'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../hooks/useFetch'

export default function Layout({ title, children }) {
    const { data, loading, error } = useFetch('/api/site/getSettings');
    const [notice, setNotice] = useState(false);
    return (
        <>
            <Head>
                <title>{title ? title + ` | ${data.name}` : `${data.name} | ${data.slogan}`}</title>
                <meta name='description' content={`${data.description}`} />
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
