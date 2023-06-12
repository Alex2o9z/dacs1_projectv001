import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
	name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    region: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "regions"
    }],
    type: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "ingredientTypes"
    }],
    nutritionFacts: {
        calories: {
            num: {
                type: Number,
                require: true,
            },
            unit: {
                type: String,
                require: true,
            }
        },
        cholesterol: {
            num: {
                type: Number,
                require: true,
            },
            unit: {
                type: String,
                require: true,
            }
        },
        protein: {
            num: {
                type: Number,
                require: true,
            },
            unit: {
                type: String,
                require: true,
            }
        },
        caffeine: {
            num: {
                type: Number,
                require: true,
            },
            unit: {
                type: String,
                require: true,
            }
        }
    },
    goodFor: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "healths"
    }],
    notGoodFor: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "healths"
    }],
    costPerUnit: {
        cost: {
            type: Number,
            require: true,
        },
        unit: {
            type: String,
            require: true,
        },
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
});

export const IngredientModel = mongoose.model("ingredients", IngredientSchema);