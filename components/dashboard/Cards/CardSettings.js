import React, { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useForm } from 'react-hook-form'
import axios from "axios";
import { toast } from "react-toastify";
// components


export default function CardSettings() {
  const { data, loading, error, reFetch } = useFetch('/api/site/getSettings');
  const { handleSubmit, register, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    setValue('name', data.name)
    setValue('slogan', data.slogan)
    setValue('description', data.description)
    setValue('email', data.email)
    setValue('address', data.address)
    setValue('country', data.country)
    setValue('city', data.city)
    setValue('postalCode', data.postalCode)
    setValue('phoneNumber', data.phoneNumber)
  }, [data]);

  const formSubmit = (formData) => {
    axios.post('/api/site/settings', formData).then((result) => {
      toast.success(result.data.message)
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-700 text-xl font-bold">Site bilgileri</h6>
          </div>
        </div>

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {loading ? (
            <div>Loading</div>
          ) : (
            <form onSubmit={handleSubmit(formSubmit)}>
              <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Arama bilgileri
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Site adı
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Slogan
                    </label>
                    <input
                      type="text"
                      {...register('slogan')}
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">

                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Site açıklama
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows="4"
                      {...register('description')}
                    ></textarea>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-gray-300" />

              <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                İletişim bilgileri
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Site Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register('email')}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register('address')}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Şehir
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register('city')}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Ülke
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register('country')}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Posta kodu
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register('postalCode')}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Telefon numarası
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register('phoneNumber')}
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                <button
                  className="w-full bg-gray-700 hover:bg-indigo-500 active:bg-gray-600 text-white font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Kaydet
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </>
  );
}
