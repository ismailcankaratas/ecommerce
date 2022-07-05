import React from 'react'
import Layout from '../../components/Layout'
import ProductDetails from '../../components/ProductDetails';
import Product from '../../models/Product';
import { convertDocToObj } from '../../utils/helpers';

export default function ProductScreen({ product }) {
    if (!product) {
        return <Layout title="Ürün bulunamadı"><h1 className='text-center text-4xl py-20 text-red-500'>Ürün bulunamadı.</h1></Layout>
    }
    return (
        <Layout title={product.name}>
            <ProductDetails product={product} />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const product = await Product.findAll({ where: { slug: params.slug }, raw: true })

    return {
        props: {
            product: product[0] ? convertDocToObj(product[0]) : null
        }
    }
} 