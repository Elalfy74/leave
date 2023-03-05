import { createTRPCRouter } from '@/server/trpc';

import { leavesRouter } from './leaves/leaves.router';

export const appRouter = createTRPCRouter({
  leaves: leavesRouter,
});

export type AppRouter = typeof appRouter;
