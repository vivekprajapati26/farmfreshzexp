import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
import cryptoJs from "crypto-js"

const handler = async (req, res) => {

    if (req.method == 'POST') {

        let token = req.body.token

        let user = jsonwebtoken.verify(token, 'jwtsecrettoken0511')

        let dbuser = await User.findOne({phone: user.phone})

        const bytes = cryptoJs.AES.decrypt(dbuser.password, "secret2603960511");
        let decryptedPass = bytes.toString(cryptoJs.enc.Utf8);

        if(decryptedPass == req.body.password && req.body.npassword == req.body.cpassword){


        let dbuseru = await User.findOneAndUpdate({ phone: dbuser.phone }, { password: cryptoJs.AES.encrypt(req.body.cpassword, 'secret2603960511').toString() })
        res.status(200).json({ success: true })
        return 
     }
     res.status(200).json({ success: false })


    } else {

        res.status(400).json({ error: "error" })
    }


}
export default connectDB(handler);
