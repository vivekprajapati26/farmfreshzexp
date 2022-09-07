import Order from "../../models/Order";
import connectDB from "../../middleware/mongoose";


const handler = async (req,res) =>{
    let order;
    
    order = await Order.findOne({orderId: req.body._id})
    
    res.status(200).json({order})

    res.redirect('/order?id=' + order._id,200)


}
export default connectDB(handler);