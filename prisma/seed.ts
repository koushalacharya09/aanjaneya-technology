import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.lead.create({
    data: {
      name: "Sample Lead",
      phone: "+919876543210",
      email: "sample@example.com",
      businessName: "Demo Business",
      industry: "retail-local-business",
      services: ["website-software-development"],
      description: "Seed lead for local development only.",
      budget: "₹25k–75k",
      sourcePage: "/seed",
      status: "NEW",
    },
  });
  console.log("Seeded sample lead (no real PII).");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
