import axios from 'axios';
import React from 'react'
import CardSettings from '../../components/dashboard/Cards/CardSettings'
import Layout from '../../components/dashboard/Layout'

export default function settings() {
    return (
        <Layout title="Genel Ayarlar">
            <div className="flex justify-center flex-wrap">
                <div className="w-full -mt-24 lg:w-10/12 px-4">
                    <CardSettings />
                </div>
            </div>
        </Layout>
    )
}



settings.auth = { adminOnly: true };
