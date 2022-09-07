import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';


const Login = () => {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem('myuser')) {
      router.push('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { phone, password }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }, [])

    let response = await res.json()


    setPhone('')
    setPassword('')



    if (response.success) {
      localStorage.setItem('myuser', JSON.stringify({ token: response.token, phone: response.phone }))
      toast.success('You are sucessfully logged in ', {
        position: "top-center",
        autoClose: 499,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}`)
      }, 800);


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
        <title>Login - Farmfreshz.com fresh veggies & fruits </title>
        <meta name="description" content="Farmfresh veggies and fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="  bg-gray-200  ">
        <div className="container py-4 px-1 ">
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
          {/* Same as */}
          <ToastContainer />
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">

                      <div className="text-center">
                        <img
                          className="mx-auto lg:w-48 md:w-48 w-28"
                          src="/logo1.jpg"
                          alt="logo"
                        />
                        <h4 className="text-xl font-semibold mt-1 mb-6 pb-1">Your friendly farmers at your doorstep</h4>
                      </div>
                      <form onSubmit={handleSubmit} method="POST">
                        <p className="mb-2 text-center  font-bold text-2xl text-green-900 ">Please login to your account</p>
                        <p className="mb-2 text-center">or</p>
                        <Link href={"/signup"}><div className="mb-2 text-center text-red-600 active:bg-green-200 font-semibold cursor-pointer"><button className="bg-transparent hover:bg-green-400 text-blue-600 font-semibold hover:text-white py-2 px-4  w-60 border border-blue-400 hover:border-transparent rounded"> Sign Up/ Create An Account</button></div></Link>
                        <div className="mb-4">
                          <input
                            type="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            name="phone"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="phone"
                            placeholder="Phone"
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="password"
                            name="password"
                            placeholder="Password"
                          />
                        </div>
                        <div className="text-center flex flex-col justify-center items-center pt-1 mb-12 pb-1">
                          <button type="submit"
                            className="inline-block px-6 py-2.5 text-gray-700
                            font-semibold text-sm leading-tight uppercase rounded bg-green-300 shadow-md  active:bg-green-200 hover:bg-green-700 hover:shadow-lg w-72 mb-3 hover:border-transparent ">Login  </button>
                          {/* <Link className="text-green-900 active:bg-red-400  font-semibold cursor-pointer" href='/forgot'>Forgot password?</Link> */}
                        </div>
                        <div className="flex items-center justify-between pb-6">


                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                    style={{
                      background: " linear-gradient(to right,#00ff99, #66ffcc ,#66ff99 , #0099cc)"
                    }}

                  >
                    <div className="text-gray-700 px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                      <p className="text-sm font-semibold text-gray-600">
                        We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact </p>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Login

