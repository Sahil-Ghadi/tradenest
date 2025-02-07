import mongoose,{Schema} from "mongoose";

const itemSchema = new Schema({
    itemName: {
        type: String,
        reqired: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
})
   const Item = mongoose.models.items || mongoose.model("Item",itemSchema)
 
const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }
})

 const Category = mongoose.models.categories || mongoose.model("Category", categorySchema)

export default {Item,Category}