import mongoose from "mongoose"

const ConversationSchema= new mongoose.Schema({
    members:{
        type:Array,
        default:[]
},
},{timestamps:true})
// we need seperate timestamps for messages to organize our messages in a order 
export default mongoose.model("conversations",ConversationSchema)