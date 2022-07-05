import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

// ICONS
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdNotificationsOutline, IoMdNotifications } from 'react-icons/io';
import UserDropdown from './Dropdowns/UserDropdown';

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    const router = useRouter();

    return (
        <nav className='md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between fixed w-full md:w-64 z-10 py-4 px-6'>
            <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                {/* Toggler */}
                <button
                    className="cursor-pointer hover:bg-indigo-500 hover:text-white text-black opacity-50 md:hidden p-1 text-xl leading-none rounded-full border border-solid border-transparent"
                    type="button"
                    onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                >
                    <HiOutlineMenuAlt1 className='w-6 h-6 ' />
                </button>
                {/* Brand */}
                <Link href="/">
                    <a
                        className="md:block text-left md:pb-0 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                        Ecommerce
                    </a>
                </Link>
                {/* User */}
                <ul className="md:hidden items-center flex flex-wrap list-none">
                    <li className="inline-block relative">
                        <IoMdNotificationsOutline className='w-6 h-6' />
                    </li>
                    <li className="inline-block relative ml-2">
                        <UserDropdown />
                    </li>
                </ul>
                {/* Collapse */}
                <div
                    className={
                        "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                        collapseShow
                    }
                >
                    {/* Collapse header */}
                    <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
                        <div className="flex flex-wrap">
                            <div className="w-6/12">
                                <Link href="/">
                                    <a
                                        className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                    >
                                        Ecommerce
                                    </a>
                                </Link>
                            </div>
                            <div className="w-6/12 flex justify-end">
                                <button
                                    type="button"
                                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                    onClick={() => setCollapseShow("hidden")}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Form */}
                    <form className="mt-6 mb-4 md:hidden">
                        <div className="mb-3 pt-0">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-3 py-2 h-12 border border-solid  border-gray-500 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                            />
                        </div>
                    </form>

                    {/* Divider */}
                    <hr className="mb-4 md:min-w-full" />
                    {/* Heading */}
                    <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Genel
                    </h6>
                    {/* Navigation */}

                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className="items-center">
                            <Link href="/dashboard">
                                <a
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (router.pathname.indexOf("/dashboard") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-700 hover:text-gray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-tv mr-2 text-sm " +
                                            (router.pathname.indexOf("/dashboard") !== -1
                                                ? "opacity-75"
                                                : "text-gray-300")
                                        }
                                    ></i>{" "}
                                    Panel
                                </a>
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link href="/dashboard/settings">
                                <a
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (router.pathname.indexOf("/dashboard/settings") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-700 hover:text-gray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-tools mr-2 text-sm " +
                                            (router.pathname.indexOf("/dashboard/settings") !== -1
                                                ? "opacity-75"
                                                : "text-gray-300")
                                        }
                                    ></i>{" "}
                                    Ayarlar
                                </a>
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link href="/dashboard/orders">
                                <a
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (router.pathname.indexOf("/dashboard/orders") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-700 hover:text-gray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-table mr-2 text-sm " +
                                            (router.pathname.indexOf("/dashboard/orders") !== -1
                                                ? "opacity-75"
                                                : "text-gray-300")
                                        }
                                    ></i>{" "}
                                    Siparişler
                                </a>
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link href="/dashboard/accounts">
                                <a
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (router.pathname.indexOf("/dashboard/accounts") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-700 hover:text-gray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-map-marked mr-2 text-sm " +
                                            (router.pathname.indexOf("/dashboard/accounts") !== -1
                                                ? "opacity-75"
                                                : "text-gray-300")
                                        }
                                    ></i>{" "}
                                    Hesaplar
                                </a>
                            </Link>
                        </li>
                    </ul>


                    {/* Divider */}
                    <hr className="mb-4 md:min-w-full" />
                    {/* Heading */}
                    <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                        Yönetim
                    </h6>
                    {/* Navigation */}

                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className="items-center">
                            <Link href="/dashboard/products">
                                <a
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (router.pathname.indexOf("/dashboard/products") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-700 hover:text-gray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-tv mr-2 text-sm " +
                                            (router.pathname.indexOf("/dashboard/products") !== -1
                                                ? "opacity-75"
                                                : "text-gray-300")
                                        }
                                    ></i>{" "}
                                    Ürünler
                                </a>
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link href="/dashboard/categories">
                                <a
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (router.pathname.indexOf("/dashboard/categories") !== -1
                                            ? "text-blue-500 hover:text-blue-600"
                                            : "text-gray-700 hover:text-gray-500")
                                    }
                                >
                                    <i
                                        className={
                                            "fas fa-tools mr-2 text-sm " +
                                            (router.pathname.indexOf("/dashboard/categories") !== -1
                                                ? "opacity-75"
                                                : "text-gray-300")
                                        }
                                    ></i>{" "}
                                    Kategoriler
                                </a>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}
