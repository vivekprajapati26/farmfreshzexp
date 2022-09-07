const mongoose = require('mongoose');
import { Schema ,model, models} from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{ type: String, required:true},

  phone:{ type: String, required:true, unique:true},

  password:{ type: String, required:true},

  address:{ type: String, default: ''},

  

  rname:{ type:String , default: ''},

 
  
  
} , {timestamps: true}

);


export default models.User || model('User',userSchema)
