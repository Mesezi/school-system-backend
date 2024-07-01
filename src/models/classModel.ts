import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for a single schemeOfWork entry
interface ISchemeOfWork {
  week: number;
  topic: string;
  description: string;
}

// Define the interface for a single subject
interface ISubject {
  name: string;
  subjectDescription: string;
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
  type: 'primary' | 'junior-secondary' | 'senior-secondary';
  level: number;
  name: string;
  teacherInformation: {
    firstName: string;
    lastName: string;
    imageUrl: string;
    phoneNumber: string;
    email: string;
    gender: string;
  };
  lastLoggedIn: Date,
  schoolSessionAndTerm:{
    session: string,
    term: string,
    termEndDate: Date,
  },
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

const schoolSessionAndTermSchema = new Schema({
  session: String,
  term: String,
  termEndDate: Date,
});

// Define the Mongoose schema for a single schemeOfWork entry
const SchemeOfWorkSchema: Schema = new Schema({
  week: { type: Number, required: true },
  topic: { type: String, default: '' },
  description: { type: String, default: '' },
}, {_id:false});

// Define the Mongoose schema for a single subject
const SubjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  subjectDescription: { type: String, default: '' },
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
    enum: ['primary', 'junior-secondary', 'senior-secondary'],
    required: [true, "Please add a class type"],
  },
  level: { type: Number, required: [true, "Class level missing"] },
  name: { type: String, required: [true, "Please add a class name"] },
  schoolSessionAndTerm: schoolSessionAndTermSchema,
  teacherInformation: {
    firstName: String,
    lastName: String,
    imageUrl: String,
    phoneNumber: String,
    email: String,
    gender: String,
  },
  lastLoggedIn: {
    type: Date,
    required: [true],
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
