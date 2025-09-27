export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  identifier: string;
  identifierType: "email" | "phone";
};
export type UserCreateInput = {
  firstName: string;
  lastName: string;
  identifier: string;

  password: string;
};
