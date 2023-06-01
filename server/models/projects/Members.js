import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
	name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId, ref: "members"
    }],
    meals: [{
        type: mongoose.Schema.Types.ObjectId, ref: "meals"
    }],
});

export const ProjectModel = mongoose.model("projects", ProjectSchema);