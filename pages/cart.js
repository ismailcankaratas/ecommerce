import React, { useContext, useState } from "react";
import { Store } from "../utils/store/Store";
import Layout from '../components/Layout';
import Link from 'next/link'
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import axios from 'axios';

function CartScreen() {
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems }
    } = state;
    const router = useRouter();

    function removeItemHandler(item) {
        dispatch({
            type: 'CART_REMOVE_ITEM', payload: item
        })
    }
    async function updateCartHandler(item, qty) {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item.id}`);

        if (data.countInStock < quantity) {
            return toast.error("Ürün stokta yok");
        }

        dispatch({
            type: 'CART_ADD_ITEM', payload: { ...item, quantity }
        })
    }
    return (
        <Layout title="Sepet">
            <div>

                <div className="w-full h-full py-12 bg-gray-100 bg-opacity-90">
                    <div className="w-ful h-full transform translate-x-0 transition ease-in-out duration-700">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-2xl py-36">
                                Sepet boş. <Link href="/">
                                    <a className="text-indigo-600">Alışverişe git</a>
                                </Link>
                            </div>
                        ) :
                            <div className="flex md:flex-row flex-col-reverse justify-end">
                                <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                                    <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                        <p className="text-sm pl-2 leading-none" onClick={() => router.back()}>Geri</p>
                                    </div>
                                    <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Sepet</p>
                                    {cartItems.map((item) => (
                                        <div className="md:flex items-center mt-14 py-8 border-t border-gray-200" key={item.slug}>
                                            <div className="w-1/4">
                                                <img src={item.images ? item.images[0].src : null} alt={item.images ? item.images[0].alt : null} className="w-full h-full object-center object-cover" />
                                            </div>
                                            <div className="md:pl-3 md:w-3/4">
                                                <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                                <div className="flex items-center justify-between w-full pt-1">
                                                    <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                                                    <div className="flex items-center space-x-4">
                                                        <span className="font-bold">Adet:</span>
                                                        <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                            {
                                                                [...Array(item.countInStock).keys()].map(x => (
                                                                    <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                                                <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                                                <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                                                <div className="flex items-center justify-between pt-5 pr-6">
                                                    <div className="flex itemms-center">
                                                        <p
                                                            onClick={() => removeItemHandler(item)}
                                                            className="text-xs leading-3 underline text-red-500 cursor-pointer">
                                                            Sil
                                                        </p>
                                                    </div>
                                                    <p className="text-base font-black leading-none text-gray-800">{item.price} ₺</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                                <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-full">
                                    <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                        <div>
                                            <p className="text-4xl font-black leading-9 text-gray-800">Özet</p>
                                            <div className="flex items-center justify-between pt-16">
                                                <p className="text-base leading-none text-gray-800">Ara Toplam ({cartItems.reduce((a, c) => a + c.quantity, 0)})</p>
                                                <p className="text-base leading-none text-gray-800">
                                                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} ₺
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                                <p className="text-2xl leading-normal text-gray-800">Toplam</p>
                                                <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                                                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} ₺
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => router.push('login?redirect=/shipping')}
                                                className="text-base leading-none w-full py-5 bg-indigo-700 hover:bg-indigo-500 transition-all rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                                İleri
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div >
        </Layout >
    );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });