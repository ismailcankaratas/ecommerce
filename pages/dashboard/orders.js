import React from 'react'
import ProductsTablee from '../../components/dashboard/Tables/ProductsTablee'
import Layout from '../../components/dashboard/Layout'
import { convertDocToJson, convertDocToObj } from '../../utils/helpers';
import Order from '../../models/Order';

function orders({ orders }) {
    return (
        <Layout title="Siparişler">
            <div className="flex justify-center flex-wrap">
                <div className="w-full -mt-24 lg:w12/12 px-4">
                    <ProductsTablee orders={orders} />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const orders = await Order.findAll({ include: 'user' })
    return {
        props: { orders: orders.map(convertDocToJson) }
    }
}

orders.auth = { adminOnly: true };


export default orders;