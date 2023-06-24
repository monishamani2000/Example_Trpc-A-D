import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../Server';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});


async function userexample(){
    const userList =await trpc.userCreate.mutate({name:"Pravi", email:"pravi@gmail.com"})
    console.log(userList);

    const userById = await trpc.userById.query(1)
    console.log(userById);
}
userexample()