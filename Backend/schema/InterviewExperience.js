const mongoose=require("mongoose");
const {Schema}=mongoose;

// Subdocument schema for each round
  
  // Main document schema that embeds the roundSchema
  const mainSchema = new Schema({
    name: { type: String, required: true },              // Name of the student
    company_name: { type: String, required: true},      // Name of the company
    position: { type: String, required: true },          // Role offered
    compensation: { type: Number, required: true },      // Salary package
    number_of_rounds: { type: Number, required: true },
    Technical_rounds:{type: Number, required: true },
    HR_round:{type: Number, required: true },
    Type_of_job:{type:String,required:true},
    rounds: {
      type: [String], // Array of strings
      required: true
  }                            
  });
  
  // Creating the model
  const InterviewExperience = mongoose.model("InterviewExperience", mainSchema);
  
  // Exporting the model
  module.exports = InterviewExperience;
  