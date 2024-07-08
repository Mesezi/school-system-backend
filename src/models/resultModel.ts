import mongoose, { Schema, Document } from 'mongoose';

interface Result {
  test1: number;
  exam: number;
  test2: number;
  subject: string;
}

interface Term {
  class: string;
  school: string;
  schoolId: string;
  comments: string;
  info: string;
  verified: boolean;
  results: Result[];

}

interface Session {
  terms: Map<string, Term>
}

interface IResult extends Document {
  id: string;
  session: Map<string, Session>;
}

const resultSchema: Schema = new Schema({
  id: { type: String, required: true },
  session: {
    type: Map,
    of: new Schema({
      verified: Boolean,
      terms: {
        type: Map,
        of: new Schema({
            comments: [
                {
                    type: String,
                    comment: String
                }
            ],
              info: {
                type: [Schema.Types.Mixed],  // Array of any type
              }, 
              class: String,
              school: String,
              schoolId: String,
              verified: Boolean,
          results: [{
            test1: Number,
            exam: Number,
            test2: Number,
            subject: String
          }]
        }, { _id: false, __v: false })
      }
    }, { _id: false, __v: false })
    
  }
});

export const ResultModel = mongoose.model<IResult>('Result', resultSchema);

const resultData = {
    id: '',
    session: {
      ['2023-2024']:{
        class: 'JSS1',
        school: '',
        verified: true,
        terms: {
          ['1st']:{
            comments: '',
            info: '',
            results: [
            {
            test1: 20,
            exam: 20,
            test2: 50,
            subject: 'English'
            },
            
            {
            test1: 12,
            exam: 13,
            test2: 46,
            subject: 'Maths'
            }
            ]
            }
        }
        }
    }
  
    }
