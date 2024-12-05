import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/server/prisma"
import { z } from "zod";

const Params = z.object({
    name: z.string().trim(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.string(),
})

export async function POST(request: Request) {
    try {
        const req = await request.json();
        const { data } = Params.safeParse(req);

        if (!data) {
            return new Response(`Data request not found`, {
                status: 404,
            })
        }

        const emailExist = await prisma.user.findFirst({ where: { email: data.email } })

        if (emailExist) {
            return new Response(`Email is exist!`, {
                status: 400,
            })
        }

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: data.role,
            }
        })

        return Response.json({ dataOk: true })
    } catch (error) {
        return new Response(`Server is error: ${error}`, {
            status: 500,
        })
    }
}