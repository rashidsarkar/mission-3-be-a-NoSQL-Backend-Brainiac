import {
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
export { months, academicSemesterCode, academicSemesterName };
