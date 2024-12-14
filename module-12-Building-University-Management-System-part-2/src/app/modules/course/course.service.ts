import { QueryBuilder } from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.const';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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
  //setp 1  => basic course info update
  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemaningData,
    {
      new: true,
      runValidators: true,
    },
  );
  // chack if there is any pre RequisiteCourses updated
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // step 2 => update pre RequisiteCourses
    //filter out the deletd fild
    const deletedPreRequisites = preRequisiteCourses
      .filter((el) => {
        return el.course && el.isDeleted;
      })
      .map((el) => el.course);
    //filter out the updated fild
    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
    });
  }
  return updatedBasicCourseInfo;
};

export const courseServices = {
  createCourseIntoDb,
  getAllCourseFromDb,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDb,
};
