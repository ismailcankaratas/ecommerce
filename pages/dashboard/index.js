import React, { useEffect, useReducer, useState } from 'react'
import CardBarChart from '../../components/dashboard/Cards/CardBarChart'
import CardLineChart from '../../components/dashboard/Cards/CardLineChart'
import Layout from '../../components/dashboard/Layout'
import HeaderStats from '../../components/dashboard/Stats/HeaderStats'
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
export default function index() {
  const [{ users, orders, inCome }, dispatch] = useReducer(reducer, {
    users: [],
    orders: [],
    inCome: 0
  });

  const [orderMounthsLabel, setOrderMounthsLabel] = useState([]);
  const [mounths, setMounths] = useState(["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]);
  const [orderMounthInCome, setOrderMounthInCome] = useState([]);
  const [orderMounthOrders, setOrderMounthOrders] = useState([]);

  const mountlyInCome = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const mountlyOrders = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

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
        newInCome += order.itemsPrice;
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


  useEffect(() => {
    const getOrdersMounts = () => {
      orders?.forEach(element => {
        var mounthIndex = new Date(element.createdAt).getMonth();
        var mounth = mounths[mounthIndex].toString();

        if (!orderMounthsLabel.includes(mounth)) {
          setOrderMounthsLabel([...orderMounthsLabel, mounth])
        }

        mounthIncomeCalc(mounthIndex, element.itemsPrice);
        mounhtlyOrders(mounthIndex);
      });
    }

    function mounthIncomeCalc(mounthIndex, itemsPrice) {
      mountlyInCome[mounthIndex] += itemsPrice;
    }

    function mounhtlyOrders(mounthIndex) {
      mountlyOrders[mounthIndex]++;
    }

    function zeroClear(array) {
      for (let i = 0; i <= mounths.length; i++) {
        var index = array.indexOf(0);
        (index !== -1) && array.splice(index, 1);
      }
    }
    getOrdersMounts();
    zeroClear(mountlyInCome);
    zeroClear(mountlyOrders);
    setOrderMounthInCome(mountlyInCome);
    setOrderMounthOrders(mountlyOrders);
  }, [orders]);


  return (
    <Layout>
      <div className='-mt-48 md:-mt-64'>
        <HeaderStats orders={orders} users={users} inCome={inCome} />
      </div>
      <div className="flex flex-wrap mx-10">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart orderMounthInCome={orderMounthInCome} orderMounthsLabel={orderMounthsLabel} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart orderMounthsLabel={orderMounthsLabel} orderMounthOrders={orderMounthOrders} />
        </div>
      </div>
    </Layout>
  )
}

index.auth = { adminOnly: true };