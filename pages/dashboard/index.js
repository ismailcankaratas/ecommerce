import React from 'react'
import CardBarChart from '../../components/dashboard/Cards/CardBarChart'
import CardLineChart from '../../components/dashboard/Cards/CardLineChart'
import Layout from '../../components/dashboard/Layout'
import HeaderStats from '../../components/dashboard/Stats/HeaderStats'

export default function index() {
  return (
    <Layout>
      <div className='-mt-48 md:-mt-64'>
        <HeaderStats />
      </div>
      <div className="flex flex-wrap mx-10">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
    </Layout>
  )
}

index.auth = { adminOnly: true };