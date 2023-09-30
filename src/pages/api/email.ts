import { authsignal } from "@/lib/authsignal";
import { NextApiHandler } from "next";
import { v4 } from "uuid";

const handler: NextApiHandler = async (req, res) => {
  const { url } = await authsignal.track({
    action: "signUp",
    userId: v4(),
  });

  res.status(200).json({
    url,
  });
};

export default handler;
