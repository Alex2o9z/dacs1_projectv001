import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema({
	name: {
        type: String,
        require: true,
    }
});

export const HealthModel = mongoose.model("healths", HealthSchema);