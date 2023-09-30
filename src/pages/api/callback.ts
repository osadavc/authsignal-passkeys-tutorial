import { serialize } from "cookie";
import jwtDecode from "jwt-decode";
import { NextApiHandler } from "next";
import { authsignal } from "../../lib/authsignal";

const handler: NextApiHandler = async (req, res) => {
  const token = req.query.token as string;

  const decodedToken = jwtDecode<any>(token);

  const { state } = await authsignal.validateChallenge({ token });

  if (state === "CHALLENGE_SUCCEEDED") {
    const cookie = serialize("auth-session", token, {
      expires: new Date(decodedToken.exp * 1000),
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);
  }

  res.redirect("/dashboard");
};

export default handler;
