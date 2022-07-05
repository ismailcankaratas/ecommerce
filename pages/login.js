import { LockClosedIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;

    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const { handleSubmit, register, formState: { errors } } = useForm();

    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })

            if (result.error) {
                toast.error(result.error);
            }

        } catch (err) {
            toast.error(getError(err));
        }
    }
    return (
        <Layout title="Giriş yap">
            <div className="bg-light flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <span className="sr-only">Shopping</span>
                        <img
                            className="h-12 mx-auto w-auto"
                            src="/ShoppingLogo.png"
                            alt=""
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Giriş yap</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Yada{' '}
                            <Link href="/register">
                                <a className="font-medium text-indigo-600 hover:text-bg">
                                    hesap oluştur
                                </a>
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" method='post' onSubmit={handleSubmit(submitHandler)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    {...register('email', {
                                        required: 'Lütfen e-posta giriniz',
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                            message: 'Lütfen geçerli bir e-posta girin',
                                        },
                                    })}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-light rounded-t-md focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                                {errors.email && (
                                    <div className="text-red-500">{errors.email.message}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Lütfen şifre giriniz',
                                        minLength: { value: 6, message: 'şifre 5 karakterden fazla olmalı' },
                                    })}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            {errors.password && (
                                <div className="text-red-500">{errors.password.message}</div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:indigo-600"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Giriş yap
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
