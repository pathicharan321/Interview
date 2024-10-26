const mongoose = require('mongoose');
const {Schema}=mongoose;

const adminSchema = new mongoose.Schema({
 username: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 InterviewIds: [{ type: Schema.Types.ObjectId, ref: 'InterviewExperience' }]
 });

 const admin=mongoose.model('admin',adminSchema);
module.exports = admin;