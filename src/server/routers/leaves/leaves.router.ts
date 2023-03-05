import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/trpc';

import * as leavesService from './leaves.service';
import { createLeaveSchema } from './schema';

export const leavesRouter = createTRPCRouter({
  create: publicProcedure
    .input(createLeaveSchema)
    .mutation(({ input }) => leavesService.create(input)),

  // findOne: publicProcedure.input().query(() => 'FindOne'),

  findAll: publicProcedure.query(() => 'FindAll'),
});
