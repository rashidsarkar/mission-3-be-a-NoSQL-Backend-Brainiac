import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
type TacademicSemesterNameCodeMapper = {
  [key: string]: string;
};
const createacademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    // 'Autumn' | 'Summer' | 'Fall'
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid academic semester name and code mapping');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
export const academicSemesterService = {
  createacademicSemesterIntoDB,
};
