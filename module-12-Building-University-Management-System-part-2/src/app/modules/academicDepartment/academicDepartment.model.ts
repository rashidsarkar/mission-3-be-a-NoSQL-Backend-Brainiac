import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  { timestamps: true },
);
academicDepartmentSchema.pre('save', async function (next) {
  const isDepertmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepertmentExist) {
    throw new Error('Department already exist');
  }
  next();
});
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepertmentExist = await AcademicDepartment.findOne(query);
  if (!isDepertmentExist) {
    throw new Error('Department not found');
  }
  next();
});
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
