const  InterviewExperience= require('../schema/InterviewExperience');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const  saltRounds=10;
const Admin = require('../schema/admin');

module.exports.postSignUp = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let adminuser = await Admin.findOne({ username });
        if (adminuser) {
            return res.status(400).json({message:"Username Already exist."});
        }
        const hash = await bcrypt.hash(password, saltRounds);
        await Admin.create({
            username: username,
            password: hash
        });
    } catch (err) {
        res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports.postLogin=async(req,res,next)=>{
    const{ username,password}=req.body;
    try {
        const adminuser = await Admin.findOne({ username: username });
        if (!adminuser) {
           return  res.status(400).json({message:"UserName doesn't Exist"});
        }
        await bcrypt.compare(password, adminuser.password, function (err, result) {
            if (!result) return  res.staus(400).json({message:"Username or Pasword is Wrong"});
            let userpayload={
                adminusername:username,
                adminid:adminuser._id
            }
            const token=jwt.sign(userpayload,process.env.jwtsecret, { expiresIn: '24h' });
            res.cookie("admintoken", token,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === 'production',  
               sameSite: 'Strict'
             });
            const data={
                "adminusername":adminuser.username
            }
           return res.status(200).json(data);
        });
    } catch (err) {
       return res.status(500).json({message:"Internal Server Error"});
    }
}


module.exports.postSubmitform=async(req,res,next)=>{
    const{name,company_name,position,compensation,number_of_rounds,rounds,hrround,technicalround,Type_of_job}=req.body;
    const adminid=req.id;
    try{
       let experience=await InterviewExperience.create({
        name:name,
        company_name:company_name ,     
        position:position,          
        compensation:compensation,      
        number_of_rounds:number_of_rounds,
        Technical_rounds:technicalround,
        HR_round:hrround,
        rounds:rounds,
        Type_of_job:Type_of_job
       });
       
       const companyId=experience._id;
       
       try {
        const result = await Admin.updateOne(
          { _id: adminid },
          { $addToSet: { InterviewIds:companyId}}
        );
        return res.status(200).json({message:"Successfully uploaded the Experience"})
        } catch (err) {
        return res.status(500).json({message:"Internal Server Error"});
        }
    }
    catch(err){
        res.status(500).send('Internal Server Error');
    }
}

module.exports.getpreviousUpload=async(req,res)=>{
    try{
     let Adminidid=req.id;
     let experience = await Admin.findById(Adminidid);
     if(experience){
        let roundsArray = experience.InterviewIds;
        let interviewExperiences = await InterviewExperience.find({
            _id: { $in: roundsArray }
          });
          // Send the fetched data to the frontend
         return  res.status(200).json(interviewExperiences );
     }
     else{
       return  res.status(404).json({message:"Some error occurred: Admin not found"});
     }
    }
    catch(err){
       return  res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports.getUpdate=async(req,res)=>{
   const {id}=req.params;
   try{
   const expereince=await InterviewExperience.find({_id:id});
      return res.status(200).json(expereince);
   }
   catch(err){
      return res.status(400).json({message:"Internal Server Error"});
   }

}

module.exports.putUpdate=async(req,res,next)=>{
    try{ 
     let id=req.params.id;
     const{name,company_name,position,compensation,number_of_rounds,technicalround,hrround,rounds,Type_of_job}=req.body;
     const updatedExperience = await InterviewExperience.findByIdAndUpdate(
        id, 
        { 
          $set: {
          name:name,
         company_name:company_name ,     
         position:position,          
         compensation:compensation,      
         number_of_rounds:number_of_rounds,
         Technical_rounds:technicalround,
          HR_round:hrround,
          Type_of_job:Type_of_job,
          rounds:rounds     
          }
        },
        { new:true}
      );
      return res.status(200).json({message:"Updated successfullt"});
    }
    catch(err){
        res.status(404).json({message:"Interview Experience not Found"});
    } 
}



