import cookie from "cookie";

async function handler(
  req: { body: { token: string } },
  res: {
    setHeader: (arg0: string, arg1: string) => void;
    statusCode: number;
    json: (arg0: { success: boolean }) => void;
  },
) {
  const token: string | undefined = process.env.NEXT_PUBLIC_TOKEN;

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    }),
  );

  if (req.body.token === token) {
    res.statusCode = 200;
    return res.json({ success: true });
  }

  res.statusCode = 401;
  res.json({ success: false });

  return true;
}

export default handler;
