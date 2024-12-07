import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createacademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid academic semester name and code mapping');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllacademicSemesterFromDB = async () => {
  const reulst = await AcademicSemester.find();
  return reulst;
};
const getSingleAcademicSemesterFromDB = async (id) => {
  const result = await AcademicSemester.findById(id);

  return result;
};
const updateSingleAcademicSemesterFromDB = async (
  id,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(4040, 'Invalid academic semester name and code mapping');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const academicSemesterService = {
  createacademicSemesterIntoDB,
  getAllacademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
