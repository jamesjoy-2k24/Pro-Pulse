import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userID: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Payment", paymentSchema)