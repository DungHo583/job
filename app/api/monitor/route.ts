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

        let dataMonitor = <any>[]

        if (findUser.role == "root") {
            dataMonitor = await prisma.monitor.findMany({
                take: pageSize,
                skip: pageSize * (page - 1),
                orderBy: { createdAt: "desc" }
            })
        }

        // if (findUser.role == "admin") {
        //     dataMonitor = await prisma.monitor.findMany({
        //         take: pageSize,
        //         skip: pageSize * (page - 1),
        //         orderBy: { createdAt: "desc" }
        //     })
        // }

        return Response.json({ data: dataMonitor, dataOk: true })
    } catch (error) {
        return new Response(`Server is error: ${error}`, {
            status: 500,
        })
    }
}