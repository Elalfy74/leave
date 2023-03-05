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
    (val) => {
      if (val.leaveType === 'Hours') {
        if (!val.selectedDay) {
          errorMsg = {
            message: 'selectedDay is required',
            path: ['selectedDay'],
          };
          return false;
        }
        if (!val.startHour) {
          errorMsg = {
            message: 'startHour is required',
            path: ['startHour'],
          };
          return false;
        }
        if (!val.endHour) {
          errorMsg = {
            message: 'endHour is required',
            path: ['endHour'],
          };
          return false;
        }
        if (val.startHour! > val.endHour!) {
          errorMsg = {
            message: 'Start hour cannot be after the end hour',
            path: ['startHour', 'endHour'],
          };
          return false;
        }

        return !val.startDate || !val.endDate;
      }
      if (val.leaveType === 'Days') {
        if (!val.startDate) {
          errorMsg = {
            message: 'startDate is required',
            path: ['startDate'],
          };
          return false;
        }
        if (!val.endDate) {
          errorMsg = {
            message: 'endDate is required',
            path: ['endDate'],
          };
          return false;
        }
        if (val.startDate! > val.endDate!) {
          errorMsg = {
            message: 'Start date cannot be after the end date',
            path: ['startDate', 'endDate'],
          };
          return false;
        }

        return !val.selectedDay || !val.startHour || !val.endHour;
      }
      return true;
    },
    () => errorMsg
  );

export type CreateLeaveSchema = z.infer<typeof createLeaveSchema>;
