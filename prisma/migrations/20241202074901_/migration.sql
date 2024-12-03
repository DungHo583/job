-- CreateTable
CREATE TABLE "Monitor" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "sipMethod" TEXT NOT NULL,
    "sipFromUser" TEXT NOT NULL,
    "sipToUser" TEXT NOT NULL,
    "sourceIP" TEXT NOT NULL,
    "srcPort" TEXT NOT NULL,
    "destinationIP" TEXT NOT NULL,
    "dstPort" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);
