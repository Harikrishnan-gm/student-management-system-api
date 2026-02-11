import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the shape of the User document
export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    department?: string;
    role: 'admin' | 'student';
    comparePassword(password: string): Promise<boolean>;
}

// Create the User schema
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        department: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ['admin', 'student'],
            default: 'student',
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Pre-save middleware to automatically hash the password before saving to DB
UserSchema.pre('save', async function () {
    const user = this as unknown as IUser;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return;
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password!, salt);
});

// Instance method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password!);
};

// Export the User model
export default mongoose.model<IUser>('User', UserSchema);
