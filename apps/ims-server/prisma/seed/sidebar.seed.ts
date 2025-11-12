import {
  SidebarHeadingType,
  SidebarOptionType,
} from "../../generated/prisma/index.js";
import prisma from "../../src/database/prisma.js";

async function main() {
  console.log("🌱 Seeding sidebar data...");
  const readUserPermissionId = await prisma.permission.findFirst({
    where: {
      action: {
        name: "READ",
      },
      resource: {
        name: "USER",
      },
    },
    select: { id: true },
  });

  const readRolePermissionId = await prisma.permission.findFirst({
    where: {
      action: {
        name: "READ",
      },
      resource: {
        name: "ROLE",
      },
    },
    select: { id: true },
  });
  if (!readUserPermissionId || !readRolePermissionId) {
    throw new Error(
      "Required permissions not found. Please seed permissions before seeding sidebar data."
    );
  }

  // 1. Create Sidebar Headings
  const usersHeading = await prisma.sidebarHeading.upsert({
    where: { name: SidebarHeadingType.Users },
    update: {},
    create: {
      name: SidebarHeadingType.Users,
      icon: "UsersIcon",
      isActive: true,
    },
  });

  // 2. Create Sidebar Options
  const usersOption = await prisma.sidebarOption.upsert({
    where: { name: SidebarOptionType.Users },
    update: {},
    create: {
      name: SidebarOptionType.Users,
      icon: "UserIcon",
      path: "/dashboard/users",
      permissionId: readUserPermissionId.id,
      sidebarHeadingId: usersHeading.id,
    },
  });

  const rolesOption = await prisma.sidebarOption.upsert({
    where: { name: SidebarOptionType.Roles },
    update: {},
    create: {
      name: SidebarOptionType.Roles,
      icon: "ShieldIcon",
      path: "/dashboard/roles",
      permissionId: readRolePermissionId.id,
      sidebarHeadingId: usersHeading.id,
    },
  });

  console.log("✅ Seeded sidebar headings and options successfully.");
  console.table([usersHeading, usersOption, rolesOption]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
