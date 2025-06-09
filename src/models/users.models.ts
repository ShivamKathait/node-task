import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUsers, IUserDocument } from '../interfaces/users.interface';

const schema = new Schema<IUsers>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
    },
    password: {
        type: String, required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    full_name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: null },
});

// Hash password before saving
schema.pre<IUserDocument>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const UsersModel = model<IUsers>('users', schema);
export default UsersModel