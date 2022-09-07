import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter, } from 'next/router';
import Head from 'next/head';



const Forgot = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [cpassword, setCpassword] = useState('');

  const handleChange = async (e) => {


    if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }


  }




  useEffect(() => {

  }, [])

  const sendResetEmail = async () => {
    let data = {
      email, sendMail: true
    }

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    })
    let res = await a.json()
    if (res.success) {
      console.log("password reset instruction been sent to your mail");
    } else {

      console.log("Error");

    }


  }

  const resetPassword = async () => {
    if (password === cpassword) {
      let data = {
        password,
        sendMail: false
      }

      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

      })
      let res = await a.json()
      if (res.success) {
        console.log("password has been changed");
      } else {

        console.log("Error");
      }
    }

  }
  return (
    <>
      <Head>
        <title>forgot  - Farmfreshz.com fresh veggies & fruits </title>
        <meta name="description" content="Farmfresh veggies and fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="  bg-green-100  ">
        <div className="container py-4 px-1 ">


          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-blue-100 shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <img
                          className="mx-auto lg:w-48 md:w-48 w-28 rounded-full"
                          src="/logo1.jpg"
                          alt="logo"
                        />
                        <h4 className="text-xl font-semibold mt-1 mb-6 pb-1">Your friendly farmers at your doorstep</h4>
                      </div>

                      {/* if token is  present */}

                      {router.query.token &&
                        <div>


                          <p className="mb-2  font-semibold text-2xl text-green-900  text-center">Update Your Password</p>
                          <p className="mb-2 text-center">or</p>
                          <Link href={"/login"}><div className="mb-2 text-center text-red-600 active:bg-green-200 font-semibold cursor-pointer"><button className="bg-transparent hover:bg-green-400 text-blue-600 font-semibold hover:text-white py-2 px-4  w-60 border border-blue-400 hover:border-transparent rounded"> Login</button></div></Link>

                          <div className="mb-4">
                            <input
                              type="password"
                              name="password"
                              onChange={handleChange}
                              value={password}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="password"
                              placeholder="New Password"
                            />
                          </div>


                          <div className="mb-4">
                            <input
                              type="password"
                              name="cpassword"
                              onChange={handleChange}
                              value={cpassword}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="cpassword"
                              placeholder="Confirm New Password"
                            />
                          </div>

                          <div className="text-center pt-1 mb-12 pb-1">
                            <button onClick={resetPassword}
                              className="inline-block px-6 py-2.5 text-gray-700
                             font-semibold  leading-tight uppercase rounded shadow-md  bg bg-green-500 hover:bg-green-300 hover:shadow-lg focus:shadow-lg text-sm  w-full mb-3"
                              type="submit"

                            >Continue </button>

                            {password != cpassword &&

                              <span className="text-red-500 font-medium text-lg"> Your new password does not match with confirm password</span>
                            }
                            {password && password === cpassword &&

                              <span className="text-green-600 font-normal text-lg">Password matched</span>
                            }

                          </div>

                          <div className="flex items-center justify-between pb-6">


                          </div>



                        </div>

                      }


                      {/* if token is not  present  */}
                      {!router.query.token &&
                        <div>

                          <p className="mb-2  font-semibold text-2xl text-green-900  text-center">Forgot password</p>
                          <p className="mb-2 text-center">or</p>
                          <Link href={"/login"}><div className="mb-2 text-center text-red-600 active:bg-green-200 font-semibold cursor-pointer"><button className="bg-transparent hover:bg-green-400 text-blue-600 font-semibold hover:text-white py-2 px-4  w-60 border border-blue-400 hover:border-transparent rounded"> Login</button></div></Link>

                          <div className="mb-4">
                            <input
                              type="email"
                              onChange={handleChange}
                              value={email}
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="email-address"
                              placeholder="Email address"
                            />
                          </div>
                          <div className="text-center pt-1 mb-12 pb-1">
                            <button onClick={sendResetEmail}
                              className="inline-block px-6 py-2.5 text-gray-700
                            font-semibold  leading-tight uppercase rounded shadow-md  bg bg-green-500 hover:bg-green-300 hover:shadow-lg focus:shadow-lg disabled:bg-green-300  disabled:hover:bg-green-100  text-sm  w-full mb-3"
                              type="submit"

                            >Continue </button>

                          </div>
                          <div className="flex items-center justify-between pb-6">


                          </div>
                          </div>
                      }
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
                          We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact
                        </p>
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

export default Forgot

