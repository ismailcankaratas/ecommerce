import React from 'react'
import Layout from '../../components/dashboard/Layout'
import AccountsTable from '../../components/dashboard/Tables/AccountsTable';
import User from '../../models/User'
import { convertDocToObj } from '../../utils/helpers';

export default function accounts({ accounts }) {
    return (
        <Layout>
            <div className="flex justify-center flex-wrap">
                <div className="w-full -mt-24 lg:w12/12 px-4">
                    <AccountsTable accounts={accounts} />
                </div>
            </div>
        </Layout>
    )
}


export async function getServerSideProps() {
    const accounts = await User.findAll({ raw: true });

    return {
        props: {
            accounts: accounts.map(convertDocToObj)
        }
    }
}

accounts.auth = { adminOnly: true };
