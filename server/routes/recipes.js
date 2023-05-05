import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// Fetch all recipe for home page API request
router.get("/", async (req, res) => {
    try {
        const respone = await RecipeModel.find({});
        res.json(respone);
    } catch (error) {
        res.json(error);
    }
});

// Add new Recipe API request
router.post("/create", async (req, res) => {
    const recipe = new RecipeModel(req.body,);

    try {
        const respone = await recipe.save();
        res.json(respone);
    } catch (error) {
        res.json(error);
    }
});

// Add RecipeID to User API request
router.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

//  API request
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

//  API request
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (error) {
        res.json(error);
    }
});

export { router as recipeRouter };