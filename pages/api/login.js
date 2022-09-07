import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == 'POST') {

        let user = await User.findOne({ "phone": req.body.phone })

        const bytes = CryptoJS.AES.decrypt(user.password, "secret2603960511");

       let  decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

        if (user) {

            if (req.body.phone == user.phone && req.body.password ==  decryptedPass) {

               var token = jwt.sign({  phone:user.phone, name:user.name }, 'jwtsecrettoken0511',{expiresIn:"5d"});

                res.status(200).json({success:true,token , phone: user.phone});
            }
            else{
            res.json({ success:false, error:"Incorrect user or password" });
            }
        }
        else{
            res.json({ success: false, error :"No user found " });
        }


    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}
export default connectDb(handler);