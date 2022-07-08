import React, { useEffect, useReducer } from "react";

// components

import CardStats from "../Cards/CardStats";
import { IoIosStats } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { CgPerformance } from 'react-icons/cg';


export default function HeaderStats({ orders, users, inCome }) {
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
