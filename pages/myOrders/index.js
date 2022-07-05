import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'
import axios from 'axios';
import { dateConvert } from '../../utils/helpers'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default: state;
    }
}


export default function index() {
    const router = useRouter();

    const [{ loading, error, orders, successPay, loadingDelivery, successDelivery }, dispatch] = useReducer(reducer, {
        loading: true, orders: [], error: ''
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/orders/myOrders`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
        };
        fetchOrder();
    }, []);

    return (
        <Layout title="Siparişlerim">
            <div className='bg-gray-100 h-full py-12'>
                <div className='flex p-4'>
                    <h1 className='text-2xl text-indigo-600 font-semibold'>Siparişlerim</h1>
                </div>
                {orders.length == 0 ? (
                    <div className='flex flex-col text-center'>
                        <h1 className='text-2xl text-indigo-600 font-semibold'>Henüz siparişiniz yok!</h1>
                        <button className="mx-auto my-4 h-10 w-44 border rounded-md text-white text-base bg-indigo-600 hover:bg-indigo-400 transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800" onClick={() => router.push('/')}>
                            Alışveriş yap
                        </button>
                    </div>
                ) : (
                    <div className='container mx-auto py-4 space-y-4'>
                        {
                            orders.map(order => (
                                <div className='bg-white border shadow rounded'>
                                    <div className='flex items-center flex-wrap'>
                                        <div className='flex flex-1 items-center space-x-4'>
                                            <div className='flex flex-col p-4'>
                                                <span className='font-bold'>Sipariş numarası</span>
                                                <span className='text-base text-gray-500'>#{order.id}</span>
                                            </div>
                                            <div className='flex flex-col p-4'>
                                                <span className='font-bold'>Tarih</span>
                                                <span className='text-base text-gray-500'>{dateConvert(order.createdAt)} </span>
                                            </div>
                                            <div className='flex flex-col p-4'>
                                                <span className='font-bold'>Toplam fiyat</span>
                                                <span className='text-base text-black'>{order.totalPrice} ₺</span>
                                            </div>
                                        </div>
                                        <div className='flex space-x-4 mx-4'>
                                            <button onClick={() => router.push(`/myOrders/${order.id}`)} className='transition-all py-2 px-8 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-600 hover:text-white '>
                                                Görüntüle
                                            </button>
                                            <button className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-600 '>Fatura</button>
                                        </div>
                                    </div>
                                    <hr className="border-gray-200 my-1" />
                                    <div className='container'>
                                        {order.products.map(product => (
                                            <div>
                                                <div className='flex m-4'>
                                                    <div className='w-32 h-32'>
                                                        <img src={product.image ? product.image : null} alt="" className='w-full h-full bg-gray-100 rounded' />
                                                    </div>
                                                    <div className='flex-1 mx-4'>
                                                        <div className='flex items-center justify-between'>
                                                            <div className='font-bold flex-1'>{product.name}</div>
                                                            <div className='font-bold'>{product.price} ₺</div>
                                                        </div>
                                                        <div>
                                                            <p>ürün açıklaması</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='flex items-center justify-between m-4'>
                                            <div className='bg-indigo-100 py-2 px-4 rounded-full'>Hazırlanıyor</div>
                                            <div>
                                                <Link href="/">
                                                    <a className='p-2 m-2 rounded hover:bg-indigo-50 text-indigo-600'>Ürünü gürüntüle</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}

            </div>
        </Layout>
    )
}

index.auth = true;