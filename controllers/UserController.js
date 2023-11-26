const UserModel = require('../models/User')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
cloudinary.config({ 
  cloud_name: 'dkwdscz4l', 
  api_key: '388856688969765', 
  api_secret: '7S0v5WOk8Yw-0QyIr1HjBj1Wifw',
 // secure: true
});
class UserController{
 static getalluser = async(req,res)=>{
     try{
         res.send('hello user')
     } catch(error){
       console.log(error)
     }                      
 }
 static userinsert = async (req, res) => {
  try {
    
    const file = req.files.image;
    // UPLOAD FOLDER TO IMAGE CLOUDINARY
     const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {

      folder: 'profileimageapi'
    });
    // console.log(imageUpload);

      
      const { n, e, p, cp } = req.body
      const user = await UserModel.findOne({ email: e })
      // console.log(user)
      if (user) {
          res
          .status(401)
          .json({ status: "failed", Message: "THIS EMAIL IS ALREADY EXISTS"});
      } else {
          if (n && e && p && cp) {
              if (p && cp) {
                  const hashpassword = await bcrypt.hash(p, 10)
                  const result = new UserModel({
                      name: n,
                      email: e,
                      password: hashpassword,
                      image: {
                        public_id: imageUpload.public_id,
                        url:imageUpload.secure_url
                      }

                  })
                  await result.save()
                  res
            .status(201)
            .json({ status: "success", Message: "Registraion Sucessfully"}); 
              } else {
                res
                .status(401)
                .json({ status: "failed", Message: "PASSWORD NOT MATCH"}); 
              }
          } else {
            res
            .status(401)
            .json({ status: "failed", Message: "ALL FIELD REQUIRE"}); 
          }
      }
  } catch (error) {
      console.log(error)
  }
}
}
module.exports = UserController