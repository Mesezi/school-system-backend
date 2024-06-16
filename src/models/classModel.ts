import mongoose from 'mongoose';

const classMessagesSchema = new mongoose.Schema({
  id: String,
  message: String,
  sender: String,
}, {
  timestamps: true,
});

const classSchema = new mongoose.Schema({
  id: {
    type: String
  },
  userName: {
    type: String,
    required: [true, "Please add a username"],
  },
  type: {
    type: String,
    enum: ['Primary', 'Junior Secondary', 'Senior Secondary'],
    required: [true, "Please add a class type"],
  },
  level: {
    type: String,
    required: [true, "Please add a username"],
  },
  name: {
    type: String,
    required: [true, "Please add a class name"],
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
  subjects: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Please add class subjects"],
  },
  classMessages: [classMessagesSchema],
  timetable: {
    type: mongoose.Schema.Types.Mixed,
    default: () => ({ Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] })
  }
}, {
  timestamps: true,
});

export const ClassModel = mongoose.model("class", classSchema);
