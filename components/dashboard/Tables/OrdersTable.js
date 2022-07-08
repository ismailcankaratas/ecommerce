import React from "react";
import PropTypes from "prop-types";
import { BsCircleFill } from 'react-icons/bs';
import { toast } from "react-toastify";
import axios from 'axios';
import { getError } from "../../../utils/error";
import { useRouter } from "next/router";

// components

export default function ProductsTablee({ color, orders }) {
  const router = useRouter();
  function orderState(value, order) {
    if (value == "isDelivered") {
      order.isDelivered = true;
      axios.post('/api/products/update', { order }).then((result) => {
        return toast.success("Sipariş teslim edildi olarak güncellendi")
      }).catch((err) => {
        return toast.error(getError(err))
      });
    }
    if (value == "gettingReady") {
      order.isDelivered = false;
      axios.post('/api/products/update', { order }).then((result) => {
        return toast.success("Sipariş hazırlanıyor olarak güncellendi")
      }).catch((err) => {
        return toast.error(getError(err))
      });
    }
  }
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
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-200">
                    <th className=" mt-1 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      # {order.id}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2">
                      {order.totalPrice} ₺
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                      <div className="flex items-center ">
                        <BsCircleFill className={`fas fa-circle mr-2 ${order.isDelivered ? "text-indigo-500" : "text-indigo-200"}`} />
                        <div className="relative">
                          <select defaultValue={order.isDelivered ? "isDelivered" : "gettingReady"}
                            onChange={(e) => orderState(e.target.value, order)}
                            className="block appearance-none w-full bg-gray-200  cursor-pointer border border-gray-300 text-gray-700  py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            <option value="gettingReady">Hazırlanıyor</option>
                            <option value="isDelivered">Teslim edildi</option>
                          </select>
                        </div>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
                      {order.user.name}
                    </td>
                    <td>
                      <button onClick={() => router.push('/dashboard/orders/' + order.id)}
                        className="bg-indigo-300 text-white px-8 py-2 rounded  cursor-pointer"
                      >Detay</button>
                    </td>
                  </tr>
                ))}
              </tbody>
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
