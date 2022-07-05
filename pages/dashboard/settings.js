import axios from 'axios';
import React from 'react'
import CardSettings from '../../components/dashboard/Cards/CardSettings'
import Layout from '../../components/dashboard/Layout'

export default function settings({ defaultSettings }) {
    console.log(defaultSettings);
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

export async function getServerSideProps() {

    try {
        const data = await axios.get('/api/site/getSettings');
        console.log(data);
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            defaultSettings: "ismail"
        }
    }
}

settings.auth = { adminOnly: true };
