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
    userType: {
        type: String,
        required: [true, "Please add user type"],
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
},  {
        timestamps: true,
    })

export const AdminUserModel = mongoose.model('AdminUser', adminUserSchema, 'users');

