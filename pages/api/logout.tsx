import cookie from "cookie";

export default (
  req: { body: { token: string } },
  res: {
    setHeader: (arg0: string, arg1: string) => void;
    statusCode: number;
    json: (arg0: { success: boolean }) => void;
  },
) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
  );
  res.statusCode = 200;
  res.json({ success: true });
};
