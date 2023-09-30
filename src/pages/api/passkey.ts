import { authsignal } from "@/lib/authsignal";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { token } = await authsignal.track({
    action: "passkey",
    userId: "",
  });

  res.status(200).json({
    token,
  });
};

export default handler;
