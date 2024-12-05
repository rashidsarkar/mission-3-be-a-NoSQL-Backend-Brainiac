import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
  TacademicSemesterCode,
  TacademicSemesterName,
  TMonths,
} from './academicSemester.interface';
const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const academicSemesterName: TacademicSemesterName[] = [
  'Autumn',
  'Fall',
  'Summer',
];
const academicSemesterCode: TacademicSemesterCode[] = ['01', '02', '03'];
const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: academicSemesterName,
  year: Date,
  code: {
    type: String,
    enum: academicSemesterCode,
    required: true,
  },
  startMonth: {
    type: String,
    enum: months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: months,
    required: true,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
