import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useForm, Controller } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import { Store } from "../utils/store/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function ShippingScreen() {
    const { handleSubmit, register, formState: { errors }, control, setValue, getValues } = useForm();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;
    const router = useRouter();

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
        setValue('phoneNumber', shippingAddress.phoneNumber);
    }, [setValue, shippingAddress]);

    function submitHandler({ fullName, address, city, postalCode, country, phoneNumber }) {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country, phoneNumber }
        })
        Cookies.set('cart',
            JSON.stringify({
                ...cart,
                shippingAddress: { fullName, address, city, postalCode, country, phoneNumber },
            }))

        router.push('/payment');
    }

    return (
        <Layout title="Teslimat Adresi">
            <CheckoutWizard activeStep={1} />
            <div className="overflow-y-hidden">
                <div className="flex justify-center items-center 2xl:container 2xl:mx-auto py-4 md:px-12 px-4">
                    <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                        <div className="flex w-full  flex-col justify-start items-start">
                            <div className>
                                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                                    Teslimat Adresi
                                </p>
                            </div>
                            <div className="mt-2">
                                <a onClick={() => router.push('/cart')} className="cursor-pointer text-base leading-4 underline  hover:text-gray-800 text-gray-600">
                                    Sepete geri git
                                </a>
                            </div>
                            <div className="mt-12">
                                <p className="text-xl font-semibold leading-5 text-gray-800">
                                    Teslimat Ayrıntıları
                                </p>
                            </div>
                            <form className="flex flex-col w-full" onSubmit={handleSubmit(submitHandler)}>
                                <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                                    <input className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                                        type="text"
                                        id="fullName"
                                        autoFocus
                                        {...register('fullName', {
                                            required: 'Lütfen ad soyad giriniz',
                                        })}
                                        placeholder="Ad soyad" />
                                    {errors.fullName && (
                                        <div className="text-red-500">{errors.fullName.message}</div>
                                    )}
                                    <textarea className="px-2 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                                        id="address"
                                        {...register('address', {
                                            required: 'Lütfen teslimat adresinizi giriniz',
                                            minLength: { value: 3, message: 'Adres 2 karakterden fazla olmalı' },
                                        })}
                                        placeholder="Teslimat adresi" />
                                    {errors.address && (
                                        <span className="text-red-500">{errors.address.message}</span>
                                    )}
                                    <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                                        <div className="relative w-full">
                                            <select
                                                {...register('country', {
                                                    required: 'Lütfen ülke seçiniz',
                                                })}
                                                defaultValue=""
                                                className="px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full">
                                                <option value="">Ülke</option>
                                                <option value="Türkiye">Türkiye</option>
                                            </select>
                                        </div>
                                        <div className="relative w-full">
                                            <select
                                                {...register('city', {
                                                    required: 'Lütfen şehir seçiniz',
                                                })}
                                                defaultValue=""
                                                className="px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full">
                                                <option value="">Şehir</option>
                                                <option value="istanbul">İstanbul</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                                        <div className="w-full">
                                            <input className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                                type="text"
                                                id="postalCode"
                                                {...register('postalCode', {
                                                    required: 'Lütfen posta kodu giriniz.',
                                                })}
                                                placeholder="Posta Kodu" />
                                        </div>
                                    </div>
                                    {errors.postalCode && (
                                        <span className="text-red-500">{errors.postalCode.message}</span>
                                    )}
                                    <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8" >
                                        <Controller
                                            control={control}
                                            rules={{
                                                validate: (value) => isValidPhoneNumber(value)
                                            }}
                                            {...register('phoneNumber', {
                                                required: 'Lütfen telefon numarası giriniz.',
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <PhoneInput
                                                    value={value}
                                                    name="phoneNumber"
                                                    onChange={onChange}
                                                    defaultCountry="TR"
                                                    id="phoneNumber"
                                                    placeholder="Telefon numaranız"
                                                    className="focus:outline-none focus:ring-2 focus:ring-gray-500 border p-2 border-gray-200 leading-4 text-base placeholder-gray-600 w-full"
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.phoneNumber && (
                                        <span className="text-red-500">Geçersiz Telefon</span>
                                    )}
                                </div>
                                <button className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-indigo-400 transition-all py-4 w-full md:w-4/12 lg:w-full text-white bg-indigo-500">Ödemeye geç</button>
                            </form>
                            <div className="mt-4 flex justify-start items-center w-full">
                                <a onClick={() => router.push('/cart')} className="cursor-pointer text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600">
                                    Seğete geri git
                                </a>
                            </div>
                        </div>
                        {/* <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                            <div>
                                <h1 className="text-2xl font-semibold leading-6 text-gray-800">Sipariş Özeti</h1>
                            </div>
                            <div className="flex mt-7 flex-col items-end w-full space-y-6">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Total items</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">20</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">$2790</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">$90</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg leading-4 text-gray-600">Sub total </p>
                                    <p className="text-lg font-semibold leading-4 text-gray-600">$3520</p>
                                </div>
                            </div>
                            <div className="flex justify-between w-full items-center mt-32">
                                <p className="text-xl font-semibold leading-4 text-gray-800">Estimated Total </p>
                                <p className="text-lg font-semibold leading-4 text-gray-800">$2900</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Layout >
    );
}