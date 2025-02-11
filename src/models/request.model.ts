import mongoose,{Schema} from "mongoose";

const requestSchema = new Schema({
    status:{
        type: String,
        enum: ['Pending', 'Approve',"Reject"],
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "Item"
    },
    Tprice: {
        type: Number
    }
})
const Request = mongoose.models.requests || mongoose.model("Request",requestSchema)

export default Request
