const mongoose = require("mongoose");
const todosSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 255,
        },
        isCompleted: {
            type: Boolean,
            default: false,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        list: {
            type: String,
            enum: ["Work", "Personal", "Other"],
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Todos", todosSchema);
