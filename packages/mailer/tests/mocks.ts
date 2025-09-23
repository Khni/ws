import { vi } from "vitest";

export const mockMailSender = {
  sendMail: vi.fn(),
};

export const mockMailHelper = {
  resolveTemplatePath: vi.fn(),
  renderTemplate: vi.fn(),
};
