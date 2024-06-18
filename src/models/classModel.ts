import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for a single schemeOfWork entry
interface ISchemeOfWork {
  week: number;
  topic: string;
  description: string;
}

// Define the interface for a single subject
interface ISubject {
  title: string;
  description: string;
  schemeOfWork: ISchemeOfWork[];
  id: string;
}

interface ITimetableEntry {
  startTime: string;
  endTime: string;
  subject: string;
}

// Define the interface for the class document
interface IClass extends Document {
  id: string;
  userName: string;
  type: 'Primary' | 'Junior Secondary' | 'Senior Secondary';
  level: string;
  name: string;
  teacherInformation: {
    firstName: string;
    lastName: string;
    imageUrl: string;
    phoneNumber: string;
    email: string;
    gender: string;
  };
  accountType: string;
  password?: string;
  schoolId: string;
  subjects: ISubject[];
  classMessages: {
    id: string;
    message: string;
    sender: string;
  }[];
  timetable: {
    Monday: ITimetableEntry[];
    Tuesday: ITimetableEntry[];
    Wednesday: ITimetableEntry[];
    Thursday: ITimetableEntry[];
    Friday: ITimetableEntry[];
  };
}

// Define the Mongoose schema for a single schemeOfWork entry
const SchemeOfWorkSchema: Schema = new Schema({
  week: { type: Number, required: true },
  topic: { type: String, default: '' },
  description: { type: String, default: '' },
}, {_id:false});

// Define the Mongoose schema for a single subject
const SubjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  id: { type: String, required: true },
  schemeOfWork: {
    type: [SchemeOfWorkSchema],
    default: [],
  },
});

const TimetableEntrySchema: Schema = new Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  subject: { type: String, required: true },
});

// Define the Mongoose schema for class messages
const ClassMessagesSchema: Schema = new Schema({
  id: String,
  message: String,
  sender: String,
}, {
  timestamps: true,
});

// Define the Mongoose schema for the class document
const ClassSchema: Schema = new Schema({
  id: { type: String },
  userName: { type: String, required: [true, "Please add a username"] },
  type: {
    type: String,
    enum: ['Primary', 'Junior Secondary', 'Senior Secondary'],
    required: [true, "Please add a class type"],
  },
  level: { type: String, required: [true, "Please add a level"] },
  name: { type: String, required: [true, "Please add a class name"] },
  teacherInformation: {
    firstName: String,
    lastName: String,
    imageUrl: String,
    phoneNumber: String,
    email: String,
    gender: String,
  },
  accountType: { type: String, required: [true, "Please add account type"] },
  password: { type: String },
  schoolId: { type: String, required: [true, "Please add school id"] },
  subjects: {
    type: [SubjectSchema],
  },
  classMessages: [ClassMessagesSchema],
  timetable: {
    Monday: { type: [TimetableEntrySchema], default: [] },
    Tuesday: { type: [TimetableEntrySchema], default: [] },
    Wednesday: { type: [TimetableEntrySchema], default: [] },
    Thursday: { type: [TimetableEntrySchema], default: [] },
    Friday: { type: [TimetableEntrySchema], default: [] },
  }
}, {
  timestamps: true,
});

export const ClassModel: Model<IClass> = mongoose.model<IClass>("class", ClassSchema);
