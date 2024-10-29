import mongoose from 'mongoose';

const sellerDetailsSchema = new mongoose.Schema({
    category: {
        type: String
    },
    business_name: {
        type: String
    },
    bus_description: {
        type: String
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    profile_img: {
        type: String,
        default: 'default.png', 
    },
    profile_description: {
        type: String,
        default: '', 
    },
    is_seller: {
        type: Boolean,
        required: true,
    },
    seller_details: sellerDetailsSchema, 
}, { timestamps: true }); 


const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
