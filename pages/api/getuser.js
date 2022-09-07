import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req,res)=>{
    
    if(req.method == 'POST'){

        let token = req.body.token

        let user = jsonwebtoken.verify(token,'jwtsecrettoken0511')
        

         let dbuser = await User.findOne({phone: user.phone})

         
         const {name , address, pincode , rname, phone} = dbuser
        
        res.status(200).json({name,  address, pincode , rname, phone})

    }else{

        res.status(400).json({error:"error"})
    }


}
export default connectDB(handler);
