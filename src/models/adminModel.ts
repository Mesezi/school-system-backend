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
        required: [true, "Please enter last name"],
    },
    sex:{
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    namePrefix:{
        type: String,
        required: true,
        enum: ['Mr', 'Ms', 'Mrs', 'Dr', 'Prof'],
    },
    accountType: {
        type: String,
        required: [true],
    },
    username: {
        type: String,
        required: [true, "Please enter email address"],
    },
    lastLoggedIn: {
        type: Date,
        required: [true],
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

export const AdminModel = mongoose.model('Admin', adminUserSchema);

