//@ts-ignore
const mongoose = require('mongoose');
//@ts-ignore
const connectToMongoose = async () => {
    const uri : any = process.env.MONGODB_URI;
    try{
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');
    }catch(error){
    console.error('===MongoDB connection error:===', error);
    process.exit(1);
    }
}

module.exports = connectToMongoose