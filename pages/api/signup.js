import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");

const handler = async(req,res)=>{
    if(req.method  =='POST'){
        const {name,phone} = req.body
              
    let u = new User({name, phone , password:CryptoJS.AES.encrypt(req.body.password,"secret2603960511").toString()});
    await u.save();
    
    res.json({success:"success"});

    }
    else{
        res.status(400).json({error:"This method is not allowed"})
    }

} 
export default connectDb(handler);