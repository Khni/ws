import { UsersIcon } from "lucide-react";

export const menuData = [
  {
    title: "Users",
    url: "/users",
    icon: UsersIcon,
    isActive: false,
    items: [
      { title: "Users", url: "/app/:orgId/users" },
      { title: "Roles", url: "/app/:orgId/roles" },
      { title: "Invitations", url: "/app/:orgId/invitations" },
    ],
  },
];
