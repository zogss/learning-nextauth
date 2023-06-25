import jwt, { type JwtPayload } from "jsonwebtoken";

type SignInOptionsType = {
  expiresIn?: string | number;
};

const defaultSignInOptions: SignInOptionsType = {
  expiresIn: "1h",
};

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: SignInOptionsType = defaultSignInOptions
) => {
  const secretKey = process.env.SECRET_KEY as string;

  return jwt.sign(payload, secretKey, options);
};

export const verifyJwtAccessToken = (token: string) => {
  try {
    const secretKey = process.env.SECRET_KEY as string;

    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error(error);
    return null;
  }
};
