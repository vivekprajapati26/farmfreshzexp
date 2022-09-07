import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req,res)=>{
    
    if(req.method == 'POST'){

        let token = req.body.token

        let user = jsonwebtoken.verify(token,'jwtsecrettoken0511')
        

         let dbuser = await User.findOneAndUpdate({phone: user.phone}, {address:req.body.address , pincode:req.body.pincode, rname:req.body.rname ,  name:req.body.name })

         
         const {name ,  address, pincode , rname , phone} = dbuser
        
        res.status(200).json({success: true})

    }else{

        res.status(400).json({error:"error"})
    }


}
export default connectDB(handler);
