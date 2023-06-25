import { verifyJwtAccessToken } from "~/lib/jwt";

export const verifyAuthorization = (request: Request) => {
  const accessToken = request.headers.get("authorization");

  if (!accessToken || !verifyJwtAccessToken(accessToken)) {
    return {
      state: false,
      response: new Response(
        JSON.stringify({
          error: "Unauthorized",
        }),
        {
          status: 401,
        }
      ),
    };
  }
  return {
    state: true,
    response: null,
  };
};
