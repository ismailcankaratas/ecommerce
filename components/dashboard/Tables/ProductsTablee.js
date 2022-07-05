import React from "react";
import PropTypes from "prop-types";

// components

import { BsCircleFill } from 'react-icons/bs';

import TableDropdown from "../Dropdowns/TableDropdown";

export default function ProductsTablee({ color, orders }) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-gray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-gray-700" : "text-white")
                }
              >
                Siparişler
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >
                  Sipariş
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >
                  Fiyat
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >
                  Durum
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                >Müşteri</th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-gray-50 text-gray-500 border-gray-100"
                      : "bg-gray-600 text-gray-200 border-gray-500")
                  }
                ></th>
              </tr>
            </thead>
            {orders.length == 0 ? (
              <div>Heniz sipariş yok</div>
            ) : (
              orders.map(order => (
                <tbody>
                  <tr>
                    <th className=" mt-1 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      # {order.id}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {order.totalPrice} ₺
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                      <div className="flex items-center ">
                        <BsCircleFill className="fas fa-circle text-orange-500 mr-2" /> Hazırlanıyor
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                      {order.user.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 text-right">
                      <TableDropdown />
                    </td>
                  </tr>

                </tbody>
              ))
            )}

          </table>
        </div>
      </div>
    </>
  );
}

ProductsTablee.defaultProps = {
  color: "light",
};

ProductsTablee.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
