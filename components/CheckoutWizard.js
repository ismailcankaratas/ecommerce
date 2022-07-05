import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
    return (
        <div className='mb-5 flex flex-wrap mt-8  2xl:container 2xl:mx-auto py-4 md:px-12 px-4'>
            {
                ['Hesap Giriş', 'Teslimat Adresi', 'Ödeme Yöntemi', 'Sipariş Ver'].map((step, index) => (
                    <div key={step}
                        className={`flex-1 border-b-2 text-center py-2 transition-all
                        ${index <= activeStep ? 'border-indigo-500 text-indigo-500' : 'border-gray-400 text-gray-400'}`}>
                        {index + 1}
                        <br />
                        {step}
                    </div>
                ))
            }
        </div>
    )
}
