export type UserIdentifierType = "email" | "phone" | "username";
export type BaseCreateUserData = {
  password: string;
  identifier: string;
  identifierType: UserIdentifierType;
};
