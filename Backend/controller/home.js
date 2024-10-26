const  InterviewExperiences= require('../schema/InterviewExperience.js');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const  saltRounds=10;
const Users = require('../schema/user');


module.exports.getHome=async(req, res)=>{
    try{
        const companyarray= await InterviewExperiences.distinct('company_name') ;
       res.status(200).json(companyarray);
    }
    catch(err){
        res.status(400).send({message:"Internal server Error"});
    }
}




module.exports.postSignUp = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await Users.findOne({ username });
        if (user) {
            return res.status(405).json({ message: 'Username is already taken. Please choose another one.' });
        }
        // Hash the password using await for a promise-based approach
        const hash = await bcrypt.hash(password, saltRounds);
       // Create the new user
        await Users.create({
            username: username,
            password: hash
        });
        return res.status(200).json({ message: 'Username is Successfully created.'});
    } catch (err) {
        res.status(500).json({message: 'Internal Server Error.'});
    }
};

module.exports.postLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Username doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Username or Password is wrong" });
        }
        const userPayload = { username };
        const token = jwt.sign(userPayload, process.env.jwtsecret, { expiresIn: '24h' });
        res.cookie('usertoken', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',  
           sameSite: 'Strict'
        });        
        return res.status(200).json({
            token,
            username
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getCompanyName=async(req,res,next)=>{
    const {CompanyName}=req.params;
    try {
        const companies = await InterviewExperiences.find({company_name:CompanyName });
        res.json(companies);
      }catch(error){
        return null;
      }
}

module.exports.getCompanybyjob=async(req,res)=>{
    
    const{CompanyName,Typeofjob}=req.params;
    try {
        const companies =  await InterviewExperiences.find({ 
            company_name: CompanyName, 
            Type_of_job:Typeofjob
        });
        return  res.status(200).json(companies);
      }catch(error){
        return res.status(500).json({message:"Internal server Error"});
      }
}
