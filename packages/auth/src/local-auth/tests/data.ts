import { UserModel } from "../../repositories/interfaces/IUserRepository.js";

export const mockedUser = {
  id: "usr_7g8h9i",
  isActive: true,
  createdAt: new Date("2024-01-20T14:15:00Z"),
  updatedAt: new Date("2024-09-03T09:10:00Z"),
  email: "charlie@example.com",
  phone: null,
  firstName: "Charlie",
  lastName: "Brown",
  password: "12345678",
  picture: "https://randomuser.me/api/portraits/men/12.jpg",
  verified: true,
  oauthProvider: "NONE",
  oauthId: "facebook-oauth-987654",
} as const;
