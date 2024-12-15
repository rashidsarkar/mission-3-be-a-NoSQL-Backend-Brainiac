import mongoose from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.const';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};
const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaningData } = payload;
  const session = await mongoose.startSession();
  try {
    //setp 1  => basic course info update
    session.startTransaction();
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaningData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedBasicCourseInfo) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Course not found');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // chack if there is any pre RequisiteCourses updated
      // step 2 => update pre RequisiteCourses
      //filter out the deletd fild
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => {
          return el.course && el.isDeleted;
        })
        .map((el) => el.course);
      //filter out the updated field
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { session, new: true },
      );
      if (!deletedPreRequisiteCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'failed to updated course');
      }
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the new course field
      const newPreRequisiteCourse = preRequisiteCourses?.filter((el) => {
        return el.course && !el.isDeleted;
      });
      // console.log(newPreRequisiteCourse, 'for add');
      const newPreRequisite = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisiteCourse } },
        },
        { session, new: true },
      );
      if (!newPreRequisite) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'failed to updated course');
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'failed to updated course');
  }
};

export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDb,
};
