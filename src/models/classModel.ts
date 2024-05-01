import mongoose from 'mongoose';

const classMessagesSchema = new mongoose.Schema({
    id: String,
    message: String,
    sender: String,
  },{
    timestamps: true,
  });

const classSchema = new mongoose.Schema({
    id:{
        type: String
    },
    userName: {
        type: String,
        required: [true, "Please add a username"],
    },
    teacherInformation: {
        firstName: String,
        lastName: String,
        imageUrl: String,
        phoneNumber: String,
        email: String,
        gender: String
      },
    accountType: {
        type: String,
        required: [true, "Please add account type"],
    },
    password: {
        type: String,
    },
    schoolId: {
        type: String,
        required: [true, "Please add school id"],
    },
    subjects: [String],
    classMessages: [classMessagesSchema]
},  {
        timestamps: true,
    })
   
   
export const SchoolModel = mongoose.model("class", classSchema);

