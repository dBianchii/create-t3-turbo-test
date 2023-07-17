import { type NextApiRequest, type NextApiResponse } from "next";
import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter, createTRPCContext } from "@kdx/api";

const enabledOrigins = ["https://client-nextjs-one.vercel.app"];
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors for production apps, all kodix.vercel.app apps and localhost
  if (req.headers.origin) {
    if (
      enabledOrigins.includes(req.headers.origin) ||
      req.headers.origin.includes("kodix.vercel.app") ||
      req.headers.origin.includes("localhost")
    )
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  // Let the tRPC handler do its magic
  return createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;
