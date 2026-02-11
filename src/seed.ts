import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import connectDB from './config/db';

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        console.log('🧹 Clearing existing users...');
        await User.deleteMany();

        console.log('🌱 Seeding new users...');

        // Create Admin
        await User.create({
            name: 'Admin User',
            email: 'admin@school.com',
            password: 'adminpassword',
            role: 'admin'
        });

        // Create Student
        await User.create({
            name: 'John Doe',
            email: 'student@school.com',
            password: 'password123',
            department: 'Computer Science', // Optional
            role: 'student'
        });

        console.log('✅ Data Imported Successfully!');
        console.log('Login with: admin@school.com / adminpassword');
        process.exit();
    } catch (err) {
        console.error('❌ Error with data import:', err);
        process.exit(1);
    }
};

seedData();
