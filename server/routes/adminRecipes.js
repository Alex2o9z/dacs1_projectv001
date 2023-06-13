import express from "express";
import { HealthModel } from "../models/Healths.js";
import { RegionModel } from "../models/Regions.js";
import { RecipeTypeModel } from "../models/RecipeTypes.js";
import { IngredientModel } from "../models/Ingredients.js";
import { verifyToken } from './users.js';
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

// Fetch all ingredients for admin ingredient list page API request
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

// Add new ingredients API request
router.get("/create", async (req, res) => {
    try {
        const healths = await HealthModel.find({});
        const recipeTypes = await RecipeTypeModel.find({});
        const ingredients = await IngredientModel.find({});
        const regions = await RegionModel.find({});
        const response = {
            "healths": healths,
            "recipeTypes": recipeTypes,
            "ingredients": ingredients,
            "regions": regions,
        }
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});
router.post("/create", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body,);

    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

export { router as adminRecipeRouter };