import * as bcrypt from "bcrypt";
import prisma from "~/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export const POST = async (req: Request) => {
  const body: RequestBody = await req.json();

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...userWithoutPass } = user;

  return new Response(JSON.stringify(userWithoutPass), {
    status: 200,
  });
};
