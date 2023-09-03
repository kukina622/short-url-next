import type { NextApiRequest, NextApiResponse } from "next";
import { generateRandomString, isValidUrl } from "@/utils";
import DbHelper from "@/helpers/dbHelper";

type ResponseData = {
  success: boolean;
  message?: string;
  data?: {
    shortUrl: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { url } = req.body;

    if (!isValidUrl(url)) {
      res.status(400).json({ success: false, message: "invalid url" });

      return;
    }

    let shortUrlCode: string;

    let count = 0;

    do {
      shortUrlCode = generateRandomString(6);
      // eslint-disable-next-line no-await-in-loop
      count = await DbHelper.getPrisma().url.count({
        where: { shortUrlCode },
      });
    } while (count > 0);

    await DbHelper.getPrisma().url.create({
      data: { originUrl: url, shortUrlCode },
    });
    res.status(200).json({
      success: true,
      data: { shortUrl: `${process.env.HOST_URL}/${shortUrlCode}` },
    });

    return;
  }
  res.status(405).json({ success: false, message: "method not allowed" });
}
