import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Available Triggers
  const webhookTrigger = await prisma.availableTriggers.upsert({
    where: { id: "webhook" },
    update: {},
    create: {
      id: "webhook",
      name: "Webhook",
      image: "https://cdn-icons-png.flaticon.com/512/2165/2165004.png",
      description: "Trigger when a webhook is received",
    },
  });

  console.log("✅ Created trigger:", webhookTrigger.name);

  // Seed Available Actions
  const emailAction = await prisma.availableActions.upsert({
    where: { id: "email" },
    update: {},
    create: {
      id: "email",
      name: "Email",
      image: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
      description: "Send an email",
    },
  });

  const solanaAction = await prisma.availableActions.upsert({
    where: { id: "solana" },
    update: {},
    create: {
      id: "solana",
      name: "Solana",
      image: "https://cryptologos.cc/logos/solana-sol-logo.png",
      description: "Send SOL to a wallet address",
    },
  });

  console.log("✅ Created actions:", emailAction.name, solanaAction.name);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
