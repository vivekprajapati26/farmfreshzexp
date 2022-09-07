import mongoose from 'mongoose'
import React from 'react'
import Order from '../models/Order'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

const MyOrder = ({ order }) => {

  const router = useRouter();

  const products = order.products
  const [date, setDate] = useState();

  useEffect(() => {


    const d = new Date(order.createdAt)
    setDate(d)
  }, []);



  return (

    <>


      <Head>
        <title>Order - Farmfreshz.com fresh veggies & fruits </title>
        <meta name="description" content="Farmfresh veggies and fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container px-5 py-4 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">ORDER ID : {order.orderId}</h1>
          <p className="sm:text-xl text-lg font-medium title-font mb-2 text-gray-900">Date and Time : {date && date.toLocaleString("hi-IN")}</p>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-lg  text-black">🤟 Your order is successfully placed </p>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base   text-slate-500">
            To cancel your order please call or Whats app your order id on : 8368681752 !!! <br /> <br />
            <span className="text-xl font-semibold text-red-500"> Please pay through cash or upi when order is recived</span>
          </p>

          <div className="lg:w-2/3 w-full mx-auto overflow-auto">


            <div className="  grid grid-cols-3 divide-x  items-center text-lg text-green-700 justify-center my-8">
              <div className="my-1">Name</div>
              <div className="my-1">Qty(kg)</div>
              <div className="my-1">Price(₹)</div>
            </div>

            {Object.keys(products).map((key) => {

              return <div key={key} className="  grid grid-cols-3 divide-x  items-center text-lg text-green-700 justify-center my-10">
                <div className="my-1 text-black">{products[key].name}</div>
                <div className="my-1 text-black">{products[key].dqty}</div>
                <div className="my-1 text-black">{products[key].price}</div>

              </div>
            })}




            <div className=" mt-4 text-lg font-semibold text-red-500">Total: ₹ {order.amount} </div>

          </div>
        </div>

      </div>

    </>

  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let order = await Order.findById(context.query.id)

  return {
    props: { order: JSON.parse(JSON.stringify(order)) }
  }
}

export default MyOrder
