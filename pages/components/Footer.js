import Image from 'next/image'
import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { AiOutlineMail} from 'react-icons/ai'

const Footer = () => {
  return (
    <div>    <footer className="text-gray-600 body-font">
      <div className="container px-5 pt-20 pb-2 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">

          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">


            <Image className="rounded-full" src="/logo1.jpg" alt="farmfresh" width={100} height={100} />
          </a>
          <h1 className="mt-2 text-m text-black  items-center font-medium ">farmfreshz.com</h1>

          <p className="mt-2 text-sm text-gray-500  items-center ">Your friendly farmers at your doorstep</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-800 tracking-widest text-base mb-3">ABOUT US</h2>
            <nav className="list-none mb-10">
              <h4 className="text-sm font-medium   mb-6">We are more than just a company</h4>
              <p className="text-sm  text-gray-600">
                We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immeditaly after harvest , so that quality and freshness remain intact </p>


            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-2">
          <h2 className="title-font font-medium text-gray-800 tracking-widest text-base mb-4">CONTACT US</h2>
            <nav className="list-none mb-10">
              
              <li >
               <h4 className="text-gray-600 hover:text-gray-800 flex "><FiPhoneCall className=" ml-28 lg:ml-0 md:ml-0 mt-1 mr-2"/>8368681752</h4>
              </li>
              <li>
              <h4 className="text-gray-600 hover:text-gray-800 flex "><AiOutlineMail className=" ml-6 lg:ml-0 md:ml-0 mt-1 mr-2"/>farmfreshadmni0511@gmail.com</h4>
              </li>
             
            </nav>
          </div>


          {/* <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div> */}


        </div>


      </div>

      <div className="bg-green-400">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-900 text-sm text-center sm:text-left">
            <a href="farmfreshz.com" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@copyright farmfreshz.com</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500">

            </a>
            <a className="ml-3 text-gray-500">

            </a>
            <a className="ml-3 text-gray-500">

            </a>
            <a className="ml-3 text-gray-500">

            </a>
          </span>
        </div>
      </div>
    </footer>



    </div>
  )
}

export default Footer

