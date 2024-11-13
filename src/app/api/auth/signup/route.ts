import { validateEmail } from '@/helper/validateEmail';
import { validatePassword } from '@/helper/validatePassword';
import { User } from '@/models/user';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/config/connectDB';


export async function POST(request: Request) {
    await connectDB(); // Ensure DB connection before proceeding

    try {
        const body = await request.json();
        const { email, password } = body;

        if (!validateEmail(email) || !validatePassword(password)) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 });
        }

        const hash = await bcrypt.hash(password, 8);
        const newUser = new User({
            email,
            password: hash,
        });

        await newUser.save();
        return new Response(JSON.stringify({ message: 'User created successfully', userId: newUser._id }), { status: 201 });

    } catch (error: any) {
        console.error('Failed to create a new user:', error.message);
        return new Response(JSON.stringify({ error: 'Unable to create user', details: error.message }), { status: 500 });
    }
};