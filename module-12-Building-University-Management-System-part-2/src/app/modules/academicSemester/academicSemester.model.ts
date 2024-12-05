import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
  TacademicSemesterCode,
  TacademicSemesterName,
  TMonths,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.const';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: academicSemesterName,
    required: true,
  },
  year: String,
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
