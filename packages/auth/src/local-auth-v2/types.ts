export type UserIdentifierType = "email" | "phone";
export type BaseCreateUserData = {
  password: string;
  identifier: string;
};
