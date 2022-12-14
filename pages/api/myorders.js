import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req,res) =>{
const token = req.body.token  
const data = jsonwebtoken.verify(token,'jwtsecrettoken0511');
let orders = await Order.find({phone: data.phone})

  
    res.status(200).json({ orders })
  }
  export default connectDB(handler);