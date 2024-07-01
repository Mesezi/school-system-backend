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
    subscriptionEndDate: {
      type: Date,
      required: [true],
    },
    schoolInformation: {
      schoolShortName: String,
      schoolAddress: String,
      schoolLogo: String,
      schoolEmail: String,
      schoolColor: String,
    },
    schoolSessionAndTerm: schoolSessionAndTermSchema,
    schoolCalendar: [schoolCalendarSchema],
    schoolExamTimetable: mongoose.Schema.Types.Mixed,
    schoolAnnouncements: [schoolAnnouncementSchema],
    schoolSubjects: schoolSubjectsSchema,
    schoolResultDetails: {
      grade: {
        A: { min: Number, max: Number },
        B: { min: Number, max: Number },
        C: { min: Number, max: Number },
        D: { min: Number, max: Number },
        E: { min: Number, max: Number },
        F: { min: Number, max: Number },
      },
      scores: {
        test1: Number,
        test2: Number,
        exam: Number
      },
      performance: {
        affectiveSkills: [String],
        psychomotorSkills: [String]
      }
    }
  },
  {
    timestamps: true,
  }
);

const SchoolModel = mongoose.model("schools", schoolSchema);

export default SchoolModel;
