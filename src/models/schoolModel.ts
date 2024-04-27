import mongoose from "mongoose";

const schoolAnnouncementSchema = new mongoose.Schema({
  id: String,
  message: String,
  sender: String,
},{
  timestamps: true,
});


const schoolSubjectsSchema = new mongoose.Schema({
    primary: [String],
    juniorSecondary: [String],
    seniorSecondary: [String]
});

const schoolCalendarSchema = new mongoose.Schema({
  id: String,
  startDate: Date,
  endDate: Date,
  event: String,
});

const schoolSessionAndTermSchema = new mongoose.Schema({
  session: String,
  term: String,
  termEndDate: Date,
});

const schoolSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true],
    },
    schoolName: {
      type: String,
      required: [true],
    },
    schoolInformation: {
      schoolShortName: String,
      schoolAddress: String,
      schoolLogo: String,
      schoolEmail: String,
      schoolColor: String,
      schoolGradingSystem: {
        test1: Number,
        test2: Number,
        exam: Number,
      },
      studentPerformanceTable: mongoose.Schema.Types.Mixed,
    },
    schoolSessionAndTerm: schoolSessionAndTermSchema,
    schoolCalendar: [schoolCalendarSchema],
    schoolTimetables: {
      schoolTimetable: mongoose.Schema.Types.Mixed,
      schoolExamTimetable: mongoose.Schema.Types.Mixed,
    },
    schoolAnnouncements: [schoolAnnouncementSchema],
    schoolSubjects: schoolSubjectsSchema
  },
  {
    timestamps: true,
  }
);

const SchoolModel = mongoose.model("schools", schoolSchema);

export default SchoolModel;
