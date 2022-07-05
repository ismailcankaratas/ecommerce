import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/store/Store'
import getError from '../utils/error';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useSession } from 'next-auth/react';

export default function PlacerOderScreen() {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { status, data: session } = useSession();
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0)); // 123.4567 => 123.46

    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
    }, [paymentMethod, router]);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })
            setLoading(false);
            dispatch({ type: 'CART_CLEAR_ITEMS' })
            Cookies.set('cart', JSON.stringify({ ...cart, cartItems: [] }));
            router.push(`/myOrders/${data.orderId}`);

        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <Layout title="Sipariş Ver">
            <CheckoutWizard activeStep={3} />
            <div className="py-4 px-4 md:container mx-auto 2xl:px-20 2xl:container 2xl:mx-auto">
                <div className="flex justify-start item-start space-y-2 flex-col ">
                    <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Sipariş Ver</h1>
                    {/* <p className="text-base font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p> */}
                </div>
                {cartItems.length === 0 ? (
                    <div className="text-center text-2xl py-36">
                        Sepet boş. <Link href="/">
                            <a className="text-indigo-600">Alışverişe git</a>
                        </Link>
                    </div>
                ) :
                    (
                        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                    <div className='flex justify-between items-center w-full'>
                                        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                                            Sepet
                                        </p>

                                        <Link href="/cart">
                                            <a className='text-indigo-500 hover:text-indigo-400'>Düzenle</a>
                                        </Link>
                                    </div>
                                    {cartItems.map((item) => (
                                        <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <img className="w-full" src={item.image ? item.image : null} alt={item.name} />

                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-300">Kategori: </span> {item.category}
                                                        </p>
                                                        {item.size ? (
                                                            <p className="text-sm leading-none text-gray-800">
                                                                <span className="text-gray-300">Size: </span> Small
                                                            </p>
                                                        ) : ""}

                                                        {item.color ? (
                                                            <p className="text-sm leading-none text-gray-800">
                                                                <span className="text-gray-300">Color: </span> Light Blue
                                                            </p>
                                                        ) : ""}

                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base xl:text-lg leading-6">
                                                        {item.price} ₺
                                                        {/* <span className="text-red-300 line-through"> $45.00</span> */}
                                                    </p>
                                                    <p className="text-base xl:text-lg leading-6 text-gray-800">Adet: {item.quantity}</p>
                                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                                        {item.price * item.quantity} ₺
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
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
                                <h3 className="text-xl font-semibold leading-5 text-gray-800">Sipariş Bilgileri</h3>
                                <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                                        <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                            {/* <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" /> */}
                                            <div className=" flex justify-start items-start flex-col space-y-2">
                                                <p className="text-base font-semibold leading-4 text-left text-gray-800">
                                                    {shippingAddress.fullName}
                                                </p>
                                                <p className="text-sm leading-5 text-gray-600">
                                                    {shippingAddress.phoneNumber}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className="cursor-pointer text-sm leading-5 text-gray-800">
                                                {session.user.email}
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
                                                    <Link href="/shipping">
                                                        <a className='text-indigo-500 hover:text-indigo-400'>Düzenle</a>
                                                    </Link>
                                                </div>
                                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                                    {shippingAddress.fullName}, {shippingAddress.address}, {''}
                                                    {shippingAddress.city}, {shippingAddress.postalCode}, {''}
                                                    {shippingAddress.country}
                                                </p>
                                            </div>
                                            <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                                                <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Fatura Adresi</p>
                                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                                    {shippingAddress.fullName}, {shippingAddress.address}, {''}
                                                    {shippingAddress.city}, {shippingAddress.postalCode}, {''}
                                                    {shippingAddress.country}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                            <Link href="/shipping">
                                                <a className='mt-6 text-center md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800'>
                                                    Düzenle
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                <div className='my-4 flex justify-between space-x-10 sm:space-x-40'>
                    <button onClick={() => router.push('/payment')}
                        type="button"
                        className='rounded flex-[.5]  bg-gray-200 py-2 px-4 text-black shadow outline-none hover:bg-gray-200'>
                        Geri
                    </button>

                    <button
                        disabled={loading}
                        onClick={placeOrderHandler}
                        type="button"
                        className='rounded flex-1 bg-indigo-500 text-white py-2 px-4 shadow outline-none hoverbg-amber-400 active:bg-indigo-500'>
                        {loading ? "Yükleniyor..." : "Sipariş ver"}
                    </button>
                </div>
            </div>

        </Layout>
    )
}