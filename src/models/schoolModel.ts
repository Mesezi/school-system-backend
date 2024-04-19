import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true],
    },
    schoolName: {
        type: String,
        required: [true],
    },
    schoolShortName: {
        type: String,
        default: ''
      },
      schoolAddress: {
        type: String,
        default: ''
      },
      schoolLogo: {
        type: String,
        default: ''
      },
      schoolEmail: {
        type: String,
        default: ''
      },
      schoolColor: {
        type: String,
        default: ''
      },
      schoolGradingSystem: {
        test: {
            type: String,
            default: ''
          },
          exam: {
            type: String,
            default: ''
          },
      },
      studentPerformanceTable: {
        type: mongoose.Schema.Types.Mixed,
        default: []
      },
      schoolNotification: {
        type: mongoose.Schema.Types.Mixed,
        default: []
      },
      schoolCalendar: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
      },
      schoolTimetable: {
        type: mongoose.Schema.Types.Mixed,
        default: []
      },
      schoolExamTimetable: {
        type: mongoose.Schema.Types.Mixed,
        default: []
      },
      schoolSessionAndTerm: {
        session: {
          type: String,
          default: ''
        },
        term: {
          type: String,
          default: ''
        },
        termEndDate: {
          type: Date,
          default: ''
        }
      },
      schoolSubjects: {
        primary: [String],
        "juniorSecondary": [String],
        "seniorSecondary": [String]
      }



},  {
        timestamps: true,
    })

const SchoolModel = mongoose.model('schools', schoolSchema);

export default SchoolModel
