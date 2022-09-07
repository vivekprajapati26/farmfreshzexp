import React from 'react'
import Link from 'next/link'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'






const Checkout = ({ cart, addToCart, removeFromCart, subTotal, clearCart, subQty }) => {

    const [rname, setRname] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState({ value: null });

    const [disabled, setDisabled] = useState(true);



    useEffect(() => {

        const myuser = JSON.parse(localStorage.getItem('myuser'))

        if (myuser && myuser.token) {
            setUser(myuser)
            setPhone(myuser.phone)
            fetchData(myuser.token)
        }
    }, []);

    useEffect(() => {

        if (rname.length > 1 && name.length > 1 && address.length > 1 && phone.length > 1 ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

    }, [name,  phone, rname, address, pincode]);

    async function fetchData(token) {

        let data = { token: token };


        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let res = await a.json();

        setName(res.name);
        setRname(res.rname);
        setPincode(res.pincode);
        setAddress(res.address);
        setPhone(res.phone);


    }


    const router = useRouter()

    const handleChang = async (e) => {


        if (e.target.name == 'rname') {
            setRname(e.target.value)
        }
        else if (e.target.name == 'name') {
            setName(e.target.value)
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value)
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value)
        }
        
        else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }


    }


    const checkoutOrders = async () => {
        let oid = Math.floor(Math.random() * Date.now());
        const data = { cart, subTotal, oid, rname,  address, name, pincode, phone };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkoutorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
        let b = await a.json()

        if (b.success) {

            toast.success('You order is placed successfully', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push(`${process.env.NEXT_PUBLIC_HOST}/orders`)
            }, 1000);

            clearCart();


        }
        else {
            toast.error(response.error, {
                position: "top-center",
                autoClose: 499,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

    }







    return (

        <>

            <Head>
                <title>Checkout - Farmfreshz.com fresh veggies & fruits </title>
                <meta name="description" content="Farmfresh veggies and fruits" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container sm:m-auto px-2">
                <h1 className="font-bold text-2xl  text-green-800 my-8 text-center">CHECKOUT</h1>
                <h2 className="text-green-800 font-bold text-center">Delivery Details</h2>
                <div className="lg:w-3/4 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">


                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="rname" className="leading-7 text-m font-s text-gray-600">Cafe/Hotel name</label>
                                <input value={rname} onChange={handleChang} type="text" id="rname" name="rname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>


                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />




                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-m font-s text-gray-600">Name</label>
                                <input value={name} onChange={handleChang} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>




                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="address" className="leading-7 text-m font-s text-gray-600">Address</label>
                                <textarea value={address} onChange={handleChang} rows="2" cols="2" type="text" id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                <p className="text-gray-400">city, area </p>
                            </div>
                        </div>


                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="pincode" className="leading-7 text-m font-s text-gray-600">pincode</label>
                                <input value={pincode} onChange={handleChang} type="number" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>

                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label htmlFor="phone" className="leading-7 text-m font-s text-gray-600">Phone</label>
                                {user && user.token ? <input value={user.phone} type="phone" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input value={phone} onChange={handleChang} type="phone" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}

                            </div>
                        </div>





                    </div>
                </div>
                <h2 className="text-red-500 my-4 font-bold text-lg text-center">Review your cart</h2>
                {/* CART */}


                <div className=" w-full  m-auto justify-center  rounded-md  bg-green-200 py-10 px-6  ">
                    <h2 className="text-xl font-bold text-green-900 text-center "> MY CART</h2>

                    <ol className=" list-decimal font-semibold my-5">

                        {/* list items */}

                        <ol className="list-decimal my-6 mx-2 font-semibold">
                            {Object.keys(cart).length == 0 &&
                                <div className="my-4 text-center justify-center text-3xl text-green-600 font-normal">Please add a few items in cart to checkout</div>
                            }

                            {Object.keys(cart).map((k) => {
                                return <li key={k} >
                                    <div className=" w-full grid grid-cols-3 divide-x  items-center   justify-center my-8">
                                        <div className=" "><img className="h-20 w-22  border-blue-100 shadow-md shadow-blue-300 rounded-lg   p-1" src={cart[k].img} alt="farmfreshz.com" /></div>


                                        <div className="  font-semibold text-lg ml-3 mr-2 ">{cart[k].name} <span><br />{cart[k].dqty}kg {`\xa0`}₹{cart[k].price}</span>
                                        </div>


                                        {/* buttons*/}
                                        <div className=" flex text-xl  font-semibold items-center justify-center ml-2"><FaMinusCircle onClick={() => { removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].dqt, cart[k].img, cart[k].priceperkg) }} className="mx-2 text-red-600 hover:shadow-lg cursor-pointer rounded-2xl hover:bg-red-600 text-xl" /> {cart[k].qty}<FaPlusCircle onClick={() => { addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].dqty, cart[k].img, cart[k].priceperkg) }} className="mx-2 text-xl cursor-pointer text-red-600 hover:shadow-2xl rounded-2xl hover:bg-red-400" /></div>
                                    </div>

                                </li>

                            })}

                            <div className="toatal  my-8 text-red-700 text-center  font-bold"><span className="S text-2xl font-bold">Total : ₹ {subTotal}</span></div>

                        </ol>




                        <button disabled={disabled} onClick={checkoutOrders}
                            className=" disabled:bg-white flex mx-auto my-6 bg-blue-500 disabled:border-white disabled:text-red-200 hover:bg-blue-200  hover:border-blue-400 text-white font-semibold py-2 px-4 border-b-4 border-blue-600  rounded-xl">ORDER NOW ₹ {subTotal}</button>

                    </ol>


                </div>


            </div>


        </>

    )
}


export default Checkout
