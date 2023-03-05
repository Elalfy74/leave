import { Department, LeaveReason, LeaveType } from '@prisma/client';
import { z } from 'zod';

type RefineParams = {
  // override error message
  message?: string;

  // appended to error path
  path?: (string | number)[];

  // params object you can use to customize message
  // in error map
  params?: object;
};

let errorMsg: RefineParams = { message: 'Invalid input!' };

export const createLeaveSchema = z
  .object({
    employeeId: z.string().cuid(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    department: z.nativeEnum(Department),
    leaveReason: z.nativeEnum(LeaveReason),
    comments: z.string().optional(),

    leaveType: z.nativeEnum(LeaveType),

    startDate: z.date().nullable(),
    endDate: z.date().nullable(),

    selectedDay: z.date().nullable().optional(),
    startHour: z
      .date({
        invalid_type_error: 'Invalid Time',
      })
      .nullable()
      .optional(),
    endHour: z
      .date({
        invalid_type_error: 'Invalid Time',
      })
      .nullable()
      .optional(),
  })
  .refine(
    (values) => {
      if (values.leaveType === 'Hours') {
        if (!values.selectedDay) {
          errorMsg = {
            message: 'selectedDay is required',
            path: ['selectedDay'],
          };
          return false;
        }
        if (!values.startHour) {
          errorMsg = {
            message: 'startHour is required',
            path: ['startHour'],
          };
          return false;
        }
        if (!values.endHour) {
          errorMsg = {
            message: 'endHour is required',
            path: ['endHour'],
          };
          return false;
        }
        if (values.startHour > values.endHour) {
          errorMsg = {
            message: 'Start hour cannot be after the end hour',
            path: ['startHour', 'endHour'],
          };
          return false;
        }
      }
      if (values.leaveType === 'Days') {
        if (!values.startDate) {
          errorMsg = {
            message: 'startDate is required',
            path: ['startDate'],
          };
          return false;
        }
        if (!values.endDate) {
          errorMsg = {
            message: 'endDate is required',
            path: ['endDate'],
          };
          return false;
        }
        if (values.startDate > values.endDate) {
          errorMsg = {
            message: 'Start date cannot be after the end date',
            path: ['startDate', 'endDate'],
          };
          return false;
        }
      }
      return true;
    },
    () => errorMsg
  )
  .transform((values) => {
    if (values.leaveType === 'Hours') {
      values.startDate = null;
      values.endDate = null;
    } else {
      values.selectedDay = null;
      values.startHour = null;
      values.endHour = null;
    }

    return values;
  });

export type CreateLeaveSchema = z.infer<typeof createLeaveSchema>;
