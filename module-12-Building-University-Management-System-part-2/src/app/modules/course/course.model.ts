import { model, Schema, Types } from 'mongoose';
import {
  TCourse,
  TCourseFaculties,
  TPreRequisiteCourses,
} from './course.interface';
const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>('Course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});
export const CourseFaculty = model<TCourseFaculties>(
  'CourseFaculty',
  courseFacultySchema,
);
