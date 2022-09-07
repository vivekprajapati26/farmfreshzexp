const mongoose = require('mongoose');
import { Schema ,model, models} from 'mongoose';

const productSchema = new mongoose.Schema({
  title:{ type:String , required : true},
  slug:{ type:String , unique:true ,required : true},
  desc:{ type:String },
  img:{ type:String , required: true},
  category:{ type:String , required:true},
  price:{type:Number, required:true},
  dqty:{type:Number, required :true},
  priceperkg:{type:Number, required :true},

  
} , {timestamps:true} );
 

export default models.Product || model('Product',productSchema)

