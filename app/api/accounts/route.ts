import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/server/prisma"

// export const dynamic = 'force-static'

export async function GET(request: Request,) {
    try {
        // const session = await getAuthSession();
        // if (!session) {
        //     return new Response('UNAUTHORIZED', {
        //         status: 401,
        //     })
        // }

        const req = new URL(request.url);
        const userId = req.searchParams.get("userId")
        const page = Number(req.searchParams.get("page"))
        const pageSize = Number(req.searchParams.get("pageSize"))

        if (!userId || !page || !pageSize) {
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

        let dataAccouts = <any>[]
        let count = 0

        if (findUser.role == "root") {
            dataAccouts = await prisma.user.findMany({
                take: pageSize,
                skip: pageSize * (page - 1),
                where: {
                    role: { notIn: ["root"] },
                },
                orderBy: { createdAt: "desc" }
            })
            count = await prisma.user.count({
                where: {
                    role: { notIn: ["root"] },
                },
            })
        }

        if (findUser.role == "admin") {
            dataAccouts = await prisma.user.findMany({
                take: pageSize,
                skip: pageSize * (page - 1),
                where: {
                    role: { in: ["user", "admin"] },
                    active: true,
                },
                orderBy: { createdAt: "desc" }
            })
            count = await prisma.user.count({
                where: {
                    role: { in: ["user", "admin"] },
                    active: true,
                },
            })
        }

        return Response.json({ data: dataAccouts, dataOk: true, count: count })
    } catch (error) {
        return new Response(`Server is error: ${error}`, {
            status: 500,
        })
    }
}