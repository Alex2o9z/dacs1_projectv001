import express from "express";
import mongoose from "mongoose";
import { HealthModel } from "../models/Healths.js";
import { IngredientTypeModel } from "../models/IngredientTypes.js";
import { RegionModel } from "../models/Regions.js";
import { IngredientModel } from "../models/Ingredients.js";
import { verifyToken } from './users.js';

const router = express.Router();

// Fetch paginated ingredients for admin ingredient list page API request
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const count = await IngredientModel.countDocuments();
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;

        const ingredients = await IngredientModel.find({})
            .skip(skip)
            .limit(limit);

        res.json({
            ingredients,
            totalPages,
        });
    } catch (error) {
        res.json(error);
    }
});

// Add new ingredients API request
router.get("/create", async (req, res) => {
    try {
        const healths = await HealthModel.find({});
        const ingredientTypes = await IngredientTypeModel.find({});
        const regions = await RegionModel.find({});
        const response = {
            healths,
            ingredientTypes,
            regions,
        }
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/create", verifyToken, async (req, res) => {
    const ingredient = new IngredientModel(req.body);

    try {
        const response = await ingredient.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

export { router as ingredientRouter };


// import express from "express";
// import mongoose from "mongoose";
// import { HealthModel } from "../models/Healths.js";
// import { IngredientTypeModel } from "../models/IngredientTypes.js";
// import { RegionModel } from "../models/Regions.js";
// import { IngredientModel } from "../models/Ingredients.js";
// import { verifyToken } from './users.js';

// const router = express.Router();

// // Fetch all ingredients for admin ingredient list page API request
// router.get("/", async (req, res) => {
//     try {
//         const response = await IngredientModel.find({});
//         res.json(response);
//     } catch (error) {
//         res.json(error);
//     }
// });

// // Add new ingredients API request
// router.get("/create", async (req, res) => {
//     try {
//         const healths = await HealthModel.find({});
//         const ingredientTypes = await IngredientTypeModel.find({});
//         const regions = await RegionModel.find({});
//         const response = {
//             "healths": healths,
//             "ingredientTypes": ingredientTypes,
//             "regions": regions,
//         }
//         res.json(response);
//     } catch (error) {
//         res.json(error);
//     }
// });
// router.post("/create", verifyToken, async (req, res) => {
//     const ingredient = new IngredientModel(req.body,);

//     try {
//         const response = await ingredient.save();
//         res.json(response);
//     } catch (error) {
//         res.json(error);
//     }
// });

// // // Add RecipeID to User API request
// // router.put("/", verifyToken, async (req, res) => {
// //     try {
// //         const recipe = await RecipeModel.findById(req.body.recipeID);
// //         const user = await UserModel.findById(req.body.userID);
// //         user.savedRecipes.push(recipe);
// //         await user.save();
// //         res.json({ savedRecipes: user.savedRecipes });
// //     } catch (error) {
// //         res.json(error);
// //     }
// // });

// // //  API request
// // router.get("/savedRecipes/ids/:userID", async (req, res) => {
// //     try {
// //         const user = await UserModel.findById(req.params.userID);
// //         res.json({ savedRecipes: user?.savedRecipes });
// //     } catch (error) {
// //         res.json(error);
// //     }
// // });

// // //  API request
// // router.get("/savedRecipes/:userID", async (req, res) => {
// //     try {
// //         const user = await UserModel.findById(req.params.userID);
// //         const savedRecipes = await RecipeModel.find({
// //             _id: { $in: user.savedRecipes },
// //         });
// //         res.json({ savedRecipes });
// //     } catch (error) {
// //         res.json(error);
// //     }
// // });

// export { router as ingredientRouter };