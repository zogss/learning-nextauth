import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "~/lib/jwt";
import { prisma } from "~/lib/prisma";

interface RequestBody {
  username: string;
  password: string;
}

export const POST = async (req: Request) => {
  const body: RequestBody = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;

    const accessToken = signJwtAccessToken(userWithoutPass);

    const result = {
      ...userWithoutPass,
      accessToken,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: "Invalid username or password",
      }),
      {
        status: 401,
      }
    );
  }
};
