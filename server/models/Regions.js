import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema({
	name: {
        type: String,
        require: true,
    }
});

export const RegionModel = mongoose.model("regions", RegionSchema);