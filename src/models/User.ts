import mongoose, {Document} from "mongoose";

export interface IUser extends Document {
    fullName: string;
    email: string;
    bestAlbum: string;
    age: number;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        fullName: {type: String, required: true},
        email: { type: String, required: true, unique: true },
        bestAlbum: {type: String, required: true},
        age: { type: Number, required: true},
    },
    {timestamps: true}
);

export default mongoose.model<IUser>("User", UserSchema);