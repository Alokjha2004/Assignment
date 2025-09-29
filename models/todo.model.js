import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String 
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
        },
        dueDate: { type: Date },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }, 
    { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;