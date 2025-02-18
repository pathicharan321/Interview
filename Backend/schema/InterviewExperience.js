const mongoose=require("mongoose");
const {Schema}=mongoose;


  
  
  const mainSchema = new Schema({
    name: { type: String, required: true },              
    company_name: { type: String, required: true},     
    position: { type: String, required: true },      
    compensation: { type: String, required: true },      
    number_of_rounds: { type: Number, required: true },
    Technical_rounds:{type: Number, required: true },
    HR_round:{type: Number, required: true },
    Type_of_job:{type:String,required:true},
    rounds: {
      type: [String], // Array of strings
      required: true
  }                            
  });
  
  const InterviewExperience = mongoose.model("InterviewExperience", mainSchema);

  module.exports = InterviewExperience;
  
