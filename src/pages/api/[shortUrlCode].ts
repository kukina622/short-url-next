import type { NextApiRequest, NextApiResponse } from "next";
import DbHelper from "@/helpers/dbHelper";

type ResponseData = {
  success: boolean;
  message?: string;
  originUrl?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { shortUrlCode } = req.query;

    if (Array.isArray(shortUrlCode) || !shortUrlCode) {
      res.status(404).json({ success: false, message: "invalid short code" });

      return;
    }

    const data = await DbHelper.getPrisma().url.findFirst({
      where: { shortUrlCode },
    });

    if (!data) {
      res.status(404).json({ success: false, message: "invalid short code" });

      return;
    }

    res.status(200).json({
      success: true,
      originUrl: data.originUrl,
    });

    return;
  }
  res.status(405).json({ success: false, message: "method not allowed" });
}
