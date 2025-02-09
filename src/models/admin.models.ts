import mongoose,{Schema} from 'mongoose'

const adminSchema = new Schema({
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
    requests:[{
        type: Schema.Types.ObjectId,
        ref:"Request"

    }],
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const Admin = mongoose.models.admins || mongoose.model("Admin",adminSchema)

export default Admin
