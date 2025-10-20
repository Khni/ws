import { Messages } from "messages/types";

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
