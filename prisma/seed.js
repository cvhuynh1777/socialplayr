import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Wipe all existing data (order matters for foreign keys)
  await prisma.subscription.deleteMany();
  await prisma.pick.deleteMany();
  await prisma.capper.deleteMany();
  await prisma.user.deleteMany();

  // Create 5 Subscribers
  const subscribers = [];
  for (let i = 1; i <= 5; i++) {
    const subscriber = await prisma.user.create({
      data: {
        name: `Subscriber ${i}`,
        email: `subscriber${i}@example.com`,
        password: "test123",
        role: "SUBSCRIBER",
      },
    });
    subscribers.push(subscriber);
  }

  // Create 5 Cappers, each with 5 Picks
  const cappers = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Capper ${i}`,
        email: `capper${i}@example.com`,
        password: "test123",
        role: "CAPPER",
      },
    });

    const capper = await prisma.capper.create({
      data: {
        bio: `Hi, I’m Capper ${i}. Let’s win together!`,
        price: parseFloat((Math.random() * 50 + 10).toFixed(2)),
        ownerId: user.id,
      },
    });

    // Add Picks for this Capper
    for (let j = 1; j <= 5; j++) {
      await prisma.pick.create({
        data: {
          content: `Pick #${j} from Capper ${i}`,
          sharedLink: `https://example.com/pick/${capper.id}-${j}`,
          confidence: Math.floor(Math.random() * 5) + 1,
          notes: `Analysis for pick #${j}`,
          capperId: capper.id,
        },
      });
    }

    cappers.push(capper);
  }

  // Subscribe Subscribers to random Cappers
  for (const subscriber of subscribers) {
    const randomCappers = cappers.sort(() => 0.5 - Math.random()).slice(0, 3);
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
