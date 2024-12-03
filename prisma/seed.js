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
