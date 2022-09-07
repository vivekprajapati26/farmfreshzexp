import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { AiFillCloseCircle } from 'react-icons/ai'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useRef, useState,useEffect } from 'react';
import { useRouter } from 'next/router';





const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, subQty }) => {


  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const router = useRouter()
 
  useEffect(() => {
    
  Object.keys(cart).length !== 0 && setSidebar(true)  
  let exempted = ['/checkout','/orders','/myorder','/login','/signup','/forgot','/about','/myaccount','/herbs','/exoticveg','/fruits']
  if(exempted.includes(router.pathname)){
    setSidebar(false)
  }   
    
  }, []);

  

  const toggleCart = () => {

    setSidebar(!sidebar)
    // if (ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-full')
    //   ref.current.classList.add('translate-x-0')

    // }
    // else if (!ref.current.classList.contains('translate-x-full')) {
    //   ref.current.classList.remove('translate-x-0')
    //   ref.current.classList.add('translate-x-full')
    // }
    
 
  }
  const ref = useRef()
  return (
    <>

      



    <div className={`flex flex-col md:flex-row  md:justify-start bg-green-400 shadow-md sticky top-0 z-10 ${!sidebar && 'overflow-hidden'}`}>
    
      <div className="logo ml-1 my-0  flex">
        <Image className="rounded-full" src="/logo1.jpg" alt="farmfreshz.com" height={50} width={50} />
        <div className="font-semibold px-1 py-1 mt-1 text-blue-800  text-xl md:text-2xl lg:text-2xl">farmfreshz.com</div>

      </div>
      <div className="nav flex md:mx-20 lg:mx-20 mx-2 ">
        <ul className="flex p-1 items-center  space-x-4 md:space-x-8 lg:space-x-8 font-semibold md:text-x1  cursor-pointer hover">
          <Link href={'/'}><li><a className="active:text-blue-300  hover:shadow-lg  rounded-md hover:bg-green-800">Veggies</a></li></Link>
          <Link href={'/herbs'}><li><a className="active:text-blue-300  rounded-md hover:bg-green-600" >Spices</a></li></Link>
          <Link href={'/fruits'}><li><a className="active:text-blue-300 rounded-md hover:bg-green-600">Fruits</a ></li></Link>
          <Link href={'/exoticveg'}><li><a className="active:text-blue-300 rounded-md hover:bg-green-600">Exotic</a></li></Link>

        </ul>
      </div>

      {/* Login */}


      <div className=" flex cart absolute right-0 top-0  mx-2">
            
        
       {!user.value && 
      <Link 
       href={'/login'}>
          <a><button className="bg-slate-200 px-2  hover:bg-blue-400 my-3 text-blue-800 font-medium mt-3 lg:mt-3 md:mt-3 rounded-md ">Login</button></a></Link>}

        <div className='block'>



            {/* DropDown menu my account */}

         { !sidebar &&<span onMouseOver={() => setDropdown(true)} onMouseLeave={()=>{setDropdown(false)}} className="fixed right-10 top-0 z-20 cursor-pointer" >

{dropdown && <div   className="fixed right-8 top-10 z-20  bg-green-100 rounded-md  w-24">
  <ul >
    <Link href={'/myaccount'}><li className=" cursor-pointer px-1 py-1 hover:text-blue-500  font-semibold "  >My Account</li></Link>
    <hr />
    <Link href={'/orders'}><li className=" font-medium px-1 py-1 cursor-pointer hover:text-blue-500 ">My Orders</li></Link>
    <hr />
    <a onClick={logout} ><li  className=" font-medium px-1 py-1 cursor-pointer hover:text-blue-500 ">Logout</li>
    </a>
  </ul>
  


</div>}

<span >  {user.value && <MdAccountCircle className='text-5xl mx-1 md:text-6xl  lg:text-5xl md:mx-4  lg:mx-4  mt-0  text-blue-800 active:bg-blue-300 hover:bg-green-800 rounded-md ' />}
</span>

</span>} 

          {/* cart */}

          <button onClick={toggleCart} className="py-2 mt-0 md:my-0 lg:my-0 px-1 relative border-2 border-transparent  active:bg-blue-300 hover:bg-green-800 text-gray-800 rounded-full  hover:text-gray-400 focus:outline-none  focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
            <svg className="h-8 w-8 hover:bg-green-800 " fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span className="absolute inset-0 object-right-top -mr-6">
              <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">{subQty}</div></span></button>

        </div>
      </div>


      {/* SIDE CART */}


      <div  ref={ref} className={` w-90 overflow-auto  h-[100vh] z-40 rounded-md  sideCart   absolute top-0 bg-green-300 py-10 px-6  transition-all ${sidebar? ' right-0' : '-right-full'} `}>
        <h1 className="text-xl font-bold text-green-900 text-center "> MY CART</h1>
        <h2 className=" font-semibold text-red-500 text-center ">Early morning delivery.</h2>
        <h3 className="text-base font-semibold text-red-500 text-center ">No deliveries on sunday!! </h3>

        <span onClick={toggleCart} className="absolute top-5  right-2 text-4xl active:bg-red-300 hover:bg-red-600 text-red-700  cursor-pointer rounded-md"><AiFillCloseCircle /></span>


        {/* CART ITEMS */}
        <ol className="list-decimal my-6 font-semibold">
          {Object.keys(cart).length == 0 &&
            <div className="my-4 w-60 text-xl text-green-600 font-normal">Please add a few items in cart to checkout</div>
          }

          {Object.keys(cart).map((k) => {
            return <li key={k} >
              <div className="item flex my-2">
                <div className="w-2/3  font-semibold text-lg">{cart[k].name}
                <span> <br /><img className="h-14 w-18  border-blue-100 shadow-md shadow-blue-300 rounded-lg   p-1" src={cart[k].img} alt="farmfreshz.com" /> </span>
                <span>{cart[k].dqty}kg - - ₹{cart[k].price}</span>
                </div>

                {/* buttons
               */}
                <div className=" flex text-xl font-semibold items-center justify-center w-1/3 "><FaMinusCircle onClick={() => { removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].dqt, cart[k].img, cart[k].priceperkg) }} className="mx-1 text-red-600 hover:shadow-lg cursor-pointer rounded-2xl hover:bg-red-600" />{cart[k].qty}<FaPlusCircle onClick={() => { addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].dqty, cart[k].img, cart[k].priceperkg) }} className="ml-1 cursor-pointer text-red-600 hover:shadow-2xl rounded-2xl hover:bg-red-400" /></div>
              </div>
            </li>
          })}
          <div className="  my-8 text-red-600  font-semibold"><span className="S text-xl font-semibold">Total : ₹ {subTotal}</span></div>
        </ol>

        {/* checkout button */}

        <Link Link href="/checkout"><button disabled={Object.keys(cart).length===0} className=" disabled:bg-blue-200 rounded-lg disabled:border-blue-300 flex mx-auto mt-16 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-blue-700 text-lg hover:border-blue-500 "><BsFillBagCheckFill className="mt-1" />Checkout</button></Link>

        {/* CLEAR CART BUTTON */}

        <button onClick={clearCart}  disabled={Object.keys(cart).length===0} className="rounded-lg  disabled:bg-red-100 disabled:border-red-200   flex mx-auto mt-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-2 border-b-4 border-red-700 text-sm hover:border-red-500 ">CLEAR CART</button>



      </div>


    </div >

    </>
  )
}

export default Navbar

