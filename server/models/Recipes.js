import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
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
        ref: "recipetypes"
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
    steps: [{ 
        step: {
            type: String,
            require: true,
        },
        timing: {
            type: Number,
            require: true,
        },
    }],
    prepare: { 
        type: String,
        require: true,
    },
    ingredients: [{ 
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ingredients",
        },
        quantity: {
            type: Number,
            require: true,
        }
    }],
    timing: {
        type: Number,
        require: true,
    },
    budgetPerUnit: {
        budget: {
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

export const RecipeModel = mongoose.model("recipes", RecipeSchema);