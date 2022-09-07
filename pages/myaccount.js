import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';


const MyAccount = () => {

  const [rname, setRname] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
 
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const [user, setUser] = useState({ value: null });



  const router = useRouter();


  useEffect(() => {

    const myuser = JSON.parse(localStorage.getItem('myuser'))

    if (!myuser) {
      router.push('/')
    }

    if (myuser && myuser.token) {
      setUser(myuser)
      setPhone(myuser.phone)
      fetchData(myuser.token)
    }


  }, [])

  const fetchData = async (token) => {

    let data = { token: token }


    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    })
    let res = await a.json()

    setName(res.name)
    setRname(res.rname)
    setPincode(res.pincode)
    setAddress(res.address)
   


  }



  const handleUserSubmit = async () => {

    let data = { token: user.token, address, name,  pincode, rname }

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    })
    let b = await a.json()


    toast.success('Details Successfully Updated', {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }
  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {

      let data = { token: user.token, password, cpassword, npassword }

      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

      })
      res = await a.json()

    }
    else {
      res = { sucess: false }
    }

    if (res.success) {
      toast.success('Password updated successfully', {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast.error('Error while updating password', {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
    setPassword('')
    setCpassword('')
    setNpassword('')

  }



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

    
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
    else if (e.target.name == 'npassword') {
      setNpassword(e.target.value)
    }


  }

  return (
    <>
      <Head>
        <title>My Account - Farmfreshz.com fresh veggies & fruits </title>
        <meta name="description" content="Farmfresh veggies and fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <div className="container sm:m-auto mx-auto px-2">

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

        <h1 className="text-2xl my-4 text-center font-semibold  text-green-700">Update Your Account </h1>
        <h2 className="text-slate-600 font-semibold  text-center">Delivery Details</h2>





        <div className="lg:w-3/4 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">


            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="rname" className="leading-7 text-m font-s text-gray-600">Cafe/Hotel name</label>
                <input value={rname} onChange={handleChang} type="text" id="rname" name="rname" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>




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

          <button onClick={handleUserSubmit}
            className="  disabled:bg-white w-44 flex mx-auto my-6  bg-blue-500 disabled:border-white disabled:text-red-200 hover:bg-blue-200  hover:border-blue-400 text-white font-semibold py-1 px-4 border-b-4 border-blue-600  justify-center rounded-xl">Submit </button>


        </div>

        <h2 className="text-slate-600 font-semibold text-lg my-4 text-center">Update password</h2>


        <div className="lg:w-3/4 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">


            <div className="p-2 w-1/3">
              <div className="relative">
                <label htmlFor="password" className="leading-7 text-m font-s text-gray-600">Old Password</label>
                <input value={password} onChange={handleChang} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            <div className="p-2 w-1/3">
              <div className="relative">
                <label htmlFor="npassword" className="leading-7 text-m font-s text-gray-600"> New Password</label>
                <input value={npassword} onChange={handleChang} type="password" id="npassword" name="npassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            <div className="p-2 w-1/3">
              <div className="relative">
                <label htmlFor="cpassword" className="leading-7 text-m font-s text-gray-600"> Confirm Password</label>
                <input value={cpassword} onChange={handleChang} type="password" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>



          </div>
        </div>


        <button onClick={handlePasswordSubmit}
          className=" disabled:bg-white w-44 flex mx-auto my-6  bg-blue-500 disabled:border-white disabled:text-red-200 hover:bg-blue-200  hover:border-blue-400 text-white font-semibold py-1 px-4 border-b-4 border-blue-600  justify-center rounded-xl">Submit </button>


      </div>

    </>
  )
}

export default MyAccount
