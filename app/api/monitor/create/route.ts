import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/server/prisma"
import { z } from "zod";

const Params = z.object({
    sessionId: z.string().trim(),
    sipMethod: z.string(),
    sipFromUser: z.string(),
    sipToUser: z.string(),
    sourceIP: z.string(),
    srcPort: z.string(),
    destinationIP: z.string(),
    dstPort: z.string(),
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

        await prisma.monitor.create({
            data: {
                sessionId: data.sessionId,
                sipMethod: data.sipMethod,
                sipFromUser: data.sipFromUser,
                sipToUser: data.sipToUser,
                sourceIP: data.sourceIP,
                srcPort: data.srcPort,
                destinationIP: data.destinationIP,
                dstPort: data.dstPort,
            }
        })

        return Response.json({ dataOk: true })
    } catch (error) {
        return new Response(`Server is error: ${error}`, {
            status: 500,
        })
    }
}