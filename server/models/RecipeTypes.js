import mongoose from "mongoose";

const RecipeTypeSchema = new mongoose.Schema({
	name: {
        type: String,
        require: true,
    }
});

export const RecipeTypeModel = mongoose.model("recipetypes", RecipeTypeSchema);