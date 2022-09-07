import Head from 'next/head'
import { BsFillBagCheckFill } from 'react-icons/bs'

import Product from '../models/Product'
import mongoose from 'mongoose'

import React from 'react'





const home = ({ products, addToCart, cart }) => {

  return (

    < >

      <Head>
        <title>Farmfreshz.com--veggies and fruits</title>
        <meta name="description" content="Farmfresh veggies and fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <section className="text-gray-600 body-font ">

        <div className="  px-4  container mx-auto">
          <div className="flex flex-wrap mx-2 my-4">



            {/* Products */}

             {products.map((item) => {

              return <div key={item._id} className="lg:w-1/5 md:w-1/4 p-4 w-1/2  shadow-md shadow-blue-300 rounded-lg">
                <a className="block relative  h-32 lg:h-40 md:h-40 rounded overflow-hidden">
                  <img alt="farmfreshz.com" className="my-auto w-full h-full block  rounded-3xl" src={item.img}/>
                </a>
                <div className="mt-1 text-center " >
                  <h2 className="text-gray-500 font-semibold text-xls tracking-widest title-font mb-0">{item.title}   ₹{item.priceperkg}/kg</h2>
                  <div className="W-3/4   flex justify-center text-lg font-semibold text-red-600 items-center  m-0.5  shadow-blue-">
                    <span className="mx-1 text-xl">₹{item.price}/{item.dqty}kg</span>
                    <div className=" flex items-center mx-2">

                    </div>
                  </div>
                  
                  <button onClick={() => addToCart(item._id, 1, item.price, item.title, item.dqty, item.img)}  className=" flex mx-auto my-1 bg-green-500 hover:bg-green-400 text-green-900 font-bold py-0 px-10 border-b-4 border-green-700 hover:border-green-500 rounded-xl"><BsFillBagCheckFill className="mt-1" />ADD</button>
                </div>
              </div>

            }

            )} 

   


            




          </div>
        </div>
      </section>
    </>


  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: { $in: [ 'vegetable','exoticveg'] } })

 return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  }
 }

export default home
