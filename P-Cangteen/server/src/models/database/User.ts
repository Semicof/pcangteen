import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
        },
        avatar: {
            type: String,
            default: 'https://kenh14cdn.com/thumb_w/600/203336854389633024/2023/1/20/photo1674222518916-1674222519298329666697.jpg'
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }

    }, {
    timestamps: true
}
)
const UserModel = model('Users', UserSchema)

export default UserModel
