const mongoose = require('mongoose');
import { Schema ,model, models} from 'mongoose';

const orderSchema = new Schema({
 
  orderId:{type:String,required:true},
  rname:{type:String,required:true},
  name:{type:String,required:true}, 
  phone:{ type:String, required:true},
  pincode:{ type:Number, required:true},
  address: {type:String, required:true},
  products:{type:Object, required:true},
  amount: { type:Number,required:true},

  } , {timestamps:true} );



export default mongoose.models.Order || mongoose.model('Order',orderSchema);


