import mongoose from "mongoose";

const IngredientTypeSchema = new mongoose.Schema({
	name: {
        type: String,
        require: true,
    }
});

export const IngredientTypeModel = mongoose.model("ingredienttypes", IngredientTypeSchema);