const mongoose = require('mongoose');
import { Schema ,model, models} from 'mongoose';

const ForgotSchema = new mongoose.Schema({
  userid:{ type: String, required:true},

  phone:{ type: String, required:true, unique:true},

  token:{ type: String, required:true},

  
} , {timestamps: true}

);


export default models.Forgot || model('Forgot',ForgotSchema)
 