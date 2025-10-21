import commonMessages from "./common/en.json";
import authMessages from "./auth/en.json";
import organizationMessages from "./organization/en.json";
import { RoleMessages, roleMessages } from "../src/features/role";
export type Messages = typeof commonMessages &
  typeof authMessages &
  typeof organizationMessages &
  RoleMessages;

export const messages: Messages = {
  ...commonMessages,
  ...authMessages,
  ...organizationMessages,
  ...roleMessages,
};
