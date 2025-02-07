import mongoose,{Schema} from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        reqired: [true, "username is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        reqired: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['Customer', 'Seller'],
        reqired: [true, "this field is required"],
    },
    password:{
        type: String,
        required: [true, "Please enter password"],
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("User",userSchema)

export default User
