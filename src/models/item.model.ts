import mongoose,{Schema} from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        reqired: true,
    },
    price: {
        type: Number,
        required: true,
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    imageUrl: {
        type: String,
        reqired: true,
    }
})
   const Item = mongoose.models.items || mongoose.model("Item",itemSchema)

export default Item