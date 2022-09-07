import { useState,useEffect } from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import Head from 'next/head';


function MyApp({ Component, pageProps }) {

const [cart ,setCart] = useState({});
const [subTotal,setSubTotal]= useState(0);
const [subQty, setSubQty] = useState(0);
const [user, setUser] = useState({value:null});
const [key, setKey] = useState();


const router = useRouter();


// useEffect for reloading cart

useEffect(() => {
  
  try {
    if(localStorage.getItem("cart")){
      setCart(JSON.parse(localStorage.getItem("cart")))
      saveCart(JSON.parse(localStorage.getItem("cart")))
    }
    
  } catch (error) {
    console.error(error);
    localStorage.clear()
  }
 const myuser = JSON.parse(localStorage.getItem('myuser'))
 if(myuser){
setUser({value:myuser.token , phone:myuser.phone})

 }
 setKey(Math.random())
 
}, [router.query]);

const logout =()=>{
  
  localStorage.removeItem("myuser")
  setUser({value:null})
  setKey(Math.random())
  router.push('/')
}


// Save to localStorage

const saveCart = (myCart) => {
  localStorage.setItem("cart",JSON.stringify(myCart))
  

  let subt = 0 ;
  let subq=0;
  let keys = Object.keys(myCart)
  for(let i=0; i<keys.length; i++){
    subt += myCart[keys[i]].price ;
    subq += myCart[keys[i]].qty;

  }
  setSubTotal(subt)
  setSubQty(subq)

  

}
// Add to CART
const addToCart = (itemCode , qty ,price ,name, dqty, img , priceperkg )=>{
  let newCart = cart;
  if (itemCode in cart){
    let num3 =cart[itemCode].qty;
    let num4 = cart[itemCode].dqty;
    let num5 = cart [itemCode].price;
   
    newCart[itemCode].dqty = cart[itemCode].dqty + num4/num3
    newCart[itemCode].price = cart[itemCode].price + num5/num3
    newCart[itemCode].qty = cart[itemCode].qty + 1


  }
  else {
    newCart[itemCode] = { qty:1 , price ,name, dqty, img, priceperkg }
}
setCart(newCart)
saveCart(newCart)
}

// CLEAR CART

const clearCart = () =>{
  setCart({})
  saveCart({})
}

// Remove from cart

const removeFromCart = (itemCode , qty ,price ,name, dqty, img , priceperkg )=>{
  let newCart = cart;
  if (itemCode in cart){
    let num1 = cart[itemCode].qty
    let num2 =  cart[itemCode].dqty
    let num6 = cart[itemCode].price
    newCart[itemCode].price = cart[itemCode].price - num6/num1
    newCart[itemCode].dqty = cart[itemCode].dqty - num2/num1
    newCart[itemCode].qty = cart[itemCode].qty - 1
  }
  if(newCart[itemCode]["qty"]<=0){
    delete newCart[itemCode]
  }
setCart(newCart)
saveCart(newCart)
}

  return  <>
  

          {key && <Navbar logout={logout} user ={user} key = {key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
           clearCart={clearCart} subTotal={subTotal} subQty = {subQty}/> }
           <Component  {...pageProps}  cart={cart} addToCart={addToCart} removeFromCart={removeFromCart}
           clearCart={clearCart} subTotal={subTotal} subQty = {subQty} />
           <Footer/>
           </>
}

export default MyApp
