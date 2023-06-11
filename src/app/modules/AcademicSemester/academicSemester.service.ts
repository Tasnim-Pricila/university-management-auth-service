import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

export const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};
