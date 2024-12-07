import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const upDateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  upDateAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDB,
};
