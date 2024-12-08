const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const findUser = await prisma.user.findFirst({
    where: { email: "root@dashboard.com" },
  });

  if (!findUser) {
    await prisma.user.create({
      data: {
        email: "root@dashboard.com",
        name: "Root",
        password: "Abc@123abc",
        role: "root",
      },
    });
  }

  length = 30
  for (let i = 0; i < length; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@dashboard.com`,
        name: "User " + i,
        password: "Abc@123abc",
        role: "user",
      },
    })

    await prisma.monitor.create({
      data: {
        sessionId: "randome session" + i,
        sipMethod: "Invite",
        sipFromUser: `100${i}`,
        sipToUser: `110${i + 2}`,
        sourceIP: `192.168.186.${i * 123}`,
        srcPort: `${i * 1234}`,
        destinationIP: `192.168.186.${i * 321}`,
        dstPort: `${i * 4321}`
      }
    })
  }
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
