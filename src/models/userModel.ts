import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
    id:{
        type: String
    },
    firstName: {
        type: String,
        required: [true, "Please enter first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter first name"],
    },
    accountType: {
        type: String,
        required: [true, "Please add account type"],
    },
    email: {
        type: String,
        required: [true, "Please enter email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter phone number"],
    },
    schoolId: {
        type: String,
        required: [true, "Please add school id"],
    },
    role: {
        type: String,
        required: [true, "Please add role"],
    },
},  {
        timestamps: true,
    })

export const AdminUserModel = mongoose.model('AdminUser', adminUserSchema, 'users');

