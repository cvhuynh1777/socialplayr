import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create 10 users (Cappers)
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Capper ${i}`,
        email: `capper${i}@example.com`,
        password: "test123", // dummy password
        role: "CAPPER"
      }
    });

    // Create Capper profile for user
    const capper = await prisma.capper.create({
      data: {
        bio: `Hi, I’m Capper ${i} and I’ve been crushing bets lately!`,
        price: parseFloat((Math.random() * 50 + 10).toFixed(2)), // Random price between $10–$60
        ownerId: user.id
      }
    });

    // Create 10 random Picks for each Capper
    for (let j = 1; j <= 10; j++) {
      await prisma.pick.create({
        data: {
          content: `Pick #${j} by Capper ${i}`,
          sharedLink: `https://bettingapp.com/pick/${capper.id}-${j}`, // dummy shared link
          confidence: Math.floor(Math.random() * 5) + 1, // Random confidence 1–5
          notes: `This is test pick #${j} for Capper ${i}`,
          capperId: capper.id
        }
      });
    }
  }

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
