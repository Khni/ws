import commonMessages from "./common/en.json";
import authMessages from "./auth/en.json";
import organizationMessages from "./organization/en.json";

export type Messages = typeof commonMessages &
  typeof authMessages &
  typeof organizationMessages;

export const messages: Messages = {
  ...commonMessages,
  ...authMessages,
  ...organizationMessages,
};
