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
  id: {
    type: String,
    required: true,
    unique: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  lastLoggedIn: {
    type: Date,
    required: [true],
},
  classId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt timestamps
});

export const StudentModel = mongoose.model('student', StudentSchema);

