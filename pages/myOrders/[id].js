import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { dateConvert } from '../../utils/helpers';
import { getError } from '../../utils/error';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default: state;
    }
}


export default function OrderScreen({ params }) {
    const orderId = params.id;
    const [{ loading, error, order, successPay, loadingDelivery, successDelivery }, dispatch] = useReducer(reducer, {
        loading: true, order: {}, error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/${orderId}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        if (!order.orderId || (order.orderId !== orderId)) {
            fetchOrder();
        }
    }, [orderId]);

    const { products, user, fullName, address, city, postalCode, country, phoneNumber, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt, createdAt, updateAt } = order;
    console.log(order && order.id);
    return (
        <Layout title={`Sipariş ${orderId}`}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className='text-red-500 text-lg text-center py-12'>{error}</div>
            ) : (
                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div className="flex justify-start item-start space-y-2 flex-col ">
                        <h1 className="flex items-center text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                            <span>
                                Sipariş #{orderId}
                            </span>
                            <span className={`ml-3 text-base px-4 py-2 rounded-full text-white  ${isDelivered ? "bg-indigo-500" : "bg-gray-400"}`}>
                                {isDelivered ? "Teslim edildi" : "Hazırlanıyor"}
                            </span>
                        </h1>
                        <p className="text-base font-medium leading-6 text-gray-600">
                            {dateConvert(createdAt)}
                        </p>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            {products.length > 0 ?
                                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                    <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Sepet</p>

                                    {products.map(product => (
                                        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <img className="w-full" src={`${product.image ? product.image : null}`} alt={product.name} />
                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                                        {product.name}
                                                    </h3>

                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Kategori: </span> {product.category}
                                                        </p>
                                                        {product.size ? (
                                                            <p className="text-sm leading-none text-gray-800">
                                                                <span className="text-gray-300">Size: </span> Small
                                                            </p>
                                                        ) : ""}

                                                        {product.color ? (
                                                            <p className="text-sm leading-none text-gray-800">
                                                                <span className="text-gray-300">Color: </span> Light Blue
                                                            </p>
                                                        ) : ""}

                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base xl:text-lg leading-6">
                                                        {product.orderItem.price} ₺
                                                        {/* <span className="text-red-300 line-through"> $45.00</span> */}
                                                    </p>
                                                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                                                        Adet: {product.orderItem.quantity}
                                                    </p>
                                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                                        {product.orderItem.price * product.orderItem.quantity} ₺
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                : (
                                    <>
                                        <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Sepet</p>
                                            <div>Yükleniyor...</div>
                                        </div>
                                    </>
                                )}
                            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Özet</h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div className="flex justify-between  w-full">
                                            <p className="text-base leading-4 text-gray-800">Ürünler</p>
                                            <p className="text-base leading-4 text-gray-600">{itemsPrice} ₺</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">
                                                Kargo
                                                {itemsPrice > 200 && (<span className="bg-indigo-400 text-white ml-1 p-1 text-xs font-medium leading-3  text-gray-800">
                                                    200 TL ÜZERİ
                                                </span>)}
                                            </p>
                                            <p className="text-base leading-4 text-gray-600">
                                                {shippingPrice}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">Vergi</p>
                                            <p className="text-base leading-4 text-gray-600">{taxPrice} ₺</p>
                                        </div>

                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base font-semibold leading-4 text-gray-800">Toplam</p>
                                        <p className="text-base font-semibold leading-4 text-gray-600">{totalPrice} ₺</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Kargo</h3>
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex justify-center items-center space-x-4">
                                            <div class="w-8 h-8">
                                                <img class="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                            </div>
                                            <div className="flex flex-col justify-start items-center">
                                                <p className="text-lg leading-6 font-semibold text-gray-800">
                                                    DPD Delivery
                                                    <br />
                                                    <span className="font-normal">Delivery with 24 Hours</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-lg font-semibold leading-6 text-gray-800">$8.00</p>
                                    </div>
                                    <div className="w-full flex justify-center items-center">
                                        <button className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                            <h3 className="text-xl font-semibold leading-5 text-gray-800">Müşteri</h3>
                            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                                <div className="flex flex-col justify-start items-start flex-shrink-0">
                                    <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                        {/* <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" /> */}
                                        <div className=" flex justify-start items-start flex-col space-y-2">
                                            <p className="text-base font-semibold leading-4 text-left text-gray-800">
                                                {user.name}
                                            </p>
                                            <p className="text-sm leading-5 text-gray-600">
                                                {phoneNumber}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="cursor-pointer text-sm leading-5 text-gray-800">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                                        <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <div className='flex items-center justify-between w-full'>
                                                <p className="text-base font-semibold leading-4 text-gray-800">
                                                    Sipariş Adresi
                                                </p>
                                                <Link href="">
                                                    <a className='text-indigo-500 hover:text-indigo-400'>Düzenle</a>
                                                </Link>
                                            </div>
                                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                                {fullName}, {address}, {''}
                                                {city}, {postalCode}, {''}
                                                {country}
                                            </p>
                                        </div>
                                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Fatura Adresi</p>
                                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                                {fullName}, {address}, {''}
                                                {city}, {postalCode}, {''}
                                                {country}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                        <Link href="">
                                            <a className='mt-6 text-center md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800'>
                                                Düzenle
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    )
}

export function getServerSideProps(context) {
    return {
        props: { params: context.params }
    };
}