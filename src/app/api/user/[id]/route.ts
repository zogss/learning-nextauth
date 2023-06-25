import { prisma } from "~/lib/prisma";
import { verifyAuthorization } from "~/shared/helpers/verifyAuthorization";
import * as bcrypt from "bcrypt";

type ParamsType = { params: { id: number } };

export const GET = async (req: Request, { params }: ParamsType) => {
  const { state, response } = verifyAuthorization(req);

  if (!state) return response;

  const userPosts = await prisma.post.findMany({
    where: {
      authorId: +params.id,
    },
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userPosts));
};

export const PUT = async (req: Request, { params }: ParamsType) => {
  const body = await req.json();

  const { state, response } = verifyAuthorization(req);

  if (!state) return response;

  const user = await prisma.user.findFirst({
    where: {
      id: +params.id,
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        error: "User not found",
      }),
      {
        status: 404,
      }
    );
  }

  const newUser = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      name: body.name,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...userWithoutPass } = newUser;

  return new Response(JSON.stringify(userWithoutPass), {
    status: 200,
  });
};
