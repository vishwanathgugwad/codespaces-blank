import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        index:true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    fullname:{
        type: String,
        required: true,
        trim: true
    },
    avatar:{
        type: String,
        required: true
    },
    watchHistory : [
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    refreshToken: String
},{timestamps: true})

//excrypts the password before saving
userSchema.pre("save" , async function(next){
        if(this.isModified("password")){
            this.password = bcrypt.hash(this.password,10)
            next()
        }
})
//this helps in checking if the password same as encrypted password
userSchema.methods.isPasswordCorrect = async (password) =>{
    return await bcrypt.compare(password,this.password)
}

//generating acessToken 
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id:this._id,
        email: this.email,
        username: this.username,
        fullname:this.fullname},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
//generating refreshToken 
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id:this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPTRY
        }
    )
}
export const User = mongoose.model("User", userSchema)