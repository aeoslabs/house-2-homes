import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@/logger";

type Error = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error>
) {
  logger.error(req.url, "/api/error endpoint hit");
  res.status(500).json({ message: "Something went wrong" });
}