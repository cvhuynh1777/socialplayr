import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Clearing existing data...");
  await prisma.subscription.deleteMany();
  await prisma.pick.deleteMany();
  await prisma.capper.deleteMany();
  await prisma.user.deleteMany();

  console.log("🌱 Seeding database...");

  // Create 5 subscribers
  const subscribers = [];
  for (let i = 1; i <= 5; i++) {
    const subscriber = await prisma.user.create({
      data: {
        name: `Subscriber ${i}`,
        email: `subscriber${i}@example.com`,
        password: "test123", // dummy password
        role: "SUBSCRIBER",
      },
    });
    subscribers.push(subscriber);
  }

  // Create 10 cappers and their picks
  const cappers = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Capper ${i}`,
        email: `capper${i}@example.com`,
        password: "test123", // dummy password
        role: "CAPPER",
      },
    });

    const capper = await prisma.capper.create({
      data: {
        bio: `Hi, I’m Capper ${i} and I’ve been crushing bets lately!`,
        price: parseFloat((Math.random() * 50 + 10).toFixed(2)), // $10–$60
        ownerId: user.id,
      },
    });
    cappers.push(capper);

    // Create 10 random Picks for each Capper
    for (let j = 1; j <= 10; j++) {
      await prisma.pick.create({
        data: {
          content: `Pick #${j} by Capper ${i}`,
          sharedLink: `https://bettingapp.com/pick/${capper.id}-${j}`, // dummy shared link
          confidence: Math.floor(Math.random() * 5) + 1, // 1–5
          notes: `This is test pick #${j} for Capper ${i}`,
          capperId: capper.id,
        },
      });
    }
  }

  // Subscribe each subscriber to 3 random cappers
  for (const subscriber of subscribers) {
    const randomCappers = cappers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    for (const capper of randomCappers) {
      await prisma.subscription.create({
        data: {
          subscriberId: subscriber.id,
          capperId: capper.id,
        },
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
