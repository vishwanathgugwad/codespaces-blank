import mongoose, {Schema} from "mongoose"
import mongooseAggrigatePaginate from "mongoose-paginate-v2"


const videoSchema = new Schema({
        videoFile:{
            type: String,
            required : true
        },
        thumbnail:{
            type: String,
            required : true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title:{
            type: String,
            required : String
        },
        description:{
            type: String,
            required : String
        },
        duration:{
            type: Number, 
            required : String
        },
        views:{
            type: Number,
            required : String,
            default:0
        },
        isPublished:{
            type: Boolean,
            required : String,
            default:true
        }
},{timestamps : true})

videoSchema.plugin(mongooseAggrigatePaginate)
export const Video = mongoose.model("Video",videoSchema)