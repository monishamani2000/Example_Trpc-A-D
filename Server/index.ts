// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
// import { db } from "./db";
import { publicProcedure, router } from "./trpc";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

 
export const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await prisma.userexample.findMany();
      return users;
    }),
  userById: publicProcedure
    .input(z.number())
    .query(async (opts) => {
      const { input } = opts;
      const user = await prisma.userexample.findUnique({
        where:{
            id:input
        }
      });
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async (opts) => {
      const {  name, email} = opts.input;
      const user = await prisma.userexample.create({data:{name,email}});
      return user;
    }),
});
 
export type AppRouter = typeof appRouter;


//  
// const server = createHTTPServer({
//   router: appRouter,
// });
//  
// server.listen(3000);           Entry file for Standalone method but i used express
