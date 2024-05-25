import mongoose from 'mongoose';

const ParentGuardianSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  firstName: {
    type: Date,
    required: true,
  },
  lastName: {
    type: Date,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female',],
  },
  parentGuardian: {
    type: ParentGuardianSchema,
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt timestamps
});

export const StudentModel = mongoose.model('student', StudentSchema);

