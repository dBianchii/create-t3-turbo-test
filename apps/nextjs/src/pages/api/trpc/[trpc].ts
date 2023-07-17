import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter, createTRPCContext } from "@kdx/api";

// export API handler
// export default createNextApiHandler({
//   router: appRouter,
//   createContext: createTRPCContext,
// });

// If you need to enable cors, you can do so like this:
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors

  res.setHeader("Access-Control-Allow-Credentials", "*");
  //res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );
  if (req.method === "OPTIONS") {
    return res.status(200).json({
      body: "OK",
    });
  }
  // Let the tRPC handler do its magic
  const handler = createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  });

  return handler(req, res);
};

export default handler;
