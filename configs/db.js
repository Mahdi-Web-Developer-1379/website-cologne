import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false
        } else {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("Conntect To DB Successfully :))");

        }


    } catch (err) {
        console.log("DB Connecction Error =>", err);
    }
}

export default connectToDB