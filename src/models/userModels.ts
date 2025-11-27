import mongoose, { model, Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        require: [true, 'Name is required'],
        minLenght: [3, 'Name must be Least 3 characters long'],
        maxLenght: [50, 'Name cannont exceet 50 characters'],
        trim: true,
    },
    email: {
        type: 'String',
        required: [true, "Email is required"],
        unique: [true, "Email is already registered"],
        lowercase: true,
        trim: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please provide a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
    },

}, { timestamps: true });

userSchema.pre("save", async function (next: any) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.verifyPassword = async function (
    candidatePassword: string,
    userPassword: string
): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const UserModel = model<IUser>('UserModel', userSchema);

export default UserModel