import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from "../components/CheckoutWizard";
import { useRouter } from 'next/router';
import { Store } from '../utils/store/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { BsPaypal } from 'react-icons/bs'
import { FaStripe } from 'react-icons/fa'

export default function PaymentScreen() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            toast.error("Ödeme yöntemi gerekli");
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
        Cookies.set('cart',
            JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod }));

        router.push('/placeorder');
    }

    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address]);

    return (
        <Layout title="Ödeme">
            <CheckoutWizard activeStep={2} />
            <div className='mx-auto px-12' >
                <form onSubmit={submitHandler}>
                    <h1 className='mb-4 text-xl'>Ödeme yöntemini seçin</h1>
                    <div className='flex pb-24 pt-8 items-center justify-between flex-wrap flex-col md:flex-row space-y-9 md:space-y-0  md:space-x-20 '>
                        {['PayPal', 'Stripe', 'Kapıda Ödeme'].map((payment) => (
                            <label key={payment} className={`relative transition-all
                            cursor-pointer text-2xl justify-center rounded-md curspor-pointer py-12 w-full flex items-center flex-1 bg-gray-200 
                            ${selectedPaymentMethod == payment ? "bg-indigo-500 text-white" : ""} `} htmlFor={payment}>
                                <input
                                    name='paymentMethod'
                                    className='p-2 outline-none focus:ring-0 absolute left-4 top-4 text-indigo-500'
                                    id={payment}
                                    type="radio"
                                    checked={selectedPaymentMethod == payment}
                                    onChange={() => setSelectedPaymentMethod(payment)}
                                />
                                {payment === "PayPal" && (<BsPaypal />)}
                                {payment === "Stripe" && (<FaStripe />)}
                                <span>
                                    {payment}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className='my-4 flex justify-between space-x-10 sm:space-x-40'>
                        <button onClick={() => router.push('/shipping')}
                            type="button"
                            className='rounded flex-[.5]  bg-gray-200 py-2 px-4 text-black shadow outline-none hover:bg-gray-200'>
                            Geri
                        </button>

                        <button onClick={() => router.push('/placeorder')}
                            type="submit"
                            className='rounded flex-1 bg-indigo-500 text-white py-2 px-4 shadow outline-none hoverbg-amber-400 active:bg-indigo-500'>
                            Sipariş ver
                        </button>
                    </div>
                </form>
            </div >

        </Layout >
    )
}