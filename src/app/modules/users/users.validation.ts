import { z } from 'zod';
import { bloodGroup, gender } from '../Student/student.constants';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      email: z.string().email().optional(),

      contactNo: z.string().optional(),

      emergencyContactNo: z.string().optional(),

      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),

      presentAddress: z.string().optional(),

      permanentAddress: z.string().optional(),

      academicSemester: z.string().optional(),

      academicDepartment: z.string().optional(),

      academicFaculty: z.string().optional(),

      guardian: z
        .object({
          fatherName: z.string().optional(),
          fatherOccupation: z.string().optional(),
          fatherContactNo: z.string().optional(),
          motherName: z.string().optional(),
          motherOccupation: z.string().optional(),
          motherContactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),

      localGuardian: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          contactNo: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),

      profileImage: z.string().optional(),
    }),
  }),
});

export default createUserZodSchema;
