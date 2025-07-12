import { Schema , Document } from "mongoose";
import mongoose  from "mongoose";

export interface Report extends Document {
    location : {
        lat: number ;
        lng: number;
    } ;
    description : string;
    imageUrl? : string;
    createdAt : Date;
} 

const ReportSchema = new Schema<Report>({
    location : {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
    }, 
    description : {type : String , required: true },
    imageUrl : {type: String },
    createdAt : {type : Date  , default : Date.now }
})

export default mongoose.model<Report>('Report' , ReportSchema)