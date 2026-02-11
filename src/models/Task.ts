import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

// Define the shape of the Task document
export interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    status: 'pending' | 'overdue' | 'completed';
    assignedTo: IUser['_id']; // Reference to the User model
}

// Create the Task schema
const TaskSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'overdue', 'completed'],
            default: 'pending', // Starts as pending
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Link to the student
            required: true,
        },
    },
    {
        timestamps: true, // Auto-manage createdAt/updatedAt
    }
);

// Export the Task model
export default mongoose.model<ITask>('Task', TaskSchema);
