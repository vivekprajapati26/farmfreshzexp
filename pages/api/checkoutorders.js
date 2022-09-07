import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";

const handler = async(req,res)=>{
  
  if (req.method == 'POST'){
   
    // Check if the cart is tampered
    // let product , sumTotal=0;
    // let cart = req.body.cart;
    // for(let item in req.body.cart){
    //   console.log(item);
    //   sumTotal += cart[item].price
    //   product = await Product.findOne({slug:item})
    //   if(product.price != cart[item].price){
    //     res.status(200).json({success:false,"error":"The price of some items in your cart have changed. Please try again"})
    //     return

    //   }
    // }
    // if(sumTotal!=req.body.subTotal){
    //   res.status(200).json({success: false,"error":"The price of some items in your cart have changed. Please try again"})
    //   return
    // }
    
    
  //  Initaite an order corresponding to order id  
    let order = new Order({
     
     
      orderId:req.body.oid,
      rname:req.body.rname,
      name:req.body.rname,
      phone:req.body.phone,
      pincode:req.body.pincode,
      address:req.body.address,
      products:req.body.cart,
      amount:req.body.subTotal
      
      

    })
    await order.save()

    
    res.json({success:"success"});
    
  }
}
export default connectDb(handler);