import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/server/prisma"

export async function GET(request: Request) {
    try {
        // const session = await getAuthSession();
        // if (!session) {
        //     return new Response('UNAUTHORIZED', {
        //         status: 401,
        //     })
        // }

        const req = new URL(request.url);
        const userId = req.searchParams.get("userId")

        if (!userId) {
            return new Response('Data not found', {
                status: 404,
            })
        }

        const findUser = await prisma.user.findFirst({ where: { id: userId } })
        if (!findUser) {
            return new Response('Data not found', {
                status: 404,
            })
        }

        return Response.json({ data: findUser, dataOk: true })
    } catch (error) {
        return new Response(`Server is error: ${error}`, {
            status: 500,
        })
    }
}