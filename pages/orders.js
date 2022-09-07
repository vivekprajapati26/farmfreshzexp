import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

import Link from 'next/link';

const Orders = () => {

  const router = useRouter()
  const [orders, setOrders] = useState([]);

  const [date, setDate] = useState();

  useEffect(() => {
    const fetchOrders = async () => {

      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),

      })
      let res = await a.json()
      setOrders(res.orders);


    }

    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchOrders();

    }

  }, []);


  return (
    <>

      <Head>
        <title>Orders - Farmfreshz.com fresh veggies & fruits </title>
        <meta name="description" content="Farmfresh veggies and fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <p className=" mx-auto  text-center text-base  text-red-500">
          To cancel your order please call or Whats app your order id on phone NO : 8368681752   !!! <br />
          <span className="text-slate-500"> Please pay through cash or upi when order is recived</span>
        </p>


        <h1 className="font-bold text-xl mx-6 ">My Orders </h1>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="w-screen">
                  <thead className="bg-white border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                        OrderID
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                        Details
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                        Date/Time
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-4 text-left">
                        Price(₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => {
                      const d = new Date(item.createdAt)

                      return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
                        <td className="text-sm text-blue-600 font-semibold px-2 py-4 whitespace-nowrap">
                          < Link href={'/myorder?id=' + item._id}>Details</Link>
                        </td>

                        <td className="text-sm text-gray-900 font-semibold px-2 py-4 whitespace-nowrap">
                          {d && d.toLocaleString("hi-IN")}
                        </td>
                        <td className="text-sm text-gray-900 font-semibold px-2 py-4 whitespace-nowrap">
                          {item.amount}
                        </td>
                      </tr>
                    })}


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>



      </div>




    </>


  )
}



export default Orders
