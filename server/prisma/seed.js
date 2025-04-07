const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Create roles if they don't exist
  const roles = [{ role: "admin" }, { role: "customer" }];

  for (const role of roles) {
    const existingRole = await prisma.role.findUnique({
      where: { role: role.role },
    });

    if (!existingRole) {
      await prisma.role.create({ data: role });
      console.log(`Created role: ${role.role}`);
    }
  }

  // Create admin user if it doesn't exist
  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    // Get admin role
    const adminRole = await prisma.role.findFirst({
      where: { role: "admin" },
    });

    if (adminRole) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      // Create admin user
      await prisma.user.create({
        data: {
          firstName: "Admin",
          lastName: "User",
          fullName: "Admin User",
          email: adminEmail,
          username: "admin",
          password: hashedPassword,
          role: adminRole.id,
          status: "active",
        },
      });
      console.log("Created admin user");
    }
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
