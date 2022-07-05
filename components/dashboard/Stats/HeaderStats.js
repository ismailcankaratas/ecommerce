import React, { useEffect, useReducer } from "react";

// components

import CardStats from "../Cards/CardStats";
import { IoIosStats } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { CgPerformance } from 'react-icons/cg';
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
            return { ...state, users: action.payload }
        case 'GET_ORDERS':
            return { ...state, orders: action.payload }
        case 'CALCULATE_INCOME':
            return { ...state, inCome: action.payload }
        default: state;
    }
}

export default function HeaderStats() {
    const [{ users, orders, inCome }, dispatch] = useReducer(reducer, {
        users: [],
        orders: [],
        inCome: 0
    });

    useEffect(() => {
        const getUsers = async () => {
            const { data } = await axios.get(`/api/users/getAll`);
            dispatch({ type: 'GET_USERS', payload: data });
        }
        const getOrders = async () => {
            const { data } = await axios.get(`/api/orders/getAll`);
            dispatch({ type: 'GET_ORDERS', payload: data });
        }
        const calculateIncome = async () => {
            let newInCome = 0;
            orders.map(order => {
                newInCome = order.itemsPrice;
            })
            dispatch({ type: 'CALCULATE_INCOME', payload: newInCome });
        }
        if (users.length == 0) {
            getUsers();
        }
        if (orders.length == 0) {
            getOrders();
        }
        calculateIncome();
    }, [users, orders]);

    return (
        <>
            {/* Header */}
            <div className="relative md:pt-32 pb-6 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex justify-evenly flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">

                                <CardStats
                                    statSubtitle="Siparişler"
                                    statTitle={orders.length}
                                    statArrow="up"
                                    statPercent=""
                                    statPercentColor="text-emerald-500"
                                    statDescripiron=""
                                    statIconName={<IoIosStats />}
                                    statIconColor="bg-red-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Müşteriler"
                                    statTitle={users.length}
                                    statArrow="down"
                                    statPercent=""
                                    statPercentColor="text-red-500"
                                    statDescripiron=""
                                    statIconName={<FaUserAlt />}
                                    statIconColor="bg-orange-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="Kazanç"
                                    statTitle={`${inCome} ₺`}
                                    statArrow="down"
                                    statPercent=""
                                    statPercentColor="text-orange-500"
                                    statDescripiron=""
                                    statIconName={<MdAttachMoney />}
                                    statIconColor="bg-pink-500"
                                />
                            </div>
                            {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="PERFORMANCE"
                                    statTitle="49,65%"
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Since last month"
                                    statIconName={<CgPerformance />}
                                    statIconColor={"bg-blue-500"}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
