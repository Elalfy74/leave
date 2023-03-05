import { prisma } from '@/server/db';

import { type CreateLeaveSchema } from './schema';

export function create(createLeaveSchema: CreateLeaveSchema) {
  return prisma.leaveApplication.create({
    data: createLeaveSchema,
  });
}

export function findAll() {}

export function findOne() {}

export function update() {}

export function remove() {}
